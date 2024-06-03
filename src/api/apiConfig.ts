const apiUrl = 'https://api.reanmo-tweeter.de/api';

const apiConfig = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
};

export {
    apiUrl,
    apiConfig
}