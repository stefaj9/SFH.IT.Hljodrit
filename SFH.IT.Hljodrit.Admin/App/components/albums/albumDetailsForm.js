import React from 'react';
import { connect } from 'react-redux';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import { getMainArtistsByCriteria } from '../../actions/mainArtistActions';
import { getPublishersByCriteria, getLabelsByPublisherId } from '../../actions/organizationActions';
import SelectPersonModal from '../project/selectPersonModal';
import _ from 'lodash';
import Spinner from 'react-spinner';
import AlbumDetailsFormbla from './AlbumDetailsFormbla';
class AlbumDetailsForm extends React.Component {

    componentWillReceiveProps(newProps) {
        if(_.keys(newProps.album).length > 0 && !this.state.hasFetched) {
            this.validateAlbum(newProps.album);
            this.setState({
                selectedAlbum: {
                    countryOfPublication: newProps.album.countryOfPublication,
                    countryOfProduction: newProps.album.countryOfProduction,
                    label: newProps.album.label,
                    publisherId: newProps.album.publisherId,
                    albumTitle: newProps.album.albumTitle,
                    mainArtistName: newProps.album.mainArtistName,
                    publisher: newProps.album.publisher
                },
                hasFetched: true
            });
            this.props.getLabelsByPublisherId(newProps.album.publisherId);
        }
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedAlbum: {
                mainArtistName: '',
                publisher: '',
                countryOfPublication: '',
                countryOfProduction: '',
                label: '',
                albumTitle: ''
            },
            hasFetched: false,
            isModalOpen: false,
            selectedAlbumHasChanged: false,
            currentFetchMethod: props.getMainArtistsByCriteria,
            envelope: props.mainArtistEnvelope,
            typeOfAction: '',
            currentUpdateFunction: null
        }
    }

    populateLabelOptions() {
        if (this.props.selectedOrganizationLabels.length === 0) {
            return (
                <option key={-1}
                    value="Ekki skráð"> Ekki skráð
                </option>
            );
        }
        return this.props.selectedOrganizationLabels.map((label, idx) => {
            return (
                <option key={idx}
                    value={label.labelName}>{label.labelName}
                </option>
            );
        });
    }

    openModal(fetchMethod, env, actiontype, updateFunction) {
        this.setState({
            isModalOpen: true,
            currentFetchMethod: fetchMethod,
            envelope: env,
            typeOfAction: actiontype,
            currentUpdateFunction: updateFunction
        });
    }

    updateMainArtist(newMainArtist) {
        let updatedAlbum = _.cloneDeep(this.state.selectedAlbum);
        updatedAlbum.mainArtistName = newMainArtist.name;
        this.setState({
            selectedAlbum: updatedAlbum,
            selectedAlbumHasChanged: true
        });
    }

    updatePublisher(newPublisher) {
        let updatedAlbum = _.cloneDeep(this.state.selectedAlbum);
        updatedAlbum.publisherId = newPublisher.id;
        updatedAlbum.publisher = newPublisher.name;
        updatedAlbum.label = '';
        this.setState({
            selectedAlbum: updatedAlbum,
            selectedAlbumHasChanged: true
        });
        this.props.getLabelsByPublisherId(newPublisher.id);
    }

    updateAlbumField(field, newElement) {
        let updatedAlbum = _.cloneDeep(this.state.selectedAlbum);
        updatedAlbum[field]= newElement;
        this.setState({
            selectedAlbum: updatedAlbum,
            selectedAlbumHasChanged: true
        });
    }

    updateSelectedAlbum(e) {
        e.preventDefault();
        //post updated album
        console.log(this.state.selectedAlbum);
    }

    validateAlbum(album) {
        let invalid = 'Ekki skráð'
        for (var key in album) {
            if (album[key] === null || album[key] === undefined) {
                album[key] = invalid;

            }
        }
        album.publisherId = (album.publisherId === invalid) ? -1 : album.publisherId;
    }

    renderForm() {
        if (this.state.hasFetched) {
            return (
                <AlbumDetailsFormbla
                    hasFetched={ this.state.hasFetched }
                    album={ this.state.selectedAlbum }
                    updateAlbumField={ this.updateAlbumField.bind(this) }
                    openModal={ this.openModal.bind(this) }
                    getMainArtistsByCriteria={ this.props.getMainArtistsByCriteria.bind(this) }
                    mainArtistEnvelope={ this.props.mainArtistEnvelope }
                    updateMainArtist={ this.updateMainArtist.bind(this) }
                    getPublishersByCriteria={ this.props.getPublishersByCriteria.bind(this) }
                    organizationEnvelope={ this.props.organizationEnvelope }
                    updatePublisher={ this.updatePublisher.bind(this) }
                    populateLabelOptions={ this.populateLabelOptions.bind(this) }
                    countryOptions={ this.props.countryOptions.bind(this) }
                    updateSelectedAlbum={ this.updateSelectedAlbum.bind(this) }
                    selectedAlbumHasChanged={ this.state.selectedAlbumHasChanged }
                />
            );
        }
    }

    render() {
        return (
            <div>
                <Spinner className={!this.state.hasFetched ? '' : 'hidden'} />
                { this.renderForm() }
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        mainArtistEnvelope: state.mainArtist.mainArtistEnvelope,
        organizationEnvelope: state.organization.organizationEnvelope,
        selectedOrganizationLabels: state.organization.selectedOrganizationLabels
    };
};

export default connect(mapStateToProps, { isFetchingList, hasStoppedFetchingList, getMainArtistsByCriteria, getPublishersByCriteria, getLabelsByPublisherId })(AlbumDetailsForm);
