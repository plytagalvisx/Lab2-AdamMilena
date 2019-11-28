class SidebarView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    render() {
        this.container.append(
            makeWithAttr("div", "" , "grid-sidebar", [

                makeWithAttr("div", "sidebar-top", "", [
                    //makeWithAttr("div","","","My Dinner"),
                    //makeWithAttr("div","","","SEK 77.45"),
                    makeWithAttr("a", "collapse-sidebar-btn", "hamburger",""),

                ]),
                makeWithAttr("div", "", "collapsible", [
                    makeWithAttr("div", "sidebar-people" ,"" ,"People"),
                    makeInput("sidebar-num-people", "number" ,"0","1","0",""),
                    makeWithAttr("div", "", "flex-between", [
                        makeWithAttr("div", "", "", "Dish Name"),
                        makeWithAttr("div", "", "", "Cost"),
                    ]),
                    /*
                    sidebar-dishes and sidebar-cost are filled in afterRender().
                     */
                    makeWithAttr("div", "sidebar-dishes", "", ""),
                    makeWithAttr("div", "sidebar-cost" ,"", ""),

                    makeWithAttr("div", "sidebar-confirm", "",
                        makeWithAttr("a", "sidebarBtn", "startBtn", "Confirm Dinner")),
                ]),

            ])
        );
        this.afterRender();
    }

    afterRender() {
        /*
        Displays the total price when the sidebar is collapsed
         */
        this.container.querySelector("#sidebar-top").prepend(
            make("div", "My Dinner"),
            makeWithAttr("div", "", "SEK-text", "SEK " + this.model.getTotalMenuPrice())
        );

        this.model.addObserver(["dishes", "price", "numberOfGuests"], this.update.bind(this), this);
    }

    update(dishes, price, guests) {

        this.container.querySelector("#sidebar-dishes").textContent = '';
        this.container.querySelector("#sidebar-cost").textContent = '';

        dishes.map(dish =>  {
            this.container.querySelector("#sidebar-dishes").append(
                makeWithAttr("div", "", "flex-between-dishes", [
                    make("div", dish.title),
                    make("div", Math.round(dish.pricePerServing * guests)),
                    makeWithAttr("a", "removeDishBtn", "removeDishBtn", [
                        makeInnerHTML("p", dish.id, "removeBtn", "&#x1f5d1;")
                    ])
                ])
            );
        });

        this.container.querySelector("#sidebar-cost").append(
            make("div", "SEK " + Math.round(price)),
        );
    }
}