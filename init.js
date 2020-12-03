const regex = {
    imageUrl: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
}

const DOMSelectors = {
    nameInput: () => document.getElementById('nameInput'),
    priceInput: () => document.getElementById('priceInput'),
    imageInput: () => document.getElementById('imageInput'),
    descriptionInput: () => document.getElementById('descriptionInput'),
    brandInput: () => document.getElementById('brandInput'),

}


function init_loader() {

    navigate('home')

}
// OFFERS BUTTONS

function createButton(event) {
    event.preventDefault()

    const name = DOMSelectors.nameInput().value;
    const price = DOMSelectors.priceInput().value;
    const image = DOMSelectors.imageInput().value;
    const description = DOMSelectors.descriptionInput().value;
    const brand = DOMSelectors.brandInput().value;

    const validator = correctInputChecker(name, price, image, description, brand);
    
    if (!validator) {
        return;
    }

    shoeServices.createOffer(name, price, image, description, brand)

    DOMSelectors.nameInput().value = '';
    DOMSelectors.priceInput().value = '';
    DOMSelectors.imageInput().value = '';
    DOMSelectors.descriptionInput().value = '';
    DOMSelectors.brandInput().value = '';

    console.log(name, price, image, description, brand)

    setTimeout(function() {navigate('home')}, 700)

}


// LOGIN AND REGISTER BUTTONS

function onRegisterButton(event) {      // register button click, redirect to register template
    event.preventDefault()

    console.log(event.target.href)

    navigate(event.target.href)
}

function loginNowButton(event) {
    event.preventDefault()

    console.log(event.target.href)

    navigate(event.target.href)
}

function loginSubmitButton(event) {
    event.preventDefault()

    let email = document.getElementById('email-login-input').value;
    let password = document.getElementById('password-login-input').value;

    authServices.loginUser(email, password)
    setTimeout(function() {navigate('home')}, 700)
    
    
}

function registerSubmitButton(event) {
    event.preventDefault()

    let email = document.getElementById('email-register-input').value;
    let password = document.getElementById('password-register-input').value;
    let password2 = document.getElementById('password2-register-input').value;
    
    if (!email || !password || !password2) {
        return;
    }
    if (password.length < 6 || password !== password2) {
        return;
    }

    const data = authServices.registerUser(email, password)
    
    console.log(data);
    
  
    //to FINISH
}

// NAVBAR BUTTONS 

function createNewOffer(event) {
    event.preventDefault()

    navigate(event.target.href)
}

function homeButton(event) {
    event.preventDefault()

    navigate(event.target.parentElement.href)

}

function logoutButton(event) {
    event.preventDefault()

    localStorage.removeItem('auth')
    setTimeout(function(){navigate('home')}, 700)
}

init_loader()

window.addEventListener('popstate', (e) => {
    router(location.pathname.slice(1))  
})

// extra functions

function correctInputChecker(name, price, image, description, brand){

    let isOk = true;            // NEW OFFER VALIDATIONS

    if (!/[A-z]+$/.test(name)) {
        isOk = false;
        return isOk;
    }
    if (!/(^\d+\.\d+$|^\d+$)/.test(price)) {
        isOk = false;
        return isOk;
    }
    if (!regex.imageUrl.test(image)) {
        isOk = false;
        return isOk;
    }
    if (!/.+/.test(description)) {
        isOk = false;
        return isOk;
    }
    if (!/([A-z0-9])\w+/.test(brand)) {
        isOk = false;
        return isOk;
    }
    return isOk;

}