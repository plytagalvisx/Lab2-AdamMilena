class DetailsController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    update() {
    }

    async renderView() {
        this.view.render();
        this.view.container.querySelector("#backToSearchBtn").addEventListener('click', () => {
             GSC('details', 'goBackBtn')
         }, false);

         this.view.container.querySelector("#addToMenuBtn").addEventListener('click', async () => {
             let dish = this.model.getDishDetails();
             console.log(dish);
             this.model.addDishToMenu(dish);
             GSC('details', 'addToMenuBtn');
         }, false);
    }
}