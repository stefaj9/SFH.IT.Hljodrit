import React from 'react';
import { connect } from 'react-redux';
import { getAlbumById, getSongsByAlbumId } from '../../actions/AlbumsActions';
import AlbumDetailsForm from './AlbumDetailsForm';
import Table from '../common/table';
import albumTableData from './albumTableData';
import Spinner from 'react-spinner';

class AlbumDetails extends React.Component {

    componentWillMount() {
        const albumId = this.props.routeParams.albumId;
        this.props.getAlbumById(albumId);
        this.props.getSongsByAlbumId(albumId);
    }

    constructor(props, context) {
        super(props, context);
    }

    renderContent() {
        if (!this.props.isFetching) {
            return (
                <div>
                    <h2>{this.props.selectedAlbum.albumTitle}</h2>
                    <AlbumDetailsForm
                        album={this.props.selectedAlbum}
                        songs={this.props.songsOnSelectedAlbum}
                         />
                    <div>
                        <h2>Lög</h2>
                        <Table tableData={albumTableData} objects={this.props.songsOnSelectedAlbum} />
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
        selectedAlbum: state.albums.selectedAlbum,
        songsOnSelectedAlbum: state.albums.songsOnSelectedAlbum,
        isFetching: state.albums.isFetching
    };
};

export default connect(mapStateToProps, { getAlbumById, getSongsByAlbumId })(AlbumDetails);
