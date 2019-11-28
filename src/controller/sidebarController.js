class SidebarController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        // TODO lab 3
    }

    renderView() {
        this.view.render();
        // TODO lab 3

        /*
         Hide and show menu in mobile view.
        */
        let sidebarButton = this.view.container.querySelector("#collapse-sidebar-btn");
        let collapsible = this.view.container.querySelector(".collapsible");
        let listener = function() {
            if(collapsible.style.display === "none")
                collapsible.style.display = "grid";
            else
                collapsible.style.display = "none";
        };
        sidebarButton.addEventListener('click', listener, false);


        let confirmButton = this.view.container.querySelector("#sidebarBtn");
        let listener2 = function() {
            GSC('search', 'confirmBtn');
        };
        confirmButton.addEventListener('click', listener2, false);

        /*
         Removes the dish from menu.
        */
        let removeDishButton = this.view.container.querySelector('#sidebar-dishes');
        removeDishButton.addEventListener('click', dishItem => {
            let dishItemClassName = dishItem.target.parentElement.firstElementChild.className;
            if (dishItemClassName === 'removeBtn')
            {
                let dishItemId = dishItem.target.parentElement.firstElementChild.id;
                console.log("removed dish: ", dishItemId);

                let dishes = this.model.getFullMenu();
                dishes.map(dish => {
                    if(dish.id == dishItemId) {
                        //console.log("condition is?: ", (dish.id == dishItemId));
                        let removedDish = this.model.removeDishFromMenu(dish.id);
                    }
                });
                GSC('search', 'removeDishBtn');
            }
        });



    }

    // TODO Lab 3
}