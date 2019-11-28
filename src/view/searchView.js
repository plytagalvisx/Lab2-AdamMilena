class SearchView {

    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    render() {
        this.container.append(
            makeWithAttr("div", "", "grid-search", [

                makeWithAttr("div", "sideBarView", "flex-between-search1", [

                    makeWithAttr("div", "dishSearchView", "", [
                        makeWithAttr("h5", "updateTitle" ,"" ,""),
                        makeInput("inputDishTitle", "text" ,"","","","Enter key words"),
                        makeWithAttr("label", "", "space", [
                            makeWithAttr("select", "selectTypeDish", "", [
                                make("option", "All"),
                                make("option", "Main Course"),
                                make("option", "Side Dish"),
                                make("option", "Dessert"),
                                make("option", "Appetizer")
                            ])
                        ]),
                        makeWithAttr("a", "search-dish-button", "", "search"),
                    ]),
                ]),

                makeWithAttr("div", "dishItems", "flex-between-search2", [
                    makeWithAttr("div", "dishes-items", "", [
                    ])
                ])
            ])
        );
        this.afterRender();
    }

    async afterRender() {
        let title = "FIND A DISH";
        if(this.model.getFullMenu()) {
            title = "ADD ANOTHER ONE";
        }
        this.container.querySelector("#updateTitle").textContent = title;
    }

    update(dishes) {
        // TODO Lab3

        dishes.map(dish => {
            this.container.querySelector("#dishes-items").append(
                makeWithAttr("div", "", "dish", [
                          makeWithAttr("a", dish.id, "clickableImage",[
                            makeImage("","dish-image", "https://spoonacular.com/recipeImages/" + dish.image),
                            makeWithAttr("p","","dish-text", dish.title),
                          ]),
                ])
            )});
    }
}
