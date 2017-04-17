import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getPersonById, updatePersonById, getMediaAssociatedWithPerson, getAlbumsAssociatedWithPerson, deletePersonById } from '../../actions/personActions';
import MusicianDetailsForm from './musicianDetailsForm';
import MusicianMediaTable from './musicianMediaTable';
import MusicianAlbumTable from './musicianAlbumTable';
import PromptModal from '../common/promptModal';
import Spinner from 'react-spinner';

class MusicianDetails extends React.Component {
    componentWillMount() {
        const musicianId = this.props.routeParams.musicianId;
        this.props.getPersonById(musicianId);
        this.props.getMediaAssociatedWithPerson(musicianId);
        this.props.getAlbumsAssociatedWithPerson(musicianId);
    }
    constructor() {
        super();
        this.state = {
            promptModalOpen: false
        };
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
                <div className="spacer"></div>
                <div className="row">
                    <div className="col-xs-12 text-right">
                        <button className="btn btn-default btn-lg btn-primary" onClick={() => this.setState({ promptModalOpen: true })}>Eyða flytjanda</button>
                    </div>
                </div>
                <PromptModal
                    isOpen={this.state.promptModalOpen}
                    title="Eyða flytjanda"
                    content={`Ertu viss um að þú viljir eyða ${this.props.musician.fullName}?`}
                    confirmBtnText="Staðfesta"
                    confirmBtnCallback={() => { this.setState({ promptModalOpen: false }); this.props.deletePersonById(this.props.routeParams.musicianId); }}
                    discardBtnText="Hætta við"
                    discardBtnCallback={() => this.setState({ promptModalOpen: false })} />
            </div>
        );
    }
    containsValidMusician() {
        if (this.props.musician !== null) {
            const { isFetchingPerson, isFetchingPersonMedia, isFetchingPersonAlbums } = this.props;
            return (
                <div>
                    <Spinner className={isFetchingPerson || isFetchingPersonMedia || isFetchingPersonAlbums ? '' : 'hidden'} />
                    {this.renderData()}
                </div>
            );
        }
    }
    doesNotContainValidMusician() {
        if (this.props.musician === null) {
            return (
                <div>
                    <h3>Flytjandi með þessar upplýsingar er ekki til eða hefur verið eytt.</h3>
                    <div className="row text-right">
                        <button 
                            className="btn btn-default btn-primary"
                            onClick={() => browserHistory.push('/musicians')}>Til baka</button>
                    </div>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                {this.containsValidMusician()}
                {this.doesNotContainValidMusician()}
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

export default connect(mapStateToProps, { getPersonById, updatePersonById, getMediaAssociatedWithPerson, getAlbumsAssociatedWithPerson, deletePersonById })(MusicianDetails);