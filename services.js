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
        await this.loginUser(email, password)
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
                clients: {emails: '[]'},
                bought: 0
            })
        })
        const data = await response.json()
    },

    async getOffers() {
        
        const response = await fetch(databaseURL + '.json') 

        const data = await response.json()

        return data;
    },

    async buyShoes(id, buyer) {
        let shoe = await getShoeDetails(id);
        let clients = shoe.clients.emails;
        let bought = Number(shoe.bought) + 1;
        console.log(typeof bought);
        clients = clients.slice(0, -1)
        // finish the shoe buy, should be patch, just add the buyers email in the clients
        clients += buyer + ", ]";
        console.log(clients);
        
        const response = await fetch(databaseURL + id + '.json', {
            method: "PATCH",
            body: JSON.stringify({
                'clients': {'emails': clients},
                'bought': bought
            })
        })

    },

    async editShoeFetch(id, shoe) {
        const response = await fetch(databaseURL + id + '.json', {
            method: "PATCH",
            body: JSON.stringify(shoe)
        })
        
       
    },

    async deleteShoeFetch(id) {
        const response = await fetch(databaseURL + id + '.json', {
            method: "DELETE"
        })
    }



}