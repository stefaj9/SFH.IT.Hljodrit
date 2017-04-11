import React from 'react';
import { connect } from 'react-redux';
import { update, isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import { getMainArtistsByCriteria } from '../../actions/mainArtistActions';
import { getPublishersByCriteria, getLabelsByPublisherId } from '../../actions/organizationActions';
import _ from 'lodash';
import Spinner from 'react-spinner';
import SelectPersonModal from '../project/selectPersonModal';
import AlbumDetailsFormbla from './AlbumDetailsFormbla';

class AlbumDetailsForm extends React.Component {

    componentWillMount() {
        this.props.getMainArtistsByCriteria(25, 1, '', this.props.isFetchingList, this.props.hasStoppedFetchingList);
        this.props.getPublishersByCriteria(25, 1, '', this.props.isFetchingList, this.props.hasStoppedFetchingList);
    }

    componentWillReceiveProps(newProps) {
        if(_.keys(newProps.album).length > 0 && !this.state.hasFetched) {
            this.validateAlbum(newProps.album);
            this.setState({
                selectedAlbum: {
                    albumId: newProps.album.albumId,
                    countryOfPublication: newProps.album.countryOfPublication,
                    countryOfProduction: newProps.album.countryOfProduction,
                    catalogueNumber: newProps.album.catalogueNumber,
                    label: newProps.album.label,
                    labelId: newProps.album.labelId,
                    publisherId: newProps.album.publisherId,
                    albumTitle: newProps.album.albumTitle,
                    mainArtistName: newProps.album.mainArtistName,
                    mainArtistId: newProps.album.mainArtistId,
                    publisher: newProps.album.publisher,
                    releaseDate: newProps.album.releaseDate
                },
                hasFetched: true
            });
            this.props.getLabelsByPublisherId(newProps.album.publisherId);
        }
    }


    constructor(props, context) {
        super(props, context);
        this.state = {
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
        return this.props.selectedOrganizationLabels.map((label, idx) => {
            return (
                <option key={idx}
                    value={label.labelId}>{label.labelName}
                </option>
            );
        });
    }

    populateCountryOptions() {
        return this.props.countries.map((country) => {
            return (
                <option key={country.numericIsoCode}
                    value={country.twoLetterCode}>{country.name}
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
        updatedAlbum.mainArtistId = newMainArtist.id;
        this.updateAlbumState(updatedAlbum);
    }

    updatePublisher(newPublisher) {
        let updatedAlbum = _.cloneDeep(this.state.selectedAlbum);
        updatedAlbum.publisherId = newPublisher.id;
        updatedAlbum.publisher = newPublisher.name;
        updatedAlbum.labelId = -1;
        updatedAlbum.label = '';
        this.updateAlbumState(updatedAlbum);
        this.props.getLabelsByPublisherId(newPublisher.id);
    }

    updateAlbumField(field, newElement) {
        let updatedAlbum = _.cloneDeep(this.state.selectedAlbum);
        updatedAlbum[field]= newElement;
        this.updateAlbumState(updatedAlbum);
    }

    updateAlbumState(updatedState) {
        this.setState({
            selectedAlbum: updatedState,
            selectedAlbumHasChanged: true
        });
    }
    updateSelectedAlbum(e) {
        e.preventDefault();
        const path = `/api/albums/${this.state.selectedAlbum.albumId}`;
        console.log(this.state.selectedAlbum);
        this.props.update(this.state.selectedAlbum, path, 'Það tókst að uppfæra upplýsingar plötunnar');
        this.setState({
            selectedAlbumHasChanged: false
        });
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
                    countryOptions={ this.populateCountryOptions.bind(this) }
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
                <SelectPersonModal
                     isOpen={this.state.isModalOpen}
                     fetch={this.state.currentFetchMethod}
                     beginFetch={this.props.isFetchingList}
                     stoppedFetch={this.props.hasStoppedFetchingList}
                     next={() => this.setState({isModalOpen: false})}
                     close={() => this.setState({isModalOpen: false})}
                     envelope={this.state.envelope}
                     update={(newElement) => this.state.currentUpdateFunction(newElement)}
                     steps={() => { return ( <h4>{ this.state.typeOfAction }</h4> ) } }
                />
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        mainArtistEnvelope: state.mainArtist.mainArtistEnvelope,
        organizationEnvelope: state.organization.organizationEnvelope,
        selectedOrganizationLabels: state.organization.selectedOrganizationLabels,
        countries: state.common.countries
    };
};

export default connect(mapStateToProps, { update, isFetchingList, hasStoppedFetchingList, getMainArtistsByCriteria, getPublishersByCriteria, getLabelsByPublisherId })(AlbumDetailsForm);
