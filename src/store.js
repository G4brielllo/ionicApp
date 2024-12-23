import { createStore } from "vuex";

const store = createStore({
  state: {
    photos: [{ id: 1, name:"Photo1", description:"Lorem ipsum", date: "23-12-2024", location:"California"}],
  },
  mutations: {
    
  },
  getters:{
    getAllPhotos: (state) => () => {

    }
  }
});

export default store;