import React from 'react';
import { connect } from 'react-redux';
import { updateAlbumBasicInfo, updateAlbumSongs, updateAlbumPerformers, updateAlbumProducers, createAlbum } from '../../../actions/albumsActions';
import { browserHistory } from 'react-router';
import AlbumBasicInfo from './albumBasicInfo';
import AddSong from './addSong';
import AddPerformers from './addPerformers';
import AddPublisher from './addPublisher';
import AlbumOverview from './albumOverview';
import _ from 'lodash';
import Spinner from 'react-spinner';

class AddAlbum extends React.Component {
    constructor() {
        super();
        this.state = {
            steps: [
                { name: 'Skrá plötuheiti', class: 'fa fa-pencil' },
                { name: 'Skrá útgefanda', class: 'fa fa-user' },
                { name: 'Skrá lög', class: 'fa fa-music' },
                { name: 'Skrá flytjendur', class: 'fa fa-microphone' },
                { name: 'Staðfesting', class: 'fa fa-check' }
            ],
            currentStep: 1
        };
    }
    increaseStep() {
        this.setState({
            currentStep: this.state.currentStep + 1
        });
    }
    decreaseStep() {
        this.setState({
            currentStep: this.state.currentStep - 1
        });
    }
    exitWizard() {
        this.setState({
            currentStep: 1
        });
        browserHistory.push('/albums');
    }
    createAlbum(album) {
        let formattedAlbum = _.cloneDeep(album);
        const { basicInfo, publisher, songs } = formattedAlbum;
        formattedAlbum.basicInfo = {
            albumTitle: basicInfo.albumName,
            albumType: basicInfo.albumType.id,
            releaseYear: basicInfo.albumYearOfPublish,
            numberOfTracks: songs.length,
            mainArtistId: basicInfo.albumMainArtist.id === -1 ? null : basicInfo.albumMainArtist.id,
            mainArtist: basicInfo.albumMainArtist.name,
            countryOfPublication: basicInfo.albumCountryOfPublish.code
        };
        formattedAlbum.publisher = {
            organizationId: publisher.id,
            isrcOrganizationPart: publisher.isrcOrganizationPart,
            isrcSeriesId: publisher.isrcSeriesId,
            lastUsedIsrc: publisher.lastUsedIsrc
        };
        formattedAlbum.publisherLabelId = publisher.labelId;
        
        this.props.createAlbum(formattedAlbum);
    }
    render() {
        return (
            <div>
                <div className={this.props.isCreatingAlbum ? 'hidden' : ''}>
                    <AlbumBasicInfo
                        isVisible={this.state.currentStep === 1}
                        steps={this.state.steps} 
                        close={() => this.exitWizard()}
                        next={(info) => { this.props.updateAlbumBasicInfo(info); this.increaseStep(); } } />
                    <AddPublisher
                        isVisible={this.state.currentStep === 2}
                        steps={this.state.steps} 
                        close={() => this.exitWizard()}
                        next={(producers) => { this.props.updateAlbumProducers(producers); this.increaseStep(); } }
                        back={() => this.decreaseStep()} />
                    <AddSong
                        isVisible={this.state.currentStep === 3}
                        steps={this.state.steps}
                        close={() => this.exitWizard()}
                        isrcPrefix={`${this.props.album.basicInfo.albumCountryOfPublish.code}-${this.props.album.publisher.isrcOrganizationPart}-${this.props.album.basicInfo.albumYearOfPublish.toString().substring(2)}-`}
                        lastUsedIsrc={this.props.album.publisher.lastUsedIsrc}
                        next={(songs) => { this.props.updateAlbumSongs(songs); this.increaseStep(); } }
                        back={() => this.decreaseStep()} />
                    <AddPerformers
                        isVisible={this.state.currentStep === 4}
                        steps={this.state.steps} 
                        close={() => this.exitWizard()}
                        songs={this.props.album.songs}
                        next={(performers) => { this.props.updateAlbumPerformers(performers); this.increaseStep(); } }
                        back={() => this.decreaseStep()} />
                    <AlbumOverview
                        isVisible={this.state.currentStep === 5}
                        steps={this.state.steps} 
                        close={() => this.exitWizard()}
                        next={(album) => { this.createAlbum(album); } }
                        back={() => this.decreaseStep()} />
                </div>
                <Spinner className={this.props.isCreatingAlbum ? '' : 'hidden'} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        album: state.albums.albumBeingCreated,
        isCreatingAlbum: state.albums.isCreatingAlbum
    };
};

export default connect(mapStateToProps, { updateAlbumBasicInfo, updateAlbumSongs, updateAlbumPerformers, updateAlbumProducers, createAlbum })(AddAlbum);