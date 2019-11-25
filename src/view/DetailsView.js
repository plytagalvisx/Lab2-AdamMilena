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
                        makeWithAttr("a", "addToMenuBtn", "startBtn", "Add to menu")),
                ]),
                makeWithAttr("div", "details-left-container", "" , ""),
                makeWithAttr("a", "backToSearchBtn", "backBtn", "Back to search"),
                makeWithAttr("div", "details-preparation", "", ""),



            ])

        );

        //this.afterRender();

    }

    /*afterRender() {
    }*/

    async update(id) {
       // this.afterRender(dish);
        // TODO Lab3

        /*let hash = window.location.hash;
        console.log("hash via detailsView: ", hash);
        const indexOfID = hash.indexOf("id");
        const id = hash.substring(indexOfID + 3, hash.length);
        console.log("hash: " + hash);
        console.log("indexOfID: " + indexOfID);
        console.log("id: " + id);*/

        let hash = window.location.hash;
        console.log("Checking hash cia view: ", hash);
        console.log("Checking id cia detailsView: ", id);

        await this.model.getDish(id).then(dish => {
            //this.update(); // Den körs utan stopp, hur kan vi göra att den ska köras endast en gång och sen sluta köra om igen.
            let guests = this.model.getNumberOfGuests();
            this.container.querySelector("#details-left-container").append(
                makeWithAttr("div", "", "details-heading", dish.title),
                makeImage("","details-image", dish.image),
                makeWithAttr("div", "details-image-text", "", dish.winePairing.pairingText),
            );
            this.container.querySelector("#details-preparation").append(
                makeWithAttr("div", "", "details-heading", "Preparation"),
                makeWithAttr("div", "", "details-text" , dish.instructions),
            );

            this.container.querySelector("#details-ingredient-header").textContent = ("Ingredients for " + this.model.getNumberOfGuests() + " people");

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
        });
    }
}
