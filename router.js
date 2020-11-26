const routes = {
    'home': 'home-template',
    'register': 'register-template',
    'login': 'login-template',
    
}

const router = async (fullPath) => {
    console.log(fullPath)
    let templateData = {};
    if (Boolean(localStorage.getItem('auth'))) {
        templateData.isAuth = true                          // setting the correct navbar on every click
    } else {
        templateData.isAuth = false
    }
    console.log(templateData)
    //navbar
    let head = document.getElementById('header-element');
    let navTemplate = Handlebars.compile(document.getElementById('navbar').innerHTML);

    head.innerHTML = navTemplate(templateData)

    //body
    let root = document.getElementById('root');

    let template = Handlebars.compile(document.getElementById(routes[fullPath]).innerHTML);

    root.innerHTML = template(templateData);
    
}

function navigate(path) {

    history.pushState({}, '', path)

    router(location.pathname.slice(1))
}