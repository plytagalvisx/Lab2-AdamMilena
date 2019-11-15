class SearchView {
    
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {

    this.container.append(
        
              makeWithAttrAndStyle("div", "searchContainer", "item-main", "display: flex;\n" +
                  "    flex-direction: row;\n" +
                  "    padding-left: 40px;", [

                      makeWithAttr("div", "", "divMiddleHeight", [
                    makeWithAttr("div", "", "", [
                      makeWithAttr("h5", "", "", "FIND A DISH"),
                      makeInput("divBorderInput", "text", "", "", "", "Enter key words"),
                      makeWithAttr("label", "", "", [
                        makeWithAttr("select", "", "", [
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


              ])
    );
    this.afterRender();
  }

  afterRender() {
  }
}