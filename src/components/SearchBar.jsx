import React, { useState, useCallback } from 'react';
import { Searchbar, List, ListItem } from 'framework7-react';

const NominatimBaseUrl = 'https://nominatim.openstreetmap.org/search?format=json&q=';

/**
 * SearchBar component for location search using Nominatim API.
 * @param {string} placeholder - Placeholder text for the search bar.
 * @param {function} onSelectLocation - Function to handle location selection.
 */
const SearchBar = ({ placeholder, onSelectLocation }) => {
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = useCallback(async (query) => {
        if (query.length === 0) {
            setSuggestions([]);
            return;
        }

        const response = await fetch(`${NominatimBaseUrl}${query}`);
        const data = await response.json();
        setSuggestions(data);
    }, []);

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
