import React from 'react';
import PropTypes from 'prop-types';

const PageSelector = ({ visible, change }) => {
    return (
        <div className={'page-selector-wrapper' + (visible ? '' : ' hidden')}>
            <select name="page-selector" id="page-selector" className="form-control" title="Veldu fjölda af færslum" onChange={(e) => { change(e.target.value) }}>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    );
}

PageSelector.propTypes = {
    visible: PropTypes.bool,
    change: PropTypes.func.isRequired
};

export default PageSelector;