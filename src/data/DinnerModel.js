import ObservableModel from "./ObservableModel";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/40";
const httpOptions = {
    headers: {"X-Mashape-Key": "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767"}
};

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
        this.notifyObservers();
    }

    getAllDishes(type, query) {
        this.url = `${BASE_URL}/recipes/search?number=10&offset=0&type=${type}&query=${query}`;
        return fetch(this.url, httpOptions).then(this.processResponse);
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
