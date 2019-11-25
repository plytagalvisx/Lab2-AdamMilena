class SearchController {
    constructor(view, model, detailsController) {
        this.view = view;
        this.model = model;
        this.detailsController = detailsController;

        // TODO lab 3
        this.receiveDishesFromAPI = this.searchAllDishes.bind(this);
    }

    async renderView() {
        this.view.render();

        // TODO lab 3
        await this.receiveDishesFromAPI();

        /* The user can search for dishes in search view */
        console.log("Find a dish Event:");
        let searchAllDishes = this.searchAllDishes.bind(this);
        let listener = function() {
            searchAllDishes();
        };
        let searchBtn = this.view.container.querySelector("#search-dish-button");
        searchBtn.addEventListener('click', listener);



        /* The user can click on the dish item in the search view */
        /*let listener2 = function(dishItem) {
            let dishItemClassName = dishItem.target.parentElement.className;
            if (dishItemClassName === 'clickableImage')
            {
                let dishItemId = dishItem.target.parentElement.id;
                console.log("dishItemId: ", dishItemId);
                let conditionWithId = ':' + dishItemId;
                this.model.getDish(id).then(dish => {
                    GSC('search', 'smallDishBtn');
                });
                GSC('search', 'search:dishid', dishItemId)
            }
        };
        let clickedImage = this.view.container.querySelector('#dishes-items');
        clickedImage.addEventListener('click', listener2);*/

        let clickedImage = this.view.container.querySelector('#dishes-items');
        clickedImage.addEventListener('click', dishItem => {
            let dishItemClassName = dishItem.target.parentElement.className;
            if (dishItemClassName === 'clickableImage')
            {
                let dishItemId = dishItem.target.parentElement.id;
                console.log("dishItemId: ", dishItemId);
                window.location.hash = "loader";
                this.detailsController.sendOverToDetailsView(dishItemId);
                GSC('search', 'search:dishid');
            }
        });

    }

    // TODO Lab 3

    searchAllDishes() {
        return new Promise(resolve => {
            let query = document.querySelector('#selectTypeDish').value;
            let type = document.querySelector('#inputDishTitle').value;

            let clearTextContent = document.querySelector('#dishes-items');
            clearTextContent.textContent = '';
            let dishes = this.model.getAllDishes(type, query).then(result => result.map(dish => {
                    return {
                        id: dish.id,
                        image: dish.image,
                        title: dish.title
                    };
                })
            ).catch(console.error).finally(() => {
                dishes.then(result => this.view.update(result));
                resolve();
            });
        });
    }

}