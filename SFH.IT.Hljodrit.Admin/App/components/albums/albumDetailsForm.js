import React from 'react';
import { connect } from 'react-redux';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import { getMainArtistsByCriteria } from '../../actions/mainArtistActions';
import { getPublishersByCriteria, getLabelsByPublisherId } from '../../actions/organizationActions';
import SelectPersonModal from '../project/selectPersonModal';
import _ from 'lodash';
import Spinner from 'react-spinner';

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
                publisherId: -1,
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
        let invalid = 'ekki skráð'
        for (var key in album) {
            if (album[key] === null || album[key] === undefined) {
                album[key] = invalid;
            }
        }
        album.publisherId = invalid ? -1 : album.publisherId;
    }

    renderForm() {
        if (this.state.hasFetched) {
            return (
                <form>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Plötuheiti</label>
                            <input type="text" className="form-control"
                                value={this.state.selectedAlbum.albumTitle}
                                onChange={(e) => this.updateAlbumField('albumTitle', e.target.value)}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Aðalflytjandi</label>
                            <div className="input-group">
                                <input type="text" className="form-control"disabled="true"
                                    value={this.state.selectedAlbum.mainArtistName}
                                    />
                                    <div className="input-group-btn">
                                        <button type="button" className="btn btn-primary"
                                            onClick={() => this.openModal(this.props.getMainArtistsByCriteria,
                                                                this.props.mainArtistEnvelope, 'Breyta aðalflytjanda',
                                                                this.updateMainArtist.bind(this))}>
                                            Breyta
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
                                    value={this.state.selectedAlbum.publisher}/>
                                <div className="input-group-btn">
                                    <button type="button" className="btn btn-primary"
                                        onClick={() => this.openModal(this.props.getPublishersByCriteria,
                                                            this.props.organizationEnvelope,'Breyta útgefanda',
                                                            this.updatePublisher.bind(this))}>
                                        Breyta
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Label</label>
                                <select className="form-control"
                                    onChange={(e) => this.updateAlbumField('label', e.target.value)}
                                    value={this.state.selectedAlbum.label}>
                                    {this.populateLabelOptions()}
                                </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Framleiðsluland</label>
                            <select className="form-control"
                                onChange={(e) => this.updateAlbumField('countryOfProduction', e.target.value)}
                                value={this.state.selectedAlbum.countryOfProduction}>
                                {this.props.countryOptions()}
                            </select>
                        </div>
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Útgáfuland</label>
                            <select className="form-control"
                                onChange={(e) => this.updateAlbumField('countryOfPublication', e.target.value)}
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
                        fetch={this.state.currentFetchMethod}
                        beginFetch={this.props.isFetchingList}
                        stoppedFetch={this.props.hasStoppedFetchingList}
                        next={() => this.setState({isModalOpen: false})}
                        close={() => this.setState({isModalOpen: false})}
                        envelope={this.state.envelope}
                        update={(newElement) => this.state.currentUpdateFunction(newElement)}
                        steps={() => { return ( <h4>{ this.state.typeOfAction }</h4> ) } }
                     />
                </form>
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
