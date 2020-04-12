/* eslint-disable no-shadow */

import { getUserNotesSubcollection, Timestamp } from '@/firebaseConfig';

function extractImportantData({ id, data }) {
  return { id, ...data() };
}

const state = {
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
};

const mutations = {
  ownNotesFetched(state, payload) {
    state.ownNotes = payload;
  },

  userNotesFetched(state, { userId, notesForUser }) {
    state.notes[userId] = notesForUser;
  },

  ownNoteAdded(state, note) {
    state.ownNotes = state.ownNotes.push(note);
  },

  userNoteAdded(state, { userId, note }) {
    const previousNotes = state.notes[userId] ? state.notes[userId] : [];
    state.notes[userId] = previousNotes.push(note);
  },

  userNoteDeleted(state, { userId, noteId }) {
    const previousUserNotes = state.notes[userId] ? state.notes[userId] : [];
    state.notes[userId] = previousUserNotes.filter(({ id }) => id !== noteId);
  },
};

const actions = {
  async fetchOwnNotes({ commit, rootState }) {
    const currentUser = rootState.auth.getters.user;
    if (!currentUser) return;

    const { userRole } = rootState.auth.getters;
    if (userRole !== 'beneficiaire') return;

    const notesCollection = getUserNotesSubcollection(currentUser.uid);

    const notesRefs = await notesCollection.get();

    commit('ownNotesFetched', notesRefs.docs.map(extractImportantData));
  },

  async fetchNotesForUser({ commit }, { userId }) {
    const notesCollection = getUserNotesSubcollection(userId);

    const notes = (await notesCollection.get()).docs.map(extractImportantData);
    commit('userNotesFetched', notes);
  },

  async addNoteToSelf({ commit, rootState }, { title, message }) {
    const currentUser = rootState.auth.getters.user;
    const date = Timestamp.now();

    const insertedNote = await getUserNotesSubcollection(currentUser.uid).add({
      title,
      message,
      date,
      author: {
        uid: currentUser.uid,
        // TODO: additional data from user
      },
    });

    commit('userNoteAdded', {
      title,
      message,
      date,
      id: insertedNote.id,
      author: {
        uid: currentUser.uuid,
      },
    });
  },

  async addNoteToUser({ commit, rootState }, { userId, note: { title, message } }) {
    const currentUser = rootState.auth.getters.user;
    const date = Timestamp.now();

    /**
     * @type {CollectionReference}
     */
    const userNotesCollection = getUserNotesSubcollection(userId);

    const insertedNote = await userNotesCollection.add({
      title,
      message,
      date,
      author: {
        uid: currentUser.uid,
        // TODO: additional data from user
      },
    });

    commit('userNoteAdded', {
      userId,
      note: {
        title,
        message,
        date,
        id: insertedNote.id,
        author: {
          uid: currentUser.uid,
        },
      },
    });
  },

  async deleteNoteFromUser({ commit }, { userId, noteId }) {
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
