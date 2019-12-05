import ObservableModel from "./ObservableModel";
import * as Constants from "./apiConfig";

class DinnerModel extends ObservableModel {
    constructor() {
        super();
        this.state = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {
            numberOfGuests: 0,
            menu: [],
            price: 0,
        };
        //this.getNumberOfGuests();
    }

    updateLocalStorage() {
        localStorage.setItem('state', JSON.stringify(this.state));
    }

    /**
     * Get the number of guests
     * @returns {number}
     */
    getNumberOfGuests() {
        return this.state.numberOfGuests;
    }

    /**
     * Set number of guests
     * @param {number} num
     */
    setNumberOfGuests(num) {
        if(num < 0)
            num = 0;
        this.state.numberOfGuests = num;
        this.updateLocalStorage();
        this.notifyObservers("a number of guests has changed");
    }

    //Returns the dish that is on the menu for selected type
    getSelectedDishes(type) {
        return this.state.menu.filter(dish => dish.dishTypes.includes(type));
    }

    //Returns all the dishes on the menu.
    getFullMenu() {
        return this.state.menu;
    }

    //Returns all ingredients for all the dishes on the menu.
    getAllIngredients() {
        return this.state.menu.map(dish => dish.extendedIngredients.map(name => name.name)).flat();
    }

    //Returns the total price of the menu (price per serving of each dish multiplied by number of guests).
    getTotalMenuPrice() {
        let prices = this.state.menu.map(dish => dish.pricePerServing);
        let guests = this.getNumberOfGuests();
        let sum = prices.reduce((total, amount) => total + amount, 0);
        return sum*guests;
    }

    //Adds the passed dish to the menu.
    addDishToMenu(dish) {
        let bool;
        this.state.menu.forEach(menuDish => {
            if(menuDish.id === dish.id)
                bool = true;
        });

        if (!bool) {
            this.state.menu.push(dish);
            this.updateLocalStorage();
            this.notifyObservers("dish added");
        }
        else
            alert("Dish already in menu.");
    }

    //Removes dish with specified id from menu
    removeDishFromMenu(id) {
        let dish = this.getDish(id);
        this.state.menu.pop(dish);
    }

    // Returns a dish of specific ID
    getDish(id) {
        if(!id)
            id = '';

        this.url = `${Constants.ENDPOINT}/recipes/${id}/information`;
        return fetch(this.url, Constants.httpOptions).then(this.processResponse);
    }

    // Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
    // query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
    // if you don't pass any query, all the dishes will be returned
    getAllDishes(type, query) {
        this.url = `${Constants.ENDPOINT}/recipes/search?number=10&offset=0&type=${type}&query=${query}`;
        return fetch(this.url, Constants.httpOptions).then(this.processResponse);
    }

    processResponse(response) {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;