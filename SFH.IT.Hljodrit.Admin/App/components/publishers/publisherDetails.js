import React from 'react';
import { connect } from 'react-redux';
import { getPublisherById,
    getLabelsByPublisherId,
    addLabelToOrganizationById,
    getPublisherIsrcSeriesById,
    addIsrcSeriesToOrganizationById } from '../../actions/organizationActions';
import { isFetchingList, hasStoppedFetchingList, update } from '../../actions/flowActions';
import { getZipCodes } from '../../actions/commonActions';
import { browserHistory} from 'react-router';
import Spinner from 'react-spinner';
import PublisherDetailsForm from './publisherDetailsForm';
import Table from '../common/table';
import PublisherLabels from './publisherLablels';
import PublisherIsrcTableData from './publisherIsrcTableData';
import PublisherAlbumsTableData from './publisherAlbumsTableData';
import InputWithButton from '../common/inputWithButton';
import _ from 'lodash';

class PublisherDetails extends React.Component {
    componentWillMount() {
        this.props.getPublisherById(this.props.routeParams.publisherId,
            this.props.isFetchingList, this.props.hasStoppedFetchingList);

        this.props.getLabelsByPublisherId(this.props.routeParams.publisherId);

        this.props.getZipCodes();

        this.props.getPublisherIsrcSeriesById(this.props.routeParams.publisherId);
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
            newLabelName: '',
            newIsrcRegistrant: ''
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

    alphanumeric(inputtxt) {
        console.log(inputtxt);
        let letterNumber = /^[0-9a-zA-Z]+$/;

        return inputtxt.match(letterNumber);
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

    addIsrcSeries() {
        let isrc = this.state.newIsrcRegistrant.trim().toUpperCase();

        if (isrc.length !== 3 || !this.alphanumeric(isrc)) {
            this.setState({ newIsrcRegistrant: '' });
            return;
        }

        let organizationId = this.props.params.publisherId;

        this.props.addIsrcSeriesToOrganizationById(organizationId, {
            organizationId: this.props.params.publisherId,
            isrcOrganizationPart: isrc
        });

        this.setState({ newIsrcRegistrant: '' });
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
                    <InputWithButton placeHolder={`${this.state.selectedPublisher.fullName} [label]`}
                                     inputValue={this.state.newLabelName}
                                     onChange={(e) => this.setState({ newLabelName: e.target.value })}
                                     submit={() => this.addLabel()}
                                     isSubmitting={this.props.isCreatingLabel}
                                     buttonText="Bæta við label" />
                    <h3>ISRC</h3>
                    <div className="row">
                        <Table tableData={PublisherIsrcTableData}
                               objects={this.props.organizationIsrcSeries}
                               refCallback={ref => { return ref; }}
                               isRemote={false}
                               pagination={false} />
                    </div>
                    <InputWithButton placeHolder="Þriggja stafa runa t.d. [RA1]"
                                     inputValue={this.state.newIsrcRegistrant}
                                     onChange={(e) => this.setState({ newIsrcRegistrant: e.target.value })}
                                     submit={() => this.addIsrcSeries()}
                                     isSubmitting={this.props.isCreatingIsrc}
                                     buttonText="Bæta við ISRC seríu" />
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
        isCreatingIsrc: state.organization.isCreatingIsrc,
        organizationIsrcSeries: state.organization.selectedOrganizationIsrcSeries,
        isFetchingPublisher: state.flow.isFetchingList,
        isUpdatingPublisher: state.flow.isUpdatingData,
        zipCodes: state.common.zipCodes,
        isFetchingZipCodes: state.common.isFetchingZipCodes,
        selectedOrganizationLabels: state.organization.selectedOrganizationLabels
    }
}

export default connect(mapStateToProps, {
    getPublisherById,
    isFetchingList,
    hasStoppedFetchingList,
    getZipCodes,
    update,
    getLabelsByPublisherId,
    addLabelToOrganizationById,
    getPublisherIsrcSeriesById,
    addIsrcSeriesToOrganizationById
}) (PublisherDetails);