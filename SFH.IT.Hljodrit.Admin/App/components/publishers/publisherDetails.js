import React from 'react';
import { connect } from 'react-redux';
import { getPublisherById, getLabelsByPublisherId, addLabelToOrganizationById } from '../../actions/organizationActions';
import { isFetchingList, hasStoppedFetchingList, update } from '../../actions/flowActions';
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

        this.props.getLabelsByPublisherId(this.props.routeParams.publisherId);

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

        this.state = {
            selectedPublisher: {},
            selectedPublisherHasChanged: false,
            zipCode: '',
            newLabelName: ''
        };

        this.updatePublisherField = this.updatePublisherField.bind(this);
        this.updateSelectedPublisher = this.updateSelectedPublisher.bind(this);
        this.updateZipAndCityFields = this.updateZipAndCityFields.bind(this);
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

    updateZipAndCityFields(newZip, newCity) {
        let updatedPublisher = _.cloneDeep(this.state.selectedPublisher);
        updatedPublisher['zipCode']= newZip;
        updatedPublisher['city']= newCity;
        this.setState({
            selectedPublisher: updatedPublisher,
            selectedPublisherHasChanged: true
        });
    }

    updateSelectedPublisher(e) {
        e.preventDefault();
        const path = `/api/organizations/${this.state.selectedPublisher.id}`;
        this.props.update(this.state.selectedPublisher, path,
            'Það tókst að uppfæra upplýsingar útgefandans',
            () => this.props.getPublisherById(this.props.params.publisherId, this.props.isFetchingList, this.props.hasStoppedFetchingList));

        this.setState({
            selectedPublisherHasChanged: false
        });
    }

    addLabel() {
        let labelName = this.state.newLabelName;
        if (labelName.length === 0) {
            return;
        }

        let organizationId = this.props.params.publisherId;

        this.props.addLabelToOrganizationById(organizationId, {
            organizationId: organizationId,
            labelName: labelName
        });

        this.setState({ newLabelName: '' });
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
                                          updateSelectedPublisher={this.updateSelectedPublisher}
                                          updateZipAndCity={this.updateZipAndCityFields} />
                    <h3>Label</h3>
                    <div className="row">
                        <Table tableData={PublisherLabels}
                               objects={this.props.selectedOrganizationLabels}
                               refCallback={ref => { return ref; }}
                               isRemote={false}
                               pagination={false} />
                    </div>
                    <div className="input-group no-border-radius spacer">
                        <input placeholder={`${this.state.selectedPublisher.fullName} [label]`}
                               type="text"
                               value={this.state.newLabelName}
                               onChange={(e) => this.setState({ newLabelName: e.target.value })}
                               className="form-control" />
                        <span onClick={() => this.addLabel()}
                              className={'input-group-addon' + (this.state.newLabelName.length > 0 ? ' background-primary hover-cursor' : '')}>
                            <span className={this.props.isCreatingLabel ? 'visibility-hidden' : ''}>
                                <i className="fa fa-fw fa-plus" />
                                Bæta við label
                            </span>
                            <Spinner className={this.props.isCreatingLabel ? 'spinner-small' : 'hidden'} />
                        </span>
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
        isCreatingLabel: state.organization.isCreatingLabel,
        isFetchingPublisher: state.flow.isFetchingList,
        isUpdatingPublisher: state.flow.isUpdatingData,
        zipCodes: state.common.zipCodes,
        isFetchingZipCodes: state.common.isFetchingZipCodes,
        selectedOrganizationLabels: state.organization.selectedOrganizationLabels
    }
}

export default connect(mapStateToProps, { getPublisherById, isFetchingList, hasStoppedFetchingList, getZipCodes, update, getLabelsByPublisherId, addLabelToOrganizationById }) (PublisherDetails);