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
                      makeButton("sidebarBtn", "startBtn", "#overview", "Confirm Dinner")),

              ]),

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
      Testing:
      Removes the added dish from menu (on the sidebar) when the trash tag button is pressed.
      */
      /*let removeButton = this.container.querySelector("???");
      let listener2 = function() {
          // if an added dish exists/is not null then
          // remove it:
          this.model.removeDishFromMenu(evtData.id);
      }
      removeButton.addEventListener('click', listener2, false);*/

      /*
      Displays the total price when the sidebar is collapsed
       */
      this.container.querySelector("#sidebar-top").prepend(
          make("div", "My Dinner"),
          makeWithAttr("div", "", "SEK-text", "SEK " + this.model.getTotalMenuPrice())
      );

      /*
      Fetch data from model.
       */
      let dishes = this.model.getFullMenu();
      dishes.map(dish =>  {
          this.container.querySelector("#sidebar-dishes").append(
              makeWithAttr("div", "", "flex-between-dishes", [
                  make("div", dish.title),
                  make("div", dish.pricePerServing * this.model.getNumberOfGuests()),
                  makeInnerHTML("p", "&#x1f5d1;")
              ])
          );
      });

      this.container.querySelector("#sidebar-cost").append(
          make("div", "SEK " + this.model.getTotalMenuPrice()),
      );

      // Varför fungerar inte detta? Ska inte placeholder vara det som visas från början?
      //this.container.querySelector("#sidebar-num-people").setAttribute("placeholder", this.model.getNumberOfGuests());
  }

    update(payload) {
        // TODO Lab3
    }
}