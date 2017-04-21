import React, { PropTypes } from 'react';

const AsideFlag = ({ type, content, title }) => {
    return (
        <div className={`aside-flag aside-flag-${type}`}>
            <h4 className={title === undefined || title === '' ? 'hidden' : ''}>{title}</h4>
            <div>{content}</div>
        </div>
    );
};

AsideFlag.propTypes = {
    type: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    title: PropTypes.string
};

export default AsideFlag;