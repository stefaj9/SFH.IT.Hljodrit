import React from 'react';

const ExceptionListItem = ({exception}) => {
    return (
        <div className="list well row">
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
        </div>
    );
};

export default ExceptionListItem;