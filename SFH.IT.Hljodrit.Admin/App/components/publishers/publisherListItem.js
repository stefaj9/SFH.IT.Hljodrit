import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';

const PublisherListItem = ({publisher}) => {
    return (
        <div className={'list well row ' + publisher.fullName}
             onClick={() => browserHistory.push(`/publishers/${publisher.id}`)}>
            <div className="list-info col-md-6 col-xs-12">
                <div className="list-name">
                    <div className="title">Heiti:</div>
                    <div className="value">{publisher.fullName}</div>
                </div>
            </div>
        </div>


    );
};

PublisherListItem.propTypes = {
    publisher: PropTypes.object.isRequired
};

export default PublisherListItem;