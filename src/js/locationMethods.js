export const reverseGeocode = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    try {
        return await fetch(url).then((res) => res.json());
    } catch (error) {
        console.error('Fehler bei der Reverse-Geocoding-Anfrage:', error);
        throw error;
    }
};

// locationMethods.js

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            reject(new Error('User denied the request for Geolocation'));
                            break;
                        case error.POSITION_UNAVAILABLE:
                            reject(new Error('Location information is unavailable'));
                            break;
                        case error.TIMEOUT:
                            reject(new Error('The request to get user location timed out'));
                            break;
                        default:
                            reject(new Error('An unknown error occurred'));
                            break;
                    }
                }
            );
        }
    });
};
