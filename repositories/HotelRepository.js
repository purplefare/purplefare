import Repository, { baseUrl } from './Repository';

class HotelRepository {

    async searchKeyword(params){
        const reponse = await Repository.post(`${baseUrl}/search-keyword`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }


    async searchHotel(params) {
        const reponse = await Repository.post(`${baseUrl}/search-hotels`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;     
    }


    async searchHotelsFilters(params) {
        const reponse = await Repository.post(`${baseUrl}/fetch-hotel-filters`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;     
    }

    async fetchHotelBedsRooms(params){
        const reponse = await Repository.post(`${baseUrl}/fetch-hotelbeds-rooms`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }

    async fetchHotelBedsReviewsRatings(params){
        const reponse = await Repository.post(`${baseUrl}/fetch-hotelbeds-reviews-ratings`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }

    async applyFilters(params){
        const reponse = await Repository.post(`${baseUrl}/search-hotels`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }

    async saveBooking(params){
        const reponse = await Repository.post(`${baseUrl}/save-hotel-booking`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }

    async updateBooking(params){
        const reponse = await Repository.post(`${baseUrl}/update-hotel-booking`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }

    async recheckBookingRates(params){
        const reponse = await Repository.post(`${baseUrl}/check-rooms-availability`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }

    async fetchBookingForReview(params){
        const reponse = await Repository.post(`${baseUrl}/fetch-hotel-booking-for-review`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }

    async fetchBooking(params){
        const reponse = await Repository.post(`${baseUrl}/fetch-hotel-booking`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }

    async fetchMyBookings(params){
        const reponse = await Repository.post(`${baseUrl}/fetch-my-bookings`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }

    async downloadVoucher(params){
        const reponse = await Repository.post(`${baseUrl}/download-bookings-voucher`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }
}

export default new HotelRepository();
