class HomeController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        // TODO lab 3
    }

    renderView() {
        this.view.render();
        // TODO lab 3

        let createNewDinnerBtn = this.view.container.querySelector("#startBtn");
        let listener = function() {
            GSC('home', 'startBtn');
        }
        createNewDinnerBtn.addEventListener('click', listener);

    }

    // TODO Lab 3
}