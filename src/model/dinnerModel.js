class DinnerModel {

  constructor() {
    this.store = Redux.createStore(this.reducer,
        { numberOfGuests: 0,
          dishes: [],
          dishDetails: [],
          price: 0,
        });
    this.subscribers = [];
    // numberOfGuests, price, dishes
    this.store.subscribe(this.notifyObservers.bind(this));
    this.setDishDetails(this.getDish(1));
    this.change = undefined;
  }

  addObserver(property, callback, subscriber) {
    this.subscribers.push({property: property, func: callback, subscriber: subscriber});
    if(!this.change) {
      this.notifyObservers();
    }
  }

  setDishDetails(dish) {
    this.change = 'dishDetails';
    this.store.dispatch({type: 'DETAILS', dishDetails: dish});
  }

  getDishDetails() {
    return this.store.getState().dishDetails;
  }

  notifyObservers() {
    let state = this.store.getState();

    this.subscribers.map(subscriber => {
      if(!this.change || subscriber.property.includes(this.change))
        subscriber.func(...subscriber.property.map(property => state[property]))
    });
  }

  //Removes the observer from the list of observers
  removeObserver(observer) {
    this.subscribers = this.subscribers.filter((elem) => elem.subscriber !== observer)
  }

  // Combined reducer for all reduxfunctions.
  reducer(state, action) {
    let newState = {...state};
    switch (action.type) {
      case 'SET_GUESTS':
        newState.numberOfGuests = action.numberOfGuests;
        return newState;
      case 'ADD_DISH':
        newState.dishes = [...state.dishes, action.dish];
        return newState;
      case 'REMOVE_DISH':
        newState.dishes = state.dishes.filter(dish => dish.id !== action.dishId);
        return newState;
      case 'DETAILS':
        newState.dishDetails = action.dishDetails;
        return newState;
      case 'PRICE':
        newState.price = action.price;
        return newState;
      default:
        return state;
    }
  }

  setPrice() {
    this.change = 'price';
    this.store.dispatch({type:'PRICE', price: this.getTotalMenuPrice()});
  }

  setNumberOfGuests(num) {
    this.change = 'numberOfGuests';
    if(num <= 0)
      num = 1;
    this.store.dispatch({type:'SET_GUESTS', numberOfGuests: num});
    this.setPrice();
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
    return this.store.getState().dishes.map(dish => dish.pricePerServing).reduce((total, amount) =>  total + amount, 0) * this.store.getState().numberOfGuests;
  }

  //Adds the passed dish to the menu. The same dish can not be in the menu twice. This must be implemented. Simple if(not in this.getFullMenu)?
  addDishToMenu(dish) {
    if(!this.getFullMenu().includes(dish)) {
      this.change = 'dishes';
      this.store.dispatch({type:'ADD_DISH', dish: dish});
      this.setPrice();
    }
    else
      console.log("dish already in menu");
  }

  //Removes dish with specified id from menu
  removeDishFromMenu(id) {
    this.change = 'dishes';
    this.store.dispatch({type:'REMOVE_DISH', dishId: id});
    this.setPrice();
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