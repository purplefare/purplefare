import Repository, { baseUrl ,baseStoreURL, serializeQuery } from './Repository';

class StoreRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getStores(payload) {
        const endPoint = `stores?${serializeQuery(payload)}`;
        const reponse = await Repository.get(`${baseStoreURL}/${endPoint}`)
            .then((response) => {
                if (response.data.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getStoreBySlug(payload) {
        const reponse = await Repository.get(
            `${baseStoreURL}/stores?slug=${payload}`
        )
            .then((response) => {
                if (response.data.length > 0) {
                    return response.data[0];
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getStoreItemsByKeyword(payload) {
        const reponse = await Repository.get(
            `${baseStoreURL}/posts?title_contains=${payload}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getPostItemsByCategory(payload) {
        const reponse = await Repository.get(
            `${baseStoreURL}/posts?title_contains=${payload}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async fetchHomePage(){
        const reponse = await Repository.post(`${baseUrl}/fetch-homepage`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }

    async fetchHomePageMostBookedHotels(){
         const reponse = await Repository.post(`${baseUrl}/fetch-homepage-most-booked-hotels`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }

    async saveContactQuery(params){
        const reponse = await Repository.post(`${baseUrl}/save-contact-query`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }
}

export default new StoreRepository();
