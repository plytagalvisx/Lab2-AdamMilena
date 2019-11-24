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


        // Problem: let hash blir lika med '#loader' som nuvarande hash,
        // men istället så vill vi få let hash att vara lika med t.ex '#details:id:547775'
        // beroende på vilken dish image vi klickar på i search vyn.
        let hash = window.location.hash;
        console.log("Checking hash: ", hash);

        const indexOfID = hash.indexOf("id");
        const id = hash.substring(indexOfID + 3, hash.length);
        console.log("hash: " + hash);
        console.log("indexOfID: " + indexOfID);
        console.log("id: " + id);

        //let fakeId = 547775;
        this.model.getDish(id).then(dish => {
            //console.log("Dish: ", dish);
            this.view.update(dish);
        });
    }

    // TODO Lab 3

    sendOverToDetailsView() {

        //debugger;
        /*return new Promise(resolve => {
            //let clearTextContent = document.querySelector('#dishes-items');
            //clearTextContent.textContent = '';

            let dish = this.model.getDish(547775);
            dish.then(result => {
                this.view.update(result);
                resolve();
            });
        });*/
        //debugger;


    }
}