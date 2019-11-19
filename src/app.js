const make = (type, children) => {
  let ret = document.createElement(type);
  if(children instanceof Array)
    ret.append(... children);
  else
    ret.append(children);
  return ret;
};

const makeWithAttr = (type, id, className, children) => {
  let ret = document.createElement(type);
  ret.id = id;
  ret.setAttribute("class", className);
  if(children instanceof Array)
    ret.append(... children);
  else
    ret.append(children);
  return ret;
};

const makeImage = (id, className, path) => {
  let ret = document.createElement("img");
  ret.id = id;
  ret.setAttribute("class", className);
  ret.src = path;
  return ret;
};

const makeInput= (id, type, value, step, min, placeholder) => {
    const ret= document.createElement("input");
    ret.id = id;
    ret.type = type;
    ret.value = value;
    ret.step = step;
    ret.min = min;
    ret.placeholder = placeholder;
    return ret;
};

const makeButton = (id, className, onclick) => {
    const ret= document.createElement("button");
    ret.id = id;
    ret.onclick = onclick;
    ret.setAttribute("class", className);
    return ret;
};

// helper function to find the container by short name
const container=function(containerName){
  return document.body.querySelector("#container-"+containerName);
};

// the View containers will not all be visible at the same time.
// Various screens will show different Views
const screens = {
    loader: ["loader"],
    home: ["header", "home"],
    search: ["header", "sidebar", "search"],
    overview: ["header", "subheading", "overview"],
    print: ["header", "subheading", "print"],
    details: ["header", "sidebar", "details"],
};

// switching between screens
const show = function(screenName) {
  // hide all views first
  // optional FIXME: we could avoid hiding the containers that are part of the screen to be shown
  // optional FIXME: finding the containers could be done automatically
  // by looking at document.body.firstChild.children
  ["header", "home", "overview", "search", "sidebar", "print", "subheading", "details", "loader"]
      .forEach(containerName => container(containerName).style.display="none");

  // now we show all the Views used by the indicated screen
  screens[screenName]
      .forEach(containerName => container(containerName).style.display = "block");
};

/*
const hasHasChanged = function () {
    this.router.hashHasChanged(container);
};
*/

window.onload = function () {

/*    window.location.hash = '';

    window.addEventListener("hashchange", hashHasChanged, false);*/

  console.log("start");
  //We instantiate our model
  const model = new DinnerModel();
  model.setNumberOfGuests(2);

  show("loader");

  Promise.all([model.getDish(453), model.getDish(559251)])
      .then(function(values) {

        for(const element of values)
          model.addDishToMenu(element);
        new HomeView(container("home"), model).render();
        new SubheadingView(container("subheading"), model).render();
        new OverviewView(container("overview"), model).render();
        new SearchView(container("search"), model).render();
        new PrintOutView(container("print"), model).render();
        new SidebarView(container("sidebar"), model).render();
        new DetailsView(container("details"), model).render();

        show("search");
      })
      .catch(console.error);

};
