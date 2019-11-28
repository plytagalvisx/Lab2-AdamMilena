class OverviewController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    renderView() {
        this.view.render();
        this.view.container.querySelector("#toPrintBtn").addEventListener('click', () => {
            GSC('overview', 'toPrintBtn');
        })
    }
}