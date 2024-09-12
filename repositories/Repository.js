import axios from 'axios';
//const baseDomain = 'http://127.0.0.1:8000/api/v1'; // API 
const baseDomain = 'https://apitest.purplefare.com/api/v1'; // API 
export const baseStoreURL = 'https://test.purplefare.com'; 
export const mediaBaseURL = 'https://test.purplefare.com';
export const assetBaseURL = 'https://test.purplefare.com/assets';
export const mediaThumbProductImage = 'https://test.purplefare.com/assets/products-images/thumb-image';
export const mediaEnlargeProductImage = 'https://test.purplefare.com/assets/products-images/enlarge-image';
export const mediaBigProductImage = 'https://test.purplefare.com/assets/products-images/big-image';
export const mediaBigMultiAngleImage = 'https://test.purplefare.com/assets/products-others-images/big';
export const mediaEnlargeMultiAngleImage = 'https://test.purplefare.com/assets/products-others-images/enlarge';
export const customHeaders = {
    Accept: 'application/json'
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
