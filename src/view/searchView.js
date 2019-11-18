class SearchView {

  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {
    this.container.append(
        makeWithAttr("div", "", "grid-search", [

             makeWithAttr("div", "", "flex-between-search", [
               makeWithAttr("div", "", "upperSearchPart", [
                  makeWithAttr("h5", "" ,"" ,"FIND A DISH"),

                  makeWithAttr("div", "", "", [
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
                      makeWithAttr("button", "search-dish-button", "", "search"),
                  ])
               ])
             ]),

            make("br", ""),
            makeWithAttr("div", "", "flex-between-search2", [
                makeWithAttr("div", "dishes-items", "", [

                 // Testar bilderna utan att kalla data från modellen: //
                    /*makeWithAttr("div", "", "dishDetails", [
                        makeWithAttr("br", "", "", " "),
                        makeImage("", "dishDetailsImage","images/icecream.jpg"),
                        makeWithAttr("p","","dish-text", "dish.title")
                    ]),
                    makeWithAttr("div", "", "dishDetails", [
                        makeWithAttr("br", "", "", " "),
                        makeImage("", "dishDetailsImage","images/icecream.jpg"),
                        makeWithAttr("p","","dish-text", "dish.title")
                    ]),
                    makeWithAttr("div", "", "dishDetails", [
                        makeWithAttr("br", "", "", " "),
                        makeImage("", "dishDetailsImage","images/icecream.jpg"),
                        makeWithAttr("p","","dish-text", "dish.title")
                    ]),
                    makeWithAttr("div", "", "dishDetails", [
                        makeWithAttr("br", "", "", " "),
                        makeImage("", "dishDetailsImage","images/icecream.jpg"),
                        makeWithAttr("p","","dish-text", "dish.title")
                    ]),
                    makeWithAttr("div", "", "dishDetails", [
                        makeWithAttr("br", "", "", " "),
                        makeImage("", "dishDetailsImage","images/icecream.jpg"),
                        makeWithAttr("p","","dish-text", "dish.title")
                    ])*/

                  ])
               ])
        ])
    );
    this.afterRender();
  }

  afterRender() {
      let dishes = this.model.getFullMenu();
      dishes.map(dish =>  {
          this.container.querySelector("#dishes-items").append(
              makeWithAttr("div", "", "dish", [
                  makeWithAttr("br", "", "", " "),
                  makeImage("","dish-image", dish.image),
                  makeWithAttr("p","","dish-text", dish.title)
              ]),
          )});
  }
}
