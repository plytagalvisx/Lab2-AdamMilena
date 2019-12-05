import ObservableModel from "./ObservableModel";
import * as Constants from "./apiConfig";

class DinnerModel extends ObservableModel {
    constructor() {
        super();
        this._numberOfGuests = 4;
        this.getNumberOfGuests();
    }

    /**
     * Get the number of guests
     * @returns {number}
     */
    getNumberOfGuests() {
        return this._numberOfGuests;
    }

    /**
     * Set number of guests
     * @param {number} num
     */
    setNumberOfGuests(num) {
        this._numberOfGuests = num;
        this.notifyObservers("a number of guests has changed");
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
