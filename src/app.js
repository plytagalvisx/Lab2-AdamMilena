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

/* Create id/class in order to define an event reference on the trash tag
* so when the tag is clicked, it will remove the added dish from the menu */
const makeInnerHTML = (type, id, className, arg) => {
    let ret = document.createElement(type);
    ret.setAttribute("class", className);
    ret.id = id;
    ret.innerHTML = arg;
    return ret;
};

const makeImage = (id, className, path) => {
  let ret = document.createElement("div");
  ret.id = id;
  ret.setAttribute("class", className);
  ret.setAttribute("style", "background: url('" + path + "');background-size: cover;background-position: center;");
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
    if(children instanceof Array)
        ret.append(... children);
    else
        ret.append(children);
    return ret;
};

// helper function to find the container by short name
const container=function(containerName){
  return document.body.querySelector("#container-"+containerName);
};

const GSC = function (initState, condition, id) {
    Router.transits
        .map(transit => {
            if(transit.initState === initState && transit.condition === condition) {
                if (!id) {
                    window.location.hash = transit.nextState;
                    //console.log("hash with no id!");
                }
                else {
                    window.location.hash = transit.nextState + ":" + id;
                    //console.log("hash with id!");
                }
            }
        });
};

/*
Router is a singleton function and can only be created through calling Router.getRouter().
When the router is created, the initial routes are also created.
New routes can be added via Router.addRoute(name, screensarray).
Routes can be deleted via Router.deleteRoute(routeNameToDelete).
 */
const Router = (function() {
    let router;

    let routes = [
        {name: 'loader', screen: ['loader']},
        {name: 'home', screen: ['header', 'home']},
        {name: 'search', screen: ['header','sidebar','search']},
        {name: 'search?searchString', screen: ['header', 'sidebar', 'search']},
        {name: 'details:id', screen: ['header', 'sidebar', 'details']},
        {name: 'overview', screen: ["header", "subheading", "overview"]},
        {name: 'print', screen: ["header", "subheading", "print"]},
        {name: 'details', screen: ["header", "sidebar", "details"]},
        {name: '404', screen: ["header", "404"]}
    ];

    const transits = [
        {initState: 'home', condition: 'startBtn', nextState: 'search'},
        {initState: 'overview', condition: 'toPrintBtn', nextState: 'print'},
        {initState: 'overview', condition: 'goBackBtn', nextState: 'search'},
        {initState: 'search', condition: 'confirmBtn', nextState: 'overview'},
        {initState: 'search', condition: 'search?searchString', nextState: 'search'},
        {initState: 'search', condition: 'search:dishid', nextState: 'loader'},
        {initState: 'search', condition: 'viewDetails', nextState: 'details'},
        {initState: 'details', condition: 'goBackBtn', nextState: 'search'},
        {initState: 'details', condition: 'addToMenuBtn', nextState: 'search'},
        {initState: 'search', condition: 'removeDishBtn', nextState: 'search'},
    ];

    function createRouter() {
        window.addEventListener("hashchange", route);
        window.addEventListener("load", route);
        return {};
    }

    function route() {
        let hash = window.location.hash.slice(1);

        // If a non-valid hash is entered, show the 404 page.
        if(!routes.map(route => route.name).includes(hash))
            hash = '404';

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
    }

    return {
        getRouter: function () {
            if (!router) {
                router = createRouter();
            }
            return router;
        },
        addRoute: function(name, screens) {
            if(screens instanceof Array)
                routes.push(newRoute = {name: name, screens: screens});
            else
                return "Screens must be an array.";

            console.log(routes);
        },
        deleteRoute: function(routeToDelete) {
            if(routes.map(route => route.name).includes(routeToDelete)) {
                routes = routes.filter(route => route.name !== routeToDelete);
                console.log(routes);
            }
            else
                return "The given route is not specified";
        },
        transits,
    };
})();

window.onload = function () {

  console.log("start");
  //We instantiate our model
  const model = new DinnerModel();
  model.setNumberOfGuests(1);

    Router.getRouter();
    let hash = window.location.hash;

    window.location.hash = 'loader';

    const homeView = new HomeView(container("home"), model);
    const subheadingView = new SubheadingView(container("subheading"), model);
    const overviewView = new OverviewView(container("overview"), model);
    const searchView = new SearchView(container("search"), model);
    const printoutView = new PrintOutView(container("print"), model);
    const sidebarView = new SidebarView(container("sidebar"), model);
    const detailsView = new DetailsView(container("details"), model);

    new HomeController(homeView, model).renderView();
    new SubheadingController(subheadingView, model).renderView();
    new OverviewController(overviewView, model).renderView();
    new PrintoutController(printoutView, model).renderView();
    new SidebarController(sidebarView, model).renderView();
    new DetailsController(detailsView, model).renderView();
    new SearchController(searchView, model).renderView();

    model.startUpValuesToObservers();

    if(!hash)
        window.location.hash = 'home';
    else
        window.location.hash = hash;

    /*Promise.all([model.getDish(364), model.getDish(44)])
        .then(function(values) {

            for(const element of values) {
                model.addDishToMenu(element);
            }

            const homeView = new HomeView(container("home"), model);
            const subheadingView = new SubheadingView(container("subheading"), model);
            const overviewView = new OverviewView(container("overview"), model);
            const searchView = new SearchView(container("search"), model);
            const printoutView = new PrintOutView(container("print"), model);
            const sidebarView = new SidebarView(container("sidebar"), model);
            const detailsView = new DetailsView(container("details"), model);

            new HomeController(homeView, model).renderView();
            new SubheadingController(subheadingView, model).renderView();
            new OverviewController(overviewView, model).renderView();
            new PrintoutController(printoutView, model).renderView();
            new SidebarController(sidebarView, model).renderView();
            new DetailsController(detailsView, model).renderView();
            new SearchController(searchView, model, new DetailsController(detailsView, model)).renderView();

            if(!hash)
                window.location.hash = 'home';
            else
                window.location.hash = hash;
        })
        .catch(console.error);*/

};
