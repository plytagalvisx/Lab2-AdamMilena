class SubheadingController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        // TODO lab 3
    }

    renderView() {
        this.view.render();
        // TODO lab 3

        let goBackButton = this.view.container.querySelector("#backBtn");
        let listener = function() {
            GSC('overview', 'goBackBtn');
        }
        goBackButton.addEventListener('click', listener);

    }

    // TODO Lab 3
}