class OverviewView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    render() {
        this.container.append(
            makeWithAttr("div", "overviewmain", "main", [
                makeWithAttr("div","dishes-container","", [
                    makeWithAttr("ul", "overview-dishes-items", "", ""),
                    makeWithAttr("div", "vertline", "", ""),
                    makeWithAttr("div","price-container","", [
                        make("div",  "Total: "),
                    ]),
                ]),
                makeWithAttr("div", "", "horiline", ""),

                makeWithAttr("a", "toPrintBtn", "", "Print full recipe")
            ])
        );
        this.afterRender();
    }

    async afterRender() {
        this.model.addObserver(["dishes", "price"], this.update.bind(this), this);
    }

    update(dishes, price) {

        this.container.querySelector("#overview-dishes-items").textContent = '';
        this.container.querySelector("#price-container").textContent = '';

        dishes.map(dish =>  {
            this.container.querySelector("#overview-dishes-items").prepend(
                makeWithAttr("li", "", "dish", [
                    makeImage("","dish-image", dish.image),
                    makeWithAttr("p","","dish-text", dish.title)
                ]),
            )});

        console.log(price);
        this.container.querySelector("#price-container").append(
            make("div", Math.round(price) + " SEK")
        );
    }
}
