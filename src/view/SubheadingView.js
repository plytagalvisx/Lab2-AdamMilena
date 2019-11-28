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
                makeWithAttr("a", "backBtn", "backBtn", "Go back and edit dinner")
            ])
        );
        this.afterRender();
    }

    async afterRender() {
        this.model.addObserver(['numberOfGuests'], this.update.bind(this), this);
    }

    async update(guest) {
        this.container.querySelector("#numGuests").innerHTML = guest;
        if(guest === 1)
            this.container.querySelector("#people").innerHTML = "person";
        else
            this.container.querySelector("#people").innerHTML = "people";
    }
}
