class DetailsController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        //this.something = this.sendOverToDetailsView.bind(this);

        // TODO lab 3
    }

    update(model, change) {
        //?????
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

         this.view.container.querySelector("#addToMenuBtn").addEventListener('click', () => {
             let id = window.location.hash.slice(1).split(':')[2];
             console.log("The HASH: ", id);
             this.model.addDishToMenu(this.model.getDish(id));
             GSC('details', 'addToMenuBtn')
         });

         //this.sendOverToDetailsView();
    }

    // TODO Lab 3

    async sendOverToDetailsView(id) {
        console.log("IT WORKS!!, id: ", id);
        /*let hash = window.location.hash;
        console.log("Checking hash: ", hash);*/

        /*const indexOfID = hash.indexOf("id");
        const id = hash.substring(indexOfID + 3, hash.length);
        console.log("hash via detailsController: " + hash);
        console.log("indexOfID: " + indexOfID);
        console.log("id: " + id);*/

        this.view.container.querySelector('#details-left-container').textContent = '';
        this.view.container.querySelector('#details-preparation').textContent = '';
        this.view.container.querySelector('#details-ingredient-header').textContent = '';
        this.view.container.querySelector('#details-ingredient-list').textContent = '';
        this.view.container.querySelector('#details-ingredient-footer').textContent = '';
        await this.model.getDish(id).then(dish => {
            this.view.update(dish);
            //window.location.hash = "details";
            GSC('search', 'viewDetails');

        });



    }
}