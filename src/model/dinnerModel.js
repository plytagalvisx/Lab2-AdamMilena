class DinnerModel {

  constructor() {
    this.store = Redux.createStore(this.reducer, {numberOfGuests: 0, dishes: []});
  }

  // Combined reducer for all reduxfunctions.
  reducer(state, action) {
    switch (action.type) {
      case 'SET_GUESTS':
        return {
          numberOfGuests: action.numberOfGuests,
          dishes: state.dishes
        };
      case 'ADD_DISH':
        return {
          numberOfGuests: state.numberOfGuests,
          dishes: [...state.dishes, action.dish]
        };
      case 'REMOVE_DISH':
        return {
          numberOfGuests: state.numberOfGuests,
          dishes: state.dishes.filter(dish => dish.id !== action.dishId)
        };
      default:
        return state;
    }
  }

  setNumberOfGuests(num) {
    if(num <= 0)
      num = 1;
    this.store.dispatch({type:'SET_GUESTS', numberOfGuests: num});
  }

  getNumberOfGuests() {
    return this.store.getState().numberOfGuests;
  }

  //Returns the dish that is on the menu for selected type
  getSelectedDishes(type) {
    return this.store.getState().dishes.filter(dish => dish.dishTypes.includes(type));
  }

  //Returns all the dishes on the menu.
  getFullMenu() {
    return this.store.getState().dishes;
  }

  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
    return this.store.getState().dishes.map(dish => dish.extendedIngredients.map(name => name.name)).flat();
  }

  //Returns the total price of the menu (price per serving of each dish multiplied by number of guests).
  getTotalMenuPrice() {
    let prices = this.store.getState().dishes.map(dish => dish.pricePerServing);
    let guests = this.store.getState().numberOfGuests;
    let sum = prices.reduce((total, amount) => total + amount);
    return sum*guests;
  }

  //Adds the passed dish to the menu. The same dish can not be in the menu twice. This must be implemented. Simple if(not in this.getFullMenu)?
  addDishToMenu(dish) {
    this.store.dispatch({type:'ADD_DISH', dish: dish});
  }

  //Removes dish with specified id from menu
  removeDishFromMenu(id) {
    this.store.dispatch({type:'REMOVE_DISH', dishId: id});
  }

  //Returns a dish of specific ID
  getDish(id) {
    if(!id)
      id = '';
    let uri = GET_DISH_URI1.concat(id).concat(GET_DISH_URI2);

    return this.makeApiCall(uri);
  }

  //Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
  //query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
  //if you don't pass any query, all the dishes will be returned
  getAllDishes(type, query) {
    if(!query)
      query = '';
    if(!type)
      type = '';
    let uri = GET_ALL_DISHES_URI1.concat(type).concat(GET_ALL_DISHES_URI2).concat(query);

    return this.makeApiCall(uri)
        .then(response => response.results);
  }

  makeApiCall(uri) {
    return fetch(ENDPOINT.concat(uri), {
      method:'GET',
      headers:{"X-Mashape-Key":API_KEY}})
        .then(response => {
          return response.json();
        })
        .then(data => data)
        .catch(console.error);
  }
}