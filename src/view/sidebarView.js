class SidebarView
{
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    render() {
        this.container.append(
            /*makeWithAttr("div", "sideBarView", "item-sidebar", [
                  makeWithAttr("div", "", "stretchBottom", [
                makeWithAttr("h3", "", "my-dinner-text", "My Dinner"),
                makeWithAttr("p", "", "", "People"),
                makeInput("inputNumOfPeople", "number", "0", "1", "0", ""),
                make("br", ""),
                makeWithAttr("div", "divBorder","space", ["DishName ", " Cost"]),
                makeWithAttr("div", "divBorderNothing", "space", ["Lasagne ", "SEK"]),
                make("br", ""),

                makeWithAttr("div", "", "flex-content-Btn", [
                makeWithAttr("button", "flexBtn", "sidebarBtn", "Confirm Dinner") ]) ])

           ])*/
            /*makeWithAttr("div", "", "", [
                makeWithAttr("div", "mySidenav", "sidenav", [
                    makeHyperlink("javascript:void(0)", "", "closebtn", "closeNav()", "&times")
                ]),

                makeWithAttr("p", "", "", "Click on the sidebar button!"),
                makeSpan("", "spantext", "closeNav()", "&#9776; open")

            ])*/

           makeWithAttr("div", "divBorder", "", [
                makeWithAttr("button", "", "collapsible", "Collapsing Sidebar"),
                makeWithAttr("div", "", "content", [
                    makeWithAttr("p", "", "", [
                        makeWithAttr("div", "sideBarView", "item-sidebar", [
                            makeWithAttr("div", "", "stretchBottom", [
                                makeWithAttr("h3", "", "my-dinner-text", "My Dinner"),
                                makeWithAttr("p", "", "", "People"),
                                makeInput("inputNumOfPeople", "number", "0", "1", "0", ""),
                                make("br", ""),
                                makeWithAttr("div", "divBorder","space", ["DishName ", " Cost"]),
                                makeWithAttr("div", "divBorderNothing", "space", ["Lasagne ", "SEK"]),
                                make("br", ""),

                                makeWithAttr("div", "", "flex-content-Btn", [
                                    makeWithAttr("button", "flexBtn", "sidebarBtn", "Confirm Dinner") ]) ])

                        ])
                    ])
                ]),

           makeWithAttr("script", "", "", "var search = document.getElementById(\"searchContainer\"); " +
               "var coll = document.getElementsByClassName(\"collapsible\");\n" +
               "                var i;\n" +
               "\n" +
               "                for (i = 0; i < coll.length; i++) {\n" +
               "                    coll[i].addEventListener(\"click\", function() {\n" +
               "                        this.classList.toggle(\"active\");\n" +
               "                        var content = this.nextElementSibling;\n" +
               "                        if (search.style.display === \"none\" && content.style.display === \"block\") {\n" +
               "                            search.style.display = \"flex\";\n" +
               "                            content.style.display = \"none\";\n" +
               "                        } else {\n" +
               "                            search.style.display = \"none\";\n" +
               "                            content.style.display = \"block\";\n" +
               "                        }\n" +
               "                    });\n" +
               "                }")

               ])
        );


    }
        afterRender()
        {

        }
    }




