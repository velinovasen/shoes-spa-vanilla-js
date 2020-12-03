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
        const data = await response.json()
        return data;
    },

    async loginUser(email, password) {

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({email, password})}
        )
        
        const user = await response.json()
        console.log(user)
        if (!user.error) {
            localStorage.setItem('auth', JSON.stringify(user))
            return user;
        }

    }
}


const shoeServices = {

    async createOffer(name, price, image, description, brand){ 

        const creatorId = JSON.parse(localStorage.getItem('auth')).localId;

        const response = await fetch(databaseURL + '.json', {
            method: "POST",
            body: JSON.stringify({
                name,
                price,
                image,
                description,
                brand,
                creatorId,
                clients: {emails: '[]'}
            })
        })
        const data = await response.json()
        console.log(data)
    },

    async getOffers() {
        
        const response = await fetch(databaseURL + '.json') 

        const data = await response.json()

        console.log(data)

        return data;
    },

    async buyShoes(id, buyer) {
        console.log(id, buyer);
        let shoe = await getShoeDetails(id);

        // finish the shoe buy, should be patch, just add the buyers email in the clients
        console.log(clients.includes(buyer));
    },



}