const apiKey = `AIzaSyAqkQ6mW6rFLYQgS8QPc3slr6oRq4GOh8E`;
const databaseURL = 'https://shoe-shelf-df245.firebaseio.com/';

const authServices = {
    getUserData: () => {
        let userToken = JSON.parse(localStorage.getItem('auth')) || {isAuth: false};

        //to finish -> model the return data to fit better to our needs
        return userToken;
    },
}