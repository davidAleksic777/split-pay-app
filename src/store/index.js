import { createStore } from 'vuex'

export default createStore({
  state: {
    persons: [],
    items: []
  },
  getters: {
    itemsOfAnUser: (state) => (ids) => {

      let items = [];
      ids.forEach(element => {
        let item = state.items.find(userItem => userItem.id === element);
        items.push(item)
      });
      return items;
    }
  },
  mutations: {
    addPerson(state, person) {
      state.persons.push(person)
    },
    addItem(state, item) {
      state.items.push(item)
    },
    updatePerson(state, payload) {
      state.persons.find(person => person.id === payload.id).items.push(payload.itemId);
    },
    updateItem(state, payload) {
      let item = state.items.find(item => item.id === payload.itemId);
      item.usersInvolved += 1;
      item.splitPrice = item.itemPrice / item.usersInvolved;

    },
    removeItemFromUser(state, payload) {
      let item = state.items.find(item => item.id === payload.itemId);
      item.usersInvolved -= 1;

      let person = state.persons.find(person => person.id === payload.personId);
     
      let filtered = person.items.filter((value, index, arr) => {
        return value != payload.itemId;
      });
      person.items = filtered;
    }
  },
  actions: {
  },
  modules: {
  }
})
