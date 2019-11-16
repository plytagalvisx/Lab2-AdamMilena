class SidebarView
{
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    render() {
        this.container.append(
           makeWithAttr("div", "sidebarContainer", "", [
               makeWithAttr("div", "collapsibleSidebar", "", [

               // makeWithAttr("button", "", "collapsible", "Collapsing Sidebar"),
               // makeWithAttr("div", "", "content", [
                   // makeWithAttr("p", "", "", [
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

                        ])//,
                    //])
                //]),

                       /*makeWithAttr("script", "", "", "var coll = document.getElementsByClassName(\"collapsible\");\n" +
                           "                var i;\n" +
                           "\n" +
                           "                for (i = 0; i < coll.length; i++) {\n" +
                           "                    coll[i].addEventListener(\"click\", function() {\n" +
                           "                        this.classList.toggle(\"active\");\n" +
                           "                        var content = this.nextElementSibling;\n" +
                           "                        if (content.style.display === \"block\") {\n" +
                           "                            content.style.display = \"none\";\n" +
                           "                        } else {\n" +
                           "                            content.style.display = \"block\";\n" +
                           "                        }\n" +
                           "                    });\n" +
                           "                }" +
                           "")*/

               ])

                /*makeWithAttr("script", "", "", "var w = window.innerWidth;\n" +
                    "var ww = (window.innerWidth >= 450);\n" +
                    "\n" +
                    "if(ww === true) {" +
                    "document.getElementById(\"searchContainer\").innerHTML;" +
                    "} else {" +
                    "document.getElementById(\"searchContainer\").innerHTML = \"Width: \" + w; " +
                    "}" +
                    "")*/
            ]),

               makeWithAttr("script", "", "", "function displayWindowSize(){\n" +
                   "        var w = window.innerWidth;\n" +
                   "        \n" +
                   "        if(w <= 700) {\n" +
                   "        document.getElementById(\"collapsibleSidebar\").innerHTML = \"Smaller: \" + w; " +
                   "        }\n" +
                   "        else {\n" +
                   "        document.getElementById(\"collapsibleSidebar\").innerHTML = \"Larger: \" + w; " +
                   "        }\n" +
                   "    }\n" +
                   "     \n" +
                   "    window.addEventListener(\"resize\", displayWindowSize);\n" +
                   "    \n" +
                   "    displayWindowSize();")

        );


    }
        afterRender()
        {

        }
    }




