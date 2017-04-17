import React from 'react';
import { connect } from 'react-redux';
import { getPersonById, updatePersonById, getMediaAssociatedWithPerson, getAlbumsAssociatedWithPerson } from '../../actions/personActions';
import MusicianDetailsForm from './musicianDetailsForm';
import MusicianMediaTable from './musicianMediaTable';
import MusicianAlbumTable from './musicianAlbumTable';
import Spinner from 'react-spinner';

class MusicianDetails extends React.Component {
    componentWillMount() {
        const musicianId = this.props.routeParams.musicianId;
        this.props.getPersonById(musicianId);
        this.props.getMediaAssociatedWithPerson(musicianId);
        this.props.getAlbumsAssociatedWithPerson(musicianId);
    }
    renderData() {
        const { isFetchingPerson, isFetchingPersonMedia, isFetchingPersonAlbums } = this.props;
        return (
            <div className={!(!isFetchingPerson && !isFetchingPersonMedia && !isFetchingPersonAlbums) ? 'hidden' : 'col-xs-12'}>
                <h2>{this.props.musician.fullName}</h2>
                <MusicianDetailsForm 
                    musician={this.props.musician}
                    zipCodes={this.props.zipCodes}
                    countries={this.props.countries}
                    updateMusician={(musician) => this.props.updatePersonById(this.props.routeParams.musicianId, musician)} />
                <MusicianMediaTable 
                    musicianMedia={this.props.musicianMedia} />
                <MusicianAlbumTable
                    musicianAlbums={this.props.musicianAlbums} />
            </div>
        );
    }
    render() {
        const { isFetchingPerson, isFetchingPersonMedia, isFetchingPersonAlbums } = this.props;
        return (
            <div>
                <Spinner className={isFetchingPerson || isFetchingPersonMedia || isFetchingPersonAlbums ? '' : 'hidden'} />
                {this.renderData()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        musician: state.person.selectedPerson,
        musicianMedia: state.person.selectedPersonMedia,
        musicianAlbums: state.person.selectedPersonAlbums,
        zipCodes: state.common.zipCodes,
        countries: state.common.countries,
        isFetchingPerson: state.person.isFetchingPerson,
        isFetchingPersonMedia: state.person.isFetchingPersonMedia,
        isFetchingPersonAlbums: state.person.isFetchingPersonAlbums
    };
};

export default connect(mapStateToProps, { getPersonById, updatePersonById, getMediaAssociatedWithPerson, getAlbumsAssociatedWithPerson })(MusicianDetails);