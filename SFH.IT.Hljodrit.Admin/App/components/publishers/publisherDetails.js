import React from 'react';
import { connect } from 'react-redux';
import { getPublisherById } from '../../actions/organizationActions';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import { getZipCodes } from '../../actions/commonActions';
import { browserHistory} from 'react-router';
import Spinner from 'react-spinner';
import PublisherDetailsForm from './publisherDetailsForm';
import Table from '../common/table';
import PublisherLabels from './publisherLablels';
import PublisherAlbumsTableData from './publisherAlbumsTableData';
import _ from 'lodash';

class PublisherDetails extends React.Component {
    componentWillMount() {
        this.props.getPublisherById(this.props.routeParams.publisherId,
            this.props.isFetchingList, this.props.hasStoppedFetchingList);

        this.props.getZipCodes();
    }

    componentWillReceiveProps(newProps) {
        if (Object.keys(newProps.organization).length > 0 ) {
            this.setState({
                selectedPublisher: Object.assign({}, newProps.organization)
            });
        }
    }
    

    constructor(props, context) {
        super(props, context);
        this.updatePublisherField = this.updatePublisherField.bind(this);
        this.state = {
            selectedPublisher: {},
            selectedPublisherHasChanged: false
        };
    }

    hasFetchedAll() {
        return !this.props.isFetchingZipCodes && !this.props.isFetchingPublisher;
    }

    updatePublisherField(field, newElement) {
        let updatedPublisher = _.cloneDeep(this.state.selectedPublisher);
        updatedPublisher[field]= newElement;
        this.setState({
            selectedPublisher: updatedPublisher,
            selectedPublisherHasChanged: true
        });
    }

    updateSelectedPublisher(e) {
        e.preventDefault();
        /*const path = `/api/publishers/${this.state.selectedPublisher.publisherId}`;
        this.props.update(this.state.selectedPublisher, path, 'Það tókst að uppfæra upplýsingar útgefandans', () => this.props.getPublisherById(this.props.params.publisherId));
        this.setState({
            selectedPublisherHasChanged: false
        })*/
        console.log('I would like to update');
    }

    renderContent() {
        if (Object.keys(this.state.selectedPublisher).length > 0 && this.hasFetchedAll()) {
            const publisher = this.state.selectedPublisher;
            return (
                <div>
                    <h2>{this.props.organization.fullName}</h2>
                    <PublisherDetailsForm name={publisher.fullName}
                                          ssn={publisher.ssn}
                                          zipCodes={this.props.zipCodes}
                                          address={publisher.address}
                                          zipCode={publisher.zipCode}
                                          mainContactName={publisher.mainContactName}
                                          mainContactEmail={publisher.mainContactEmail}
                                          mainContactPhone={publisher.mainContactPhoneNumber}
                                          updatePublisherField={this.updatePublisherField}
                                          selectedPublisherHasChanged={this.state.selectedPublisherHasChanged}
                                          updateSelectedPublisher={this.updateSelectedPublisher} />
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
                <Spinner className={this.hasFetchedAll() ? 'hidden' : ''} />
                { this.renderContent() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        organization: state.organization.selectedOrganization,
        isFetchingPublisher: state.flow.isFetchingList,
        zipCodes: state.common.zipCodes,
        isFetchingZipCodes: state.common.isFetchingZipCodes
    }
}

export default connect(mapStateToProps, { getPublisherById, isFetchingList, hasStoppedFetchingList, getZipCodes }) (PublisherDetails);