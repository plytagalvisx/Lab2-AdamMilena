class SearchView {

  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {

    this.container.append(
        makeWithAttr("div", "", "grid-search", [

            makeWithAttr("div", "sidebar-top-search", "", [
              makeWithAttr("h5", "" ,"" ,"FIND A DISH")
            ]),

            makeWithAttr("br", "", "", " "),

            makeWithAttr("div", "", "flex-between-search", [
              makeInput("greyBorder", "text" ,"","","","Enter key words"),
              makeWithAttr("label", "", "", [
                makeWithAttr("select", "greyBorder", "", [
                  make("option", "All"),
                  make("option", "Main Course"),
                  make("option", "Side Dish"),
                  make("option", "Dessert"),
                  make("option", "Appetizer")
                ])
              ]),
              makeWithAttr("button", "search-dish-button", "", "search")
            ])
        ])
    );
    this.afterRender();
  }

  afterRender() {
  }
}