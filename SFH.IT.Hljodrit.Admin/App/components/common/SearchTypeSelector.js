import React, {PropTypes} from 'react';

const SearchTypeSelector = ({onSelect, searchOptions}) => {

    const changeHandler = (event) => {
        onSelect(event.target.value);
    };

    const renderOptions = () => {
        return Object.keys(searchOptions).map((key, index) => {
            return (
                <option key={index} value={key}>{searchOptions[key]}</option>
            );
        });
    };

    return (
        <select onChange={changeHandler} className="form-control no-border-radius">
            {renderOptions()}
        </select>
    );
};

SearchTypeSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    searchOptions: PropTypes.object.isRequired
};

export default SearchTypeSelector;
