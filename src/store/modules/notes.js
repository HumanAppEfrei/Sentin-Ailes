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
    state.updating = false;
  },

  userNotesFetched(state, { userId, notesForUser }) {
    state.notes[userId] = notesForUser;
    state.updating = false;
  },

  ownNoteAdded(state, note) {
    state.ownNotes = state.ownNotes.push(note);
    state.updating = false;
  },

  userNoteAdded(state, { userId, note }) {
    const previousNotes = state.notes[userId] ? state.notes[userId] : [];
    state.notes[userId] = previousNotes.push(note);
    state.updating = false;
  },

  userNoteDeleted(state, { userId, noteId }) {
    const previousUserNotes = state.notes[userId] ? state.notes[userId] : [];
    state.notes[userId] = previousUserNotes.filter(({ id }) => id !== noteId);
    state.updating = false;
  },
};

const actions = {
  async fetchOwnNotes({ dispatch, rootGetters }) {
    const currentUser = rootGetters['auth/user'];
    if (!currentUser) return;

    dispatch('notes/fetchNotesForUser', { userId: currentUser.uid });
  },

  async fetchNotesForUser({ commit }, { userId }) {
    commit('startUpdate');

    const notesCollection = getUserNotesSubcollection(userId);

    const notes = (await notesCollection.get()).docs.map(doc => ({ id: doc.id, ...(doc.data()) }));
    commit('userNotesFetched', notes);
  },

  async addNoteToSelf({ commit, rootGetters }, { title, message }) {
    commit('startUpdate');

    const currentUser = rootGetters['auth/user'];
    const date = Timestamp.now();

    const insertedNote = await getUserNotesSubcollection(currentUser.uid).add({
      title,
      message,
      date,
      author: `${currentUser.firstName} ${currentUser.lastName}`,
    });

    commit('userNoteAdded', {
      title,
      message,
      date,
      id: insertedNote.id,
      author: `${currentUser.firstName} ${currentUser.lastName}`,
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

    commit('userNoteAdded', {
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
