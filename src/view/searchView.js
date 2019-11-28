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
        this.model.addObserver(["dishes"], this.update.bind(this), this);
    }

    update(dishes) {
        // TODO Lab3

        let title = "ADD ANOTHER ONE";
        if(!dishes) {
            title = "FIND A DISH";
        }
        this.container.querySelector("#updateTitle").textContent = title;

        dishes.map(dish => {
            this.container.querySelector("#dishes-items").append(
                makeWithAttr("div", "", "dish", [
                          makeWithAttr("a", dish.id, "clickableImage",[
                            makeImage("","dish-image", "https://spoonacular.com/recipeImages/" + dish.image),
                            makeWithAttr("p","","dish-text", dish.title),
                          ])
                ])
            )});
    }
}
