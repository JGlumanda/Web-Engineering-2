export const fetchWikipediaInfo = async (city) => {
    const url = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&exsentences=10&titles=${encodeURIComponent(city)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const page = data.query.pages[Object.keys(data.query.pages)[0]];
        if (page.extract) {
            return page.extract;
        } else {
            return 'No information found on Wikipedia.';
        }
    } catch (error) {
        console.error('Error fetching Wikipedia info:', error);
        return 'Error fetching Wikipedia info.';
    }
};

export const mapAddressComponents = (addressComponents) => {
    const address = {};
    if (addressComponents.house_number) {
        address.streetNumber = addressComponents.house_number;
    }
    if (addressComponents.road || addressComponents.premise) {
        address.street = addressComponents.road || addressComponents.premise;
    }
    if (addressComponents.village || addressComponents.town || addressComponents.city) {
        address.city = addressComponents.village || addressComponents.town || addressComponents.city;
    }
    if (addressComponents.country) {
        address.country = addressComponents.country;
    }
    return address;
};
