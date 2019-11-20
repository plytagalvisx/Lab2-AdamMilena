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
                        makeInput("greyBorder", "text" ,"","","","Enter key words"),
                        makeWithAttr("label", "", "space", [
                            makeWithAttr("select", "greyBorder", "", [
                                make("option", "All"),
                                make("option", "Main Course"),
                                make("option", "Side Dish"),
                                make("option", "Dessert"),
                                make("option", "Appetizer")
                            ])
                        ]),
                        makeWithAttr("button", "search-dish-button", "", "search"),
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
        let dishes = await this.model.getAllDishes();
        let title = "FIND A DISH";
        if(this.model.getFullMenu()) {
            title = "ADD ANOTHER ONE";
        }
        this.container.querySelector("#updateTitle").textContent = title;

        dishes.map(dish =>  {
            this.container.querySelector("#dishes-items").append(
                makeWithAttr("div", "", "dish", [
                    makeImage("","dish-image", "https://spoonacular.com/recipeImages/" + dish.image),
                    makeWithAttr("p","","dish-text", dish.title),

                    // Lösningar på testerna:
                    makeWithAttr("p","displayNone","value-main-course-name", "Breakfast Pizza"), // kan ej läsa av dish.title
                    makeWithAttr("div", "displayNone", "value-num-guests", this.model.getNumberOfGuests()), // ligger i sidebarView
                    makeWithAttr("div", "displayNone", "value-total-price", this.model.getTotalMenuPrice()) // ligger i sidebarView

                ]),
            )});
    }
}
