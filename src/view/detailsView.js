class DetailsView
{
    constructor(container, model)
    {
        this.container = container;
        this.model = model;
    }

    render() {
        // Details view är redan gjort. Strunta i denna kod nedan.
        /*this.container.append(
            makeWithAttr("div", "", "grid-details", [

                makeWithAttr("div", "", "flex-between-details", [
                  makeWithAttr("div", "", "leftSideDescription",[
                    makeWithAttr("div", "", "dishInfo",[
                        makeWithAttr("h3", "" ,"","ICE CREAM"),

                        makeWithAttr("div", "", "dishDetails", [
                            makeWithAttr("br", "", "", " "),
                            makeImage("", "dishDetailsImage","images/icecream.jpg")
                        ]),

                        makeWithAttr("br", "", "", " "),
                        makeWithAttr("p", "", "descriptionText",  "The description under the picture."),

                        makeWithAttr("br", "", "", " "),
                        makeWithAttr("a", "", "backToSearchBtn",  "back to search"),

                        makeWithAttr("br", "", "", " "),
                        makeWithAttr("h3", "", "detailsText",  "PREPARATION"),

                        makeWithAttr("br", "", "", " "),
                        makeWithAttr("p", "", "descriptionText",  "The preparation text.")
                    ])
                  ]),

                 makeWithAttr("div", "", "ingredientsBackground",[
                     makeWithAttr("h3", "","ingredientsText", "INGREDIENT FOR 3 PEOPLE"),
                     // Testing with dish ingredients info not received from dinner model
                     makeWithAttr("div", "", "flex-between-details", [
                         makeWithAttr("p", "", "", "2 tbsp"),
                         makeWithAttr("p", "", "", "olive oil"),
                         makeWithAttr("p", "", "", "SEK"),
                         makeWithAttr("p", "", "", "0.20")
                     ]),
                     makeWithAttr("div", "", "flex-between-details", [
                         makeWithAttr("p", "", "", "750 g"),
                         makeWithAttr("p", "", "", "lean beef mince"),
                         makeWithAttr("p", "", "", "SEK"),
                         makeWithAttr("p", "", "", "10.00")
                     ]),
                     makeWithAttr("div", "", "flex-between-details", [
                         makeWithAttr("p", "", "", "90 g"),
                         makeWithAttr("p", "", "", "pack rosciutto"),
                         makeWithAttr("p", "", "", "SEK"),
                         makeWithAttr("p", "", "", "15.00")
                     ]),
                     makeWithAttr("div", "", "flex-between-details", [
                         makeWithAttr("p", "", "", "100 ml"),
                         makeWithAttr("p", "", "", "tomato sauce"),
                         makeWithAttr("p", "", "", "SEK"),
                         makeWithAttr("p", "", "", "10.00")
                     ]),

                     makeWithAttr("a", "", "addToMenuBtn", "Add to menu")
                  ])
                ])
            ])
        );*/

        this.afterRender();

    }

    afterRender() {
        /*let backToSearchButton = this.container.querySelector(".backToSearchBtn");
        let listener = function() {
            show("search");
        }
        backToSearchButton.addEventListener('click', listener);

        this.container.querySelector(".ingredientsBackground").append(
            makeWithAttr("h3", "", "ingredientsText", "INGREDIENTS FOR " + this.model.getNumberOfGuests() + " PEOPLE")
        );

        let dishes = this.model.getFullMenu();
        dishes.map(dish => {
            this.container.querySelector(".dishDetailsText").prepend(
                make("h3", dish.title),
                make("br", " "),
                makeImage("", "dishImage", dish.image),
            );

            dish.extendedIngredients.map(ingredient => {
               // ......
            })
        })

        this.container.querySelector(".DishPrice").append(
            makeWithAttr("div", "", "flex-between-details", [
                make("div", dish.pricePerServing * this.model.getNumberOfGuests())
            ])
        );


        let addToMenuButton = this.container.querySelector(".addToMenuBtn");
        addToMenuButton.addEventListener('click', listener);*/


    }
}