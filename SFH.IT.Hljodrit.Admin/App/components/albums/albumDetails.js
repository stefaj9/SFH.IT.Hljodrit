import React from 'react';
import { connect } from 'react-redux';
import { getAlbumById, getSongsByAlbumId } from '../../actions/AlbumsActions';
import AlbumDetailsForm from './AlbumDetailsForm';

class AlbumDetails extends React.Component {

    componentWillMount() {
        const albumId = this.props.params.albumId;
        this.props.getAlbumById(albumId);
        this.props.getSongsByAlbumId(albumId);
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            hasFetchedLabels: false
        };
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

    render() {
        return (
            <div>
                <h2>{this.props.selectedAlbum.albumTitle}</h2>
                <AlbumDetailsForm
                    album={this.props.selectedAlbum}
                    songs={this.props.songsOnSelectedAlbum}
                    countryOptions={this.populateCountryOptions.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedAlbum: state.albums.selectedAlbum,
        songsOnSelectedAlbum: state.albums.songsOnSelectedAlbum,
        countries: state.common.countries,
        isFetching: state.albums.isFetching
    };
};

export default connect(mapStateToProps, { getAlbumById, getSongsByAlbumId })(AlbumDetails);
