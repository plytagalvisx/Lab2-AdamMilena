class DetailsController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        //this.something = this.sendOverToDetailsView.bind(this);

        // TODO lab 3
    }

     renderView() {
        // TODO lab 3

        //await this.something();
        /*console.log("Find a dish Event:");
        let sendOverToDetailsView = this.sendOverToDetailsView.bind(this);
        let listener = function() {
            sendOverToDetailsView();
        };
        let clickedImage = this.view.container.querySelector("#dishes-items");
        clickedImage.addEventListener('click', listener);*/


         this.view.render();
         let listener = function() {
             GSC('details', 'goBackBtn')
         };
         let backToSearchBtn = this.view.container.querySelector("#backToSearchBtn");
         backToSearchBtn.addEventListener('click', listener);


         const hash = window.location.hash;
         const idIndex = hash.indexOf("id");
         const id = hash.substring(idIndex + 2, hash.length);
         console.log("Trying to render a details view. ID: " + hash + " " + idIndex + " " + id);

         //let fakeId = 547775;
         /*this.model.getDish(id).then(dish => {
             //console.log("HELLO: ", dish);
             this.view.update(dish);
             //this.addListeners(dish);
         });*/
    }

    // TODO Lab 3

    sendOverToDetailsView() {

        //debugger;
        /*return new Promise(resolve => {
            //let clearTextContent = document.querySelector('#dishes-items');
            //clearTextContent.textContent = '';

            let dish = this.model.getDish(818941);
            dish.then(result => {
                return result.json();
            }).then(console.log).catch(console.error).finally(() => {
                dish.then(result => this.view.update(result));
                resolve();
            });
        });*/
        //debugger;


    }
}