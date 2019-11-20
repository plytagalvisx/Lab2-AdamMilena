class OverviewView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    render() {
        this.container.append(
            makeWithAttr("div", "overviewmain", "main", [
                makeWithAttr("div","dishes-container","", [
                    makeWithAttr("ul", "dishes-items", "", [
                        makeWithAttr("div", "vertline", "", ""),
                        makeWithAttr("div","price-container","", [
                            make("div",  "Total: "),
                        ]),
                    ]),
                ]),
                makeWithAttr("div", "", "horiline", ""),

                makeWithAttr("div", "toPrintBtn", "", "Print full recipe")
            ])
        );
        this.afterRender();
    }

    afterRender() {
        let dishes = this.model.getFullMenu();
        dishes.map(dish =>  {
            this.container.querySelector("#dishes-items").prepend(
                makeWithAttr("li", "", "dish", [
                    makeImage("","dish-image", dish.image),
                    makeWithAttr("p","","dish-text", dish.title)
                ]),
            )});

        this.container.querySelector("#price-container").append(
            make("div", Math.round(this.model.getTotalMenuPrice()) + " SEK")
        );

    }
}
