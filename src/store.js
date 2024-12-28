import { createStore } from "vuex";
const store = createStore({
  state: {
    photos: [
    ],
    selectedPhotoId: null,
  },
  mutations: {
    addPhoto(state, photo) {
      state.photos.push(photo);
    },
    setSelectedPhotoId(state, selectedPhotoId) {
      state.selectedPhotoId = selectedPhotoId; 
    },
  },
  actions: {
    setSelectedPhotoId({commit}, selectedPhotoId){
      commit("setSelectedPhotoId", selectedPhotoId);
    }
  },

  getters: {
    getSelectedPhoto: (state) => {
      return state.photos.find(photo => photo.id === state.selectedPhotoId);
    },
  },
});

export default store;
