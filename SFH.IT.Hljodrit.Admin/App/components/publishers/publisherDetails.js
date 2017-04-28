import React from 'react';
import { connect } from 'react-redux';
import { getPublisherById } from '../../actions/organizationActions';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import { browserHistory} from 'react-router';
import Spinner from 'react-spinner';
import PublisherDetailsForm from './publisherDetailsForm';
import Table from '../common/table';
import PublisherLabels from './publisherLablels';
import PublisherAlbumsTableData from './publisherAlbumsTableData';

class PublisherDetails extends React.Component {
    componentWillMount() {
        this.props.getPublisherById(this.props.routeParams.publisherId,
            this.props.isFetchingList, this.props.hasStoppedFetchingList);
    }

    renderContent() {
        if (Object.keys(this.props.organization).length > 0 && !this.props.isFetching) {
            const publisher = this.props.organization;
            return (
                <div>
                    <h2>{publisher.fullName}</h2>
                    <PublisherDetailsForm name={publisher.fullName}
                                          ssn={publisher.ssn}
                                          city={publisher.city}
                                          address={publisher.address}
                                          zipCode={publisher.zipCode}
                                          mainContactName={publisher.mainContactName}
                                          mainContactEmail={publisher.mainContactEmail}
                                          mainContactPhone={publisher.mainContactPhoneNumber}/>
                    <h3>Label</h3>
                    <div className="row">
                        <Table tableData={PublisherLabels}
                               objects={publisher.labels}
                               refCallback={ref => { return ref; }}
                               isRemote={false}
                               pagination={false} />
                    </div>
                    <h3>Plötur</h3>
                    <div className="row">
                        <Table tableData={PublisherAlbumsTableData}
                               objects={publisher.albums}
                               onClickCallback={(row) => browserHistory.push(`/albums/${row.albumId}`)}
                               refCallback={ref => { return ref; }}
                               isRemote={false}
                               pagination={false} />
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <Spinner className={this.props.isFetching ? '' : 'hidden'} />
                { this.renderContent() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        organization: state.organization.selectedOrganization,
        isFetching: state.flow.isFetchingList
    }
}

export default connect(mapStateToProps, { getPublisherById, isFetchingList, hasStoppedFetchingList }) (PublisherDetails);