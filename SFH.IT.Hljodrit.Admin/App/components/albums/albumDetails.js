import React from 'react';
import { connect } from 'react-redux';
import { getAlbumById, getSongsByAlbumId } from '../../actions/AlbumsActions';
import AlbumDetailsForm from './AlbumDetailsForm';

class AlbumDetails extends React.Component {

    componentWillMount() {
        const albumId = this.props.routeParams.albumId;
        this.props.getAlbumById(albumId);
        this.props.getSongsByAlbumId(albumId);
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h2>{this.props.selectedAlbum.albumTitle}</h2>
                <AlbumDetailsForm
                    album={this.props.selectedAlbum}
                    songs={this.props.songsOnSelectedAlbum}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedAlbum: state.albums.selectedAlbum,
        songsOnSelectedAlbum: state.albums.songsOnSelectedAlbum,
        isFetching: state.albums.isFetching

    }
}

export default connect(mapStateToProps, { getAlbumById, getSongsByAlbumId })(AlbumDetails);
