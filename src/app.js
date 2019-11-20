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
  let ret = document.createElement("div");
  ret.id = id;
  ret.setAttribute("class", className);
  ret.setAttribute("style", "background: url('" + path + "'); background-size: cover; background-position: center;");
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

const makeButton = (id, className, href, children) => {
    const ret= document.createElement("a");
    ret.id = id;
    ret.href = href;
    ret.setAttribute("class", className);
    ret.append(children);
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

const routes = [
    {name: 'loader', screen: ['loader']},
    {name: 'home', screen: ['header', 'home']},
    {name: 'search', screen: ['header','sidebar','search']},
    {name: 'overview', screen: ["header", "subheading", "overview"]},
    {name: 'print', screen: ["header", "subheading", "print"]},
    {name: 'details', screen: ["header", "sidebar", "details"]},
];

const router = function() {
    const hash = window.location.hash.slice(1);
    console.log(hash);
    console.log("route: " + routes.filter(route => route.name === hash).map(route => route.screen));

    // Set non-needed views to not show:
    routes
        .filter(route => route.name !== hash)
        .map(route => route.screen)
        .flat()
        .map(route => {
            if(container(route).style.display === 'block')
                container(route).style.display = 'none'
        });

    // Set needed views to show:
    routes
        .filter(route => route.name === hash)
        .map(route => route.screen)
        .flat()
        .map(screen => container(screen).style.display = 'block');
};

window.onload = function () {

  console.log("start");
  //We instantiate our model
  const model = new DinnerModel();
  model.setNumberOfGuests(2);

  window.addEventListener("hashchange", router);
  window.addEventListener("load", router);

  window.location.hash = 'loader';

    Promise.all([model.getDish(453), model.getDish(559251)])
        .then(function(values) {

            for(const element of values) {
                model.addDishToMenu(element);
            }
            new HomeView(container("home"), model).render();
            new SubheadingView(container("subheading"), model).render();
            new OverviewView(container("overview"), model).render();
            new SearchView(container("search"), model).render();
            new PrintOutView(container("print"), model).render();
            new SidebarView(container("sidebar"), model).render();
            new DetailsView(container("details"), model).render();

            window.location.hash = 'search';
        })
        .catch(console.error);

};
