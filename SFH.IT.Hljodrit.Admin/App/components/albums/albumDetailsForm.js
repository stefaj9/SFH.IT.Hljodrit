import React from 'react';
import { connect } from 'react-redux';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import { getMainArtistsByCriteria } from '../../actions/mainArtistActions';
import SelectPersonModal from '../project/selectPersonModal';
import _ from 'lodash';

class AlbumDetailsForm extends React.Component {

    componentWillReceiveProps(newProps) {
        if(_.keys(newProps.album).length > 0 && !this.state.hasFetched) {
            this.setState({
                selectedAlbum: {
                    countryOfPublication: newProps.album.countryOfPublication,
                    countryOfProduction: newProps.album.countryOfProduction,
                    label: newProps.album.label,
                    albumTitle: newProps.album.albumTitle,
                    mainArtistName: newProps.album.mainArtistName,
                    publisher: newProps.album.publisher
                },
                hasFetched: true
            });
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

    openMainArtistModal() {
        this.setState({
            isModalOpen: true,
            currentFetchMethod: this.props.getMainArtistsByCriteria,
            envelope: this.props.mainArtistEnvelope,
            typeOfAction: 'Breyta aðalflytjanda',
            currentUpdateFunction: this.updateMainArtist.bind(this)
        });
    }

    updateAlbumTitle(newTitle) {
        let updatedAlbum = _.cloneDeep(this.state.selectedAlbum);
        updatedAlbum.albumTitle = newTitle;
        this.setState({
            selectedAlbum: updatedAlbum,
            selectedAlbumHasChanged: true,
            isModalOpen: false
        });
    }

    updateMainArtist(newMainArtist) {
        let updatedAlbum = _.cloneDeep(this.state.selectedAlbum);
        updatedAlbum.mainArtistName = newMainArtist.name;
        this.setState({
            selectedAlbum: updatedAlbum,
            selectedAlbumHasChanged: true,
            isModalOpen: false
        });
    }

    updateCountryOfProduction(newCountryOfProduction) {
        let updatedAlbum = _.cloneDeep(this.state.selectedAlbum);
        updatedAlbum.countryOfProduction = newCountryOfProduction;
        this.setState({
            selectedAlbum: updatedAlbum,
            selectedAlbumHasChanged: true,
            isModalOpen: false
        });
    }

    updateCountryOfPublication(newCountryOfPublication) {
        let updatedAlbum = _.cloneDeep(this.state.selectedAlbum);
        updatedAlbum.countryOfPublication = newCountryOfPublication;
        this.setState({
            selectedAlbum: updatedAlbum,
            selectedAlbumHasChanged: true,
            isModalOpen: false
        });
    }

    updateSelectedAlbum(e) {
        e.preventDefault();
        console.log(this.state.selectedAlbum);
    }


    validateAlbum(album) {
        if (!album.label) {
            album.label = 'ekki skráð';
        }
        if (!album.mainArtistName) {
            album.mainArtistName = 'ekki skráð';
        }
        if (!album.publisher) {
            album.publisher ='ekki skráð';
        }
    }

    render() {
        return (
                <form>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Plötuheiti</label>
                            <input type="text" className="form-control"
                                value={this.state.selectedAlbum.albumTitle}
                                onChange={(e) => this.updateAlbumTitle(e.target.value)}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Aðalflytjandi</label>
                            <div className="input-group">
                                <input type="text" className="form-control"disabled="true"
                                    value={this.state.selectedAlbum.mainArtistName}
                                    />
                                    <div className="input-group-btn">
                                        <button type="button" className="btn btn-primary"
                                            onClick={() => this.openMainArtistModal()}>Breyta
                                        </button>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Útgefandi</label>
                            <div className="input-group">
                                <input type="text" className="form-control" disabled="true"
                                    value={this.state.selectedAlbum.publisher}
                                    onChange={(e) => this.setState({publisher: e.target.value})}/>
                                <div className="input-group-btn">
                                    <button type="button" className="btn btn-primary"
                                        onClick={() => console.log('publisher')}>Breyta
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Label</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" disabled="true"
                                        value={this.state.selectedAlbum.label}
                                        onChange={(e) => this.setState({label: e.target.value})}/>
                                    <div className="input-group-btn">
                                        <button type="button" className="btn btn-primary"
                                            onClick={() => console.log('lABEL')}>Breyta
                                        </button>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Framleiðsluland</label>
                            <select className="form-control"
                                onChange={(e) => this.updateCountryOfProduction(e.target.value)}
                                value={this.state.selectedAlbum.countryOfProduction}>
                                {this.props.countryOptions()}
                            </select>
                        </div>
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Útgáfuland</label>
                            <select className="form-control"
                                onChange={(e) => this.updateCountryOfPublication(e.target.value)}
                                value={this.state.selectedAlbum.countryOfPublication}>
                                {this.props.countryOptions()}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-default btn-primary pull-right"
                        disabled={!this.state.selectedAlbumHasChanged}
                        onClick={(e) => this.updateSelectedAlbum(e)}>
                        Vista
                    </button>
                    <SelectPersonModal
                        isOpen={this.state.isModalOpen}
                        fetch={this.props.getMainArtistsByCriteria}
                        beginFetch={this.props.isFetchingList}
                        stoppedFetch={this.props.hasStoppedFetchingList}
                        next={() => this.setState({isModalOpen: false})}
                        close={() => this.setState({isModalOpen: false})}
                        envelope={this.props.mainArtistEnvelope}
                        update={(newElement) => this.state.currentUpdateFunction(newElement)}
                        steps={() => { return ( <h4>{ this.state.typeOfAction }</h4> ) } }
                     />
                </form>
        );
    }
};

function mapStateToProps(state) {
    return {
        mainArtistEnvelope: state.mainArtist.mainArtistEnvelope,
        organizationEnvelope: state.organization.organizationEnvelope
    };
};

export default connect(mapStateToProps, { isFetchingList, hasStoppedFetchingList, getMainArtistsByCriteria })(AlbumDetailsForm);
