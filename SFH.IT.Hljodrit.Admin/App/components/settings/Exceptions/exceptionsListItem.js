import React, {PropTypes} from 'react';

const ExceptionListItem = ({exception, onSelect}) => {
    return (
        <div className={'list well row ' + exception.Level}>
            <div className="list-info col-md-6 col-xs-12">
                <div className="list-name">
                    <div className="title">Level:</div>
                    <div className="value">{exception.Level}</div>
                </div>
                <div className="list-author">
                    <div className="title">Logged:</div>
                    <div className="value">{exception.Logged}</div>
                </div>
                <div className="list-author">
                    <div className="title">Machine name:</div>
                    <div className="value">{exception.MachineName}</div>
                </div>
                <div className="list-author">
                    <div className="title">Url:</div>
                    <div className="value">{exception.Url}</div>
                </div>
            </div>
            <hr className="visible-sm visible-xs list-divider" />
            <div className="list-actions col-md-6 col-xs-12">
                <div
                    className="list-action"
                    onClick={() => onSelect(exception)}>
                    <i className="fa fa-2x fa-info" />
                    <div>Nánar</div>
                </div>
            </div>
        </div>
    );
};

ExceptionListItem.propTypes = {
    exception: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default ExceptionListItem;