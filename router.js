const routes = {
    'home': 'home-template',
    'register': 'register-template',
    'login': 'login-template',
    'create': 'new-offer-template',
    'details': 'offer-details-template',
    'edit': 'edit-offer',
    
}

const router = async (fullPath) => {
    console.log(fullPath)
    let path = fullPath;
    let id;
    let templateData = {};
    let user;
    let shoes = {};
    if (Boolean(localStorage.getItem('auth'))) {
        user = JSON.parse(localStorage.getItem('auth'))
        try {
            shoes = await getOffers();
            Object.keys(shoes).forEach(key => shoes[key].key = key)   // pass the key as an attribute, so we can reach it in the html


            templateData.hasShoes = true;
        }   catch(e) {
            console.log(e);
        }
        templateData.isAuth = true;
        templateData.shoes = shoes;
        templateData.email = user['email'];                 // setting the correct navbar on every click
    } else {
        templateData.isAuth = false;
    }

    const sortedShoes = sortFunction(shoes, 'bought')   //testing
    templateData.shoes = sortedShoes;

    if (fullPath.split('/')) {
        [path, id] = fullPath.split('/')
        console.log(path, id);
        if (path === 'details') {

            const shoeDetails = await getShoeDetails(id);

            templateData = shoeDetails;
            templateData.id = id;
            templateData.owner = false;
            console.log(user.localId, id);
            if (user.localId == templateData.creatorId) {
                templateData.owner = true;
            }
            templateData.isBuyer = false;
            let clients = templateData.clients.emails;    // check if the user bought the shoes already
            let buyer = user.email;
            if (clients.includes(buyer)) {
                templateData.isBuyer = true;
            }
            
        } else if (path === 'edit') {

            const shoeDetails = await getShoeDetails(id);

            templateData = shoeDetails;
            templateData.id = id;
            
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

function sortFunction(data, attr) {
    var arr = [];
    for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
            var obj = {};
            obj[prop] = data[prop];
            obj.tempSortName = data[prop][attr];
            arr.push(obj);
        }
    }

    arr.sort(function(a, b) {
        var at = a.tempSortName,
            bt = b.tempSortName;
        return at < bt ? 1 : ( at > bt ? -1 : 0 );
    });

    var result = [];
    for (var i=0, l=arr.length; i<l; i++) {
        var obj = arr[i];
        delete obj.tempSortName;
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var id = prop;
            }
        }
        var item = obj[id];
        result.push(item);
    }
    return result;
}