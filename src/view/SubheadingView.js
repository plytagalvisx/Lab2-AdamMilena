class SubheadingView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    render() {
        this.container.append(
            makeWithAttr("div", "", "subheading", [
                makeWithAttr("div","overview-persons", "", [
                    make("p", "My dinner: "),
                    makeWithAttr("p","numGuests", "",""),
                    makeWithAttr("p", "people", "", "")
                ]),
                makeButton("backBtn", "backBtn", "#search", "Go back and edit dinner")
            ])
        );
        this.afterRender();
    }

    afterRender() {
        this.container.querySelector("#numGuests").innerHTML = this.model.getNumberOfGuests();
        if(this.model.getNumberOfGuests() === 1)
            this.container.querySelector("#people").innerHTML = "person";
        else
            this.container.querySelector("#people").innerHTML = "people";

    }

    update(payload) {
        // TODO Lab3
    }
}
