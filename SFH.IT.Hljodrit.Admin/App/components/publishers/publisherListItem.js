import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';

const PublisherListItem = ({publisher}) => {
    return (
        <div className={'list well row ' + publisher.fullName}
             onClick={() => browserHistory.push(`/app/publishers/${publisher.id}`)}>
            <div className="list-info col-md-6 col-xs-12">
                <div className="list-name">
                    <div className="title">Nafn:</div>
                    <div className="value">{publisher.fullName}</div>
                </div>
                <div className="list-author">
                    <div className="title">Tengiliður:</div>
                    <div className="value">{publisher.mainContactName}</div>
                </div>
                <div className="list-author">
                    <div className="title">Netfang:</div>
                    <div className="value">{publisher.mainContactEmail}</div>
                </div>
                <div className="list-author">
                    <div className="title">Heimilisfang:</div>
                    <div className="value">{publisher.address}</div>
                </div>
            </div>
        </div>


    );
};

PublisherListItem.propTypes = {
    publisher: PropTypes.object.isRequired
};

export default PublisherListItem;