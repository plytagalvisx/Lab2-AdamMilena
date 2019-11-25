class DetailsController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        //this.something = this.sendOverToDetailsView.bind(this);

        // TODO lab 3
    }

    renderView() {
        // TODO lab 3

       /* await this.something();
        console.log("Find a dish Event detailsController:");
        let sendOverToDetailsView = this.sendOverToDetailsView.bind(this);
        let listener2 = function() {
            sendOverToDetailsView();
        };
        let clickedImage = this.view.container.querySelector("#dishes-items");
        clickedImage.addEventListener('click', listener2);*/


         this.view.render();
         let listener = function() {
             GSC('details', 'goBackBtn')
         };
         let backToSearchBtn = this.view.container.querySelector("#backToSearchBtn");
         backToSearchBtn.addEventListener('click', listener);


         //this.sendOverToDetailsView();
    }

    // TODO Lab 3

    sendOverToDetailsView(id) {

        // Problem: let hash blir lika med '#loader' som nuvarande hash,
        // men istället så vill vi få let hash att vara lika med t.ex '#details:id:547775'
        // beroende på vilken dish image vi klickar på i search vyn.

        // When we dispatch an event in one view, we need to be able to check
        // that it triggers an update in a different view. For example,
        // when we dispatch an event in searchView, then an update in detailsView
        // must be triggered.

        console.log("IT WORKS!! ", id);
        /*let hash = window.location.hash;
        console.log("Checking hash: ", hash);

        const indexOfID = hash.indexOf("id");
        const id = hash.substring(indexOfID + 3, hash.length);
        console.log("hash via detailsController: " + hash);
        console.log("indexOfID: " + indexOfID);
        console.log("id: " + id);

        //let fakeId = 547775;
        this.model.getDish(id).then(dish => {
            //console.log("Dish: ", dish);
            this.view.update(dish);
            //this.view.update();
        });*/



    }
}