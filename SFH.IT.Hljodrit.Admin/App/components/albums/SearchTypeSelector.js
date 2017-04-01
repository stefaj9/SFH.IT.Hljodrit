import React from 'react';

const SearchTypeSelector = ({onSelect}) => {

    const changeHandler = (event) => {
        onSelect(event.target.value);
    }

    return (
        <select onChange={changeHandler} className="form-control">
            <option value="0">Plötuheiti</option>
            <option value="1">Aðalflytjandi</option>
            <option value="2">Útgáfuár</option>
        </select>
    );
}

export default SearchTypeSelector;
