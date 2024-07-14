import React, { useState} from 'react';
import { Searchbar, List, ListItem } from 'framework7-react';

const NominatimBaseUrl = 'https://nominatim.openstreetmap.org/search?format=json&q=';

const SearchBar = ({ placeholder, onSelectLocation}) => {
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (query) => {
        if (query.length === 0) {
            setSuggestions([]);
            return;
        }

        const response = await fetch(`${NominatimBaseUrl}${query}`);
        const data = await response.json();
        setSuggestions(data);
    };

    const handleSelect = (suggestion) => {
        setSuggestions([]);
        onSelectLocation([suggestion.lat, suggestion.lon]);
    };

    const handleSearch = async (searchbar, query) => {
        await fetchSuggestions(query);
    };

    return (
        <div>
            <Searchbar
                placeholder={placeholder}
                clearButton
                customSearch
                onSearchbarSearch={handleSearch}
            />
            {suggestions.length > 0 && (
                <List>
                    {suggestions.map((suggestion) => (
                        <ListItem
                            key={suggestion.place_id}
                            title={suggestion.display_name}
                            onClick={() => handleSelect(suggestion)}
                        />
                    ))}
                </List>
            )}
        </div>
    );
};

export default SearchBar;
