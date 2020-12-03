const routes = {
    'home': 'home-template',
    'register': 'register-template',
    'login': 'login-template',
    'create': 'new-offer-template',
    'details': 'offer-details-template',

    
}

const router = async (fullPath) => {
    console.log(fullPath)
    let path = fullPath;
    let id;
    let templateData = {};
    let user;
    if (Boolean(localStorage.getItem('auth'))) {
        user = JSON.parse(localStorage.getItem('auth'))
        const shoes = await getOffers();
        Object.keys(shoes).forEach(key => shoes[key].key = key)   // pass the key as an attribute, so we can reach it in the html
        templateData.isAuth = true;
        templateData.shoes = shoes;
        templateData.email = user['email'];                 // setting the correct navbar on every click
    } else {
        templateData.isAuth = false;
    }
    
    if (fullPath.split('/')) {
        [path, id] = fullPath.split('/')
        console.log(path, id);
        if (path === 'details') {

            const shoeDetails = await getShoeDetails(id);

            templateData = shoeDetails;
            templateData.id = id;
            templateData.owner = false;
            console.log(user.localId, id);
            if (user.localId == templateData.create) {
                templateData.owner = true;
            }
            
        }
    }

    console.log(templateData)
    //navbar
    let head = document.getElementById('header-element');
    let navTemplate = Handlebars.compile(document.getElementById('navbar').innerHTML);

    head.innerHTML = navTemplate(templateData)

    //root
    let root = document.getElementById('root');

    let template = Handlebars.compile(document.getElementById(routes[path]).innerHTML);

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

async function getShoeDetails(id) {
    
    const response = await fetch('https://shoe-shelf-df245.firebaseio.com/' + id + '.json')

    const data = await response.json()

    return data;
}