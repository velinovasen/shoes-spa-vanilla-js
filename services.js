const apiKey = `AIzaSyAqkQ6mW6rFLYQgS8QPc3slr6oRq4GOh8E`;
const databaseURL = 'https://shoe-shelf-df245.firebaseio.com/';

const authServices = {
    async registerUser(email, password) {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
    },

    async loginUser(email, password) {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        const user = await response.json();
        
        localStorage.setItem('auth', JSON.stringify(user))

        return user;
    }

}