import React from 'react';
import { connect } from 'react-redux';
import { update, isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import { getMainArtistsByCriteria } from '../../actions/mainArtistActions';
import { getPublishersByCriteria, getLabelsByPublisherId } from '../../actions/organizationActions';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import Spinner from 'react-spinner';
import SelectPersonModal from '../project/selectPersonModal';
import AlbumDetailsForm from './AlbumDetailsForm';
import { getAlbumById, getSongsByAlbumId } from '../../actions/AlbumsActions';
import Table from '../common/table';
import albumTableData from './albumTableData';

class AlbumDetails extends React.Component {

    componentWillMount() {
        this.props.getMainArtistsByCriteria(25, 1, '', this.props.isFetchingList, this.props.hasStoppedFetchingList);
        this.props.getPublishersByCriteria(25, 1, '', this.props.isFetchingList, this.props.hasStoppedFetchingList);
        const albumId = this.props.params.albumId;
        this.props.getAlbumById(albumId);
        this.props.getSongsByAlbumId(albumId);
    }

    componentWillReceiveProps(newProps) {
        if(_.keys(newProps.selectedAlbum).length > 0 && !this.state.hasFetched && !newProps.isFetching) {
            this.validateAlbum(newProps.selectedAlbum);

            this.setState({
                selectedAlbum: {
                    albumId: newProps.selectedAlbum.albumId,
                    countryOfPublication: newProps.selectedAlbum.countryOfPublication,
                    countryOfProduction: newProps.selectedAlbum.countryOfProduction,
                    catalogueNumber: newProps.selectedAlbum.catalogueNumber,
                    label: newProps.selectedAlbum.label,
                    labelId: newProps.selectedAlbum.labelId,
                    publisherId: newProps.selectedAlbum.publisherId,
                    albumTitle: newProps.selectedAlbum.albumTitle,
                    mainArtistName: newProps.selectedAlbum.mainArtistName,
                    mainArtistId: newProps.selectedAlbum.mainArtistId,
                    publisher: newProps.selectedAlbum.publisher,
                    releaseDate: newProps.selectedAlbum.releaseDate
                },
                hasFetched: true
            });
            this.props.getLabelsByPublisherId(newProps.selectedAlbum.publisherId);
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
        this.props.update(this.state.selectedAlbum, path, 'Það tókst að uppfæra upplýsingar plötunnar', () => this.props.getAlbumById(this.props.params.albumId));
        this.setState({
            selectedAlbumHasChanged: false,
            hasFetched: false
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
        if (!this.props.isFetching && this.state.hasFetched) {
            return (
                <AlbumDetailsForm
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
                <Spinner className={(this.props.isFetching || this.props.songsOnSelectedAlbum.length === 0) ? '' : 'hidden'} />
                <div className={(this.props.songsOnSelectedAlbum.length === 0 || !this.state.hasFetched) ? 'hidden' : ''} >
                    <h2>{this.props.selectedAlbum.albumTitle}</h2>
                    { this.renderForm() }
                    <div>
                        <h2>Lög</h2>
                        <Table onClickCallback={(row) => browserHistory.push(`/albums/${row.albumId}/songs/${row.songId}`)} tableData={albumTableData} objects={this.props.songsOnSelectedAlbum} />
                    </div>
                    <SelectPersonModal
                         isOpen={this.state.isModalOpen}
                         fetch={this.state.currentFetchMethod}
                         beginFetch={() => this.props.isFetchingList() }
                         stoppedFetch={() => this.props.hasStoppedFetchingList() }
                         next={() => this.setState({isModalOpen: false})}
                         close={() => this.setState({isModalOpen: false})}
                         envelope={this.state.envelope}
                         update={(newElement) => this.state.currentUpdateFunction(newElement)}
                         steps={() => { return ( <h4>{ this.state.typeOfAction }</h4> ) } }
                    />
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        mainArtistEnvelope: state.mainArtist.mainArtistEnvelope,
        organizationEnvelope: state.organization.organizationEnvelope,
        selectedOrganizationLabels: state.organization.selectedOrganizationLabels,
        countries: state.common.countries,
        songsOnSelectedAlbum: state.albums.songsOnSelectedAlbum,
        selectedAlbum: state.albums.selectedAlbum,
        isFetching: state.albums.isFetching
    };
};

export default connect(mapStateToProps, { getAlbumById, update, isFetchingList, hasStoppedFetchingList, getMainArtistsByCriteria, getPublishersByCriteria, getLabelsByPublisherId, getSongsByAlbumId })(AlbumDetails);
