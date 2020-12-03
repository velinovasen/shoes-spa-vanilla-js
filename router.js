const routes = {
    'home': 'home-template',
    'register': 'register-template',
    'login': 'login-template',
    'create': 'new-offer-template',
    
    
}

const router = async (fullPath) => {
    console.log(fullPath)
    let templateData = {};
    if (Boolean(localStorage.getItem('auth'))) {
        const user = JSON.parse(localStorage.getItem('auth'))
        const shoes = await getOffers();
        templateData.isAuth = true;
        templateData.shoes = shoes;
        templateData.email = user['email'];                 // setting the correct navbar on every click
    } else {
        templateData.isAuth = false;
    }
    console.log(templateData)
    //navbar
    let head = document.getElementById('header-element');
    let navTemplate = Handlebars.compile(document.getElementById('navbar').innerHTML);

    head.innerHTML = navTemplate(templateData)

    //root
    let root = document.getElementById('root');

    let template = Handlebars.compile(document.getElementById(routes[fullPath]).innerHTML);

    root.innerHTML = template(templateData);
    
}

function navigate(path) {

    history.pushState({}, '', path)

    router(location.pathname.slice(1))
}

async function getOffers() {
        
    const response = await fetch('https://shoe-shelf-df245.firebaseio.com/.json') 

    const data = await response.json()
   
    console.log(data)

    return data;
}