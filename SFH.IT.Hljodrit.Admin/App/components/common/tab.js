import React, {PropTypes} from 'react';

const Tab = ({data, isActive, handleClick}) => {
    return (
        <li onClick={handleClick} className={isActive ? 'active' : null}>
            <a href="#">{data.name}</a>
        </li>
    );
};

Tab.propTypes = {
    data: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default Tab;

