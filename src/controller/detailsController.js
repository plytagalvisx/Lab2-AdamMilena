class DetailsController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    async renderView() {
         this.view.render();
         this.view.container.querySelector("#backToSearchBtn").addEventListener('click', () => {
             GSC('details', 'goBackBtn')
         }, false);

         this.view.container.querySelector("#addToMenuBtn").addEventListener('click', async () => {
             this.model.addDishToMenu(this.model.getDishDetails());
             GSC('details', 'addToMenuBtn');
         }, false);
    }


}