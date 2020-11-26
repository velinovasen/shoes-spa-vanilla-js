
function init_loader() {

    navigate('home')

}

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
    .then(res => navigate('home'))
    .catch(e => {
        console.log('WRONG CREDENTIALS');
        return; 
    })
    
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

    authServices.registerUser(email, password)
    .then(res => {
        authServices.loginUser(email, password)
    .then(data => {
       navigate('home')
    })})
    
  
    //to FINISH
}


init_loader()