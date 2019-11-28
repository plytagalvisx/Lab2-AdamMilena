class HomeView {
  constructor(container) {
    this.container = container;
    this.startBtn = null;
  }

  render() {
    this.container.append(
        makeWithAttr("div", "flex-home","",[
          makeWithAttr("p", "text-center", "",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam\n" +
              "          magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet\n" +
              "          arcu. Maecenas a efficitur leo."),
          makeWithAttr("a", "startBtn", "startBtn", "Create new dinner")
        ]),

    );
    this.afterRender();
  }

  afterRender() {
    this.startBtn = this.container.getElementsByClassName("#startBtn");
  }
}
