export const reverseGeocode = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    try {
        return await fetch(url).then((res) => res.json());
    } catch (error) {
        console.error('Fehler bei der Reverse-Geocoding-Anfrage:', error);
        throw error;
    }
};