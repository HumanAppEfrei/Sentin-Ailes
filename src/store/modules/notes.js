/* eslint-disable no-shadow */

import { getUserNotesSubcollection, Timestamp } from '@/firebaseConfig';

const state = {
  updating: false,
  ownNotes: [],
  notes: {},
};

const getters = {
  ownNotes(state) {
    return state.ownNotes;
  },

  notesForUser(state, userId) {
    return state.notes[userId] ? state.notes[userId] : [];
  },

  isUpdating(state) {
    return state.updating;
  },
};

const mutations = {
  startUpdate(state) {
    state.updating = true;
  },

  ownNotesFetched(state, payload) {
    state.ownNotes = payload;
    state.ownNotes = state.ownNotes.sort((a, b) => a.date.seconds < b.date.seconds);
    state.updating = false;
  },

  userNotesFetched(state, { userId, notesForUser }) {
    state.notes[userId] = notesForUser;
    state.notes[userId] = state.notes[userId].sort((a, b) => a.date.seconds < b.date.seconds);
    state.updating = false;
  },

  ownNoteAdded(state, note) {
    state.ownNotes.push(note);
    state.ownNotes = state.ownNotes.sort((a, b) => a.date.seconds < b.date.seconds);
    state.updating = false;
  },

  userNoteAdded(state, { userId, note }) {
    state.notes[userId] = state.notes[userId] ? state.notes[userId] : [];
    state.notes[userId].push(note);
    state.notes[userId] = state.notes[userId].sort((a, b) => a.date.seconds < b.date.seconds);
    state.updating = false;
  },

  userNoteDeleted(state, { userId, noteId }) {
    const previousUserNotes = state.notes[userId] ? state.notes[userId] : [];
    state.notes[userId] = previousUserNotes.filter(({ id }) => id !== noteId);
    state.updating = false;
  },
};

const actions = {
  async subscribeToOwnNotes({ commit, rootGetters, dispatch }) {
    const currentUser = rootGetters['auth/user'];
    if (!currentUser) return;

    /**
     * @type {FirebaseFirestore.CollectionReference}
     */
    const notesCollection = getUserNotesSubcollection(currentUser.uid);

    dispatch('fetchOwnNotes');

    notesCollection.onSnapshot((snap) => {
      const notes = snap.docs.map(doc => ({ id: doc.id, ...(doc.data()) }));

      commit('ownNotesFetched', notes);
    });
  },

  async fetchOwnNotes({ dispatch, rootGetters }) {
    const currentUser = rootGetters['auth/user'];
    if (!currentUser) return;

    dispatch('fetchNotesForUser', { userId: currentUser.uid });
  },

  async fetchNotesForUser({ commit, rootGetters }, { userId }) {
    commit('startUpdate');

    const notesCollection = getUserNotesSubcollection(userId);

    const notes = (await notesCollection.get()).docs.map(doc => ({ id: doc.id, ...(doc.data()) }));
    commit(rootGetters['auth/user'].uid === userId ? 'ownNotesFetched' : 'userNotesFetched', notes);
  },

  async addNoteToSelf({ dispatch, rootGetters }, { title, message }) {
    const currentUser = rootGetters['auth/user'];
    if (!currentUser) return;

    dispatch('addNoteToUser', {
      userId: currentUser.uid,
      note: { title, message },
    });
  },

  async addNoteToUser({ commit, rootGetters }, { userId, note: { title, message } }) {
    commit('startUpdate');

    const currentUser = rootGetters['auth/user'];
    const date = Timestamp.now();

    /**
     * @type {CollectionReference}
     */
    const userNotesCollection = getUserNotesSubcollection(userId);

    const insertedNote = await userNotesCollection.add({
      title,
      message,
      date,
      author: `${currentUser.firstName} ${currentUser.lastName}`,
    });

    commit(userId === currentUser.uid ? 'ownNoteAdded' : 'userNoteAdded', {
      userId,
      note: {
        title,
        message,
        date,
        id: insertedNote.id,
        author: `${currentUser.firstName} ${currentUser.lastName}`,
      },
    });
  },

  async deleteNoteFromUser({ commit }, { userId, noteId }) {
    commit('startUpdate');

    const notesCollection = getUserNotesSubcollection(userId);

    if (!notesCollection) return;

    await notesCollection.doc(noteId).delete();
    commit('userNoteDeleted', { userId, noteId });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
