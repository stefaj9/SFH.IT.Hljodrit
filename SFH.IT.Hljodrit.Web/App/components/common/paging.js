import React from 'react';
import PropTypes from 'prop-types';

const Paging = ({ visible, currentPage, maximumPage, changePage }) => {
    return (
        <div className={'pull-right paging' + (visible ? '' : ' hidden')}>
            <div className="page-title">{`Síða ${currentPage} af ${maximumPage}`}</div>
            <a href="#" className={currentPage === 1 ? 'disabled' : ''} onClick={() => changePage(currentPage - 1)}>Fyrri</a>..<a href="#" className={currentPage === maximumPage ? 'disabled' : ''} onClick={() => changePage(currentPage + 1)}>Næsta</a>
        </div>
    );
}

Paging.propTypes = {
    visible: PropTypes.bool,
    currentPage: PropTypes.number.isRequired,
    maximumPage: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired
};

export default Paging;