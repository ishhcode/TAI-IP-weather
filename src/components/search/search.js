import React from 'react';
import { AsyncPaginate } from "react-select-async-paginate";
import { API_URL, geoApiOptions } from "../../api";


const Search = ({onSearchChange}) => {
    const [search, setSearch] = React.useState(null);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    //inputValue is the value pass to the url to get the data.
    const loadOptions = (inputValue) => {
        return fetch(`${API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
            .then((response) => response.json())
            .then((response) => {
                return{
                    options: response.data.map((city)=>{
                        return{
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    }),
                };
            })
            .catch((err) => console.error(err));

    };

    return (
        <AsyncPaginate
            placeholder="search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
}

export default Search;