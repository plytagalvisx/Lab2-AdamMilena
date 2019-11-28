class DetailsView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    render() {
        this.container.append(
            makeWithAttr("div", "details-container", "", [
                makeWithAttr("div", "details-ingredients", "", [
                    makeWithAttr("div", "details-ingredient-header", "ingredient", ""),
                    makeWithAttr("div", "", "details-line", ""),
                    makeWithAttr("div", "details-ingredient-list", "", ""),
                    makeWithAttr("div", "", "details-line", ""),
                    makeWithAttr("div", "details-ingredient-footer", "",
                    ),
                    makeWithAttr("a", "addToMenuBtn", "startBtn", "Add to menu")
                ]),
                makeWithAttr("div", "details-left-container", "" , ""),
                makeWithAttr("a", "backToSearchBtn", "backBtn", "Back to search"),
                makeWithAttr("div", "details-preparation", "", ""),
            ])
        );
        this.afterRender();
    }

    afterRender() {
        this.model.addObserver(['dishDetails', 'numberOfGuests'], this.update.bind(this), this);
    }

    clearDetails() {
        this.container.querySelector('#details-left-container').textContent = '';
        this.container.querySelector('#details-preparation').textContent = '';
        this.container.querySelector('#details-ingredient-header').textContent = '';
        this.container.querySelector('#details-ingredient-list').textContent = '';
        this.container.querySelector('#details-ingredient-footer').textContent = '';
    }

    async update(dish, guests) {
        // TODO Lab3
        this.clearDetails();
        GSC('search', 'viewDetails');
        this.container.querySelector("#details-left-container").append(
            makeWithAttr("div", "", "details-heading", dish.title),
            makeImage("","details-image", dish.image),
            makeWithAttr("div", "details-image-text", "", dish.winePairing.pairingText),
        );
        this.container.querySelector("#details-preparation").append(
            makeWithAttr("div", "", "details-heading", "Preparation"),
            makeWithAttr("div", "", "details-text" , dish.instructions),
        );

        this.container.querySelector("#details-ingredient-header").textContent = ("Ingredients for " + guests + " people");

        dish.extendedIngredients.map(ingredient => {
            this.container.querySelector("#details-ingredient-list").append(
                makeWithAttr("div", "", "details-ingredient-dish", [
                    makeWithAttr("div", "" ,"amount", ingredient.amount*guests + " " + ingredient.measures.metric.unitShort),
                    makeWithAttr("div","","ingredient", ingredient.name)
                ]),
            )
        });

        this.container.querySelector("#details-ingredient-footer").append(
            make("div", "SEK " + dish.pricePerServing * guests)
        );
    }
}
