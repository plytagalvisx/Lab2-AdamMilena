class SidebarView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }

  render() {
      this.container.append(
          makeWithAttr("div", "" , "grid-sidebar", [
              makeWithAttr("div", "sidebar-top", "", [
                  makeWithAttr("div","","","My Dinner"),
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
                  sidebar-dishes fylls från modellen, innehåller är endast platshållare
                   */
                  makeWithAttr("div", "sidebar-dishes", "", [
                      makeWithAttr("div","", "flex-between", [
                          make("div", "Pizza"),
                          make("div", "20kr")
                      ]),
                      makeWithAttr("div","", "flex-between", [
                          make("div", "Pizza"),
                          make("div", "20kr")
                      ]),
                      makeWithAttr("div","", "flex-between", [
                          make("div", "Pizza"),
                          make("div", "20kr")
                      ])
                  ])
              ])
          ])
      );
      this.afterRender();
  }

  afterRender() {
      /*
      Hide and show menu in mobile view.
       */
      let button = this.container.querySelector("#collapse-sidebar-btn");
      let collapsible = this.container.querySelector(".collapsible");
      let listener = function() {
        if(collapsible.style.display === "none")
            collapsible.style.display = "grid";
        else
            collapsible.style.display = "none";
      };
      button.addEventListener('click', listener, false);

      /*
      Fetch data from model.
       */


  }
}