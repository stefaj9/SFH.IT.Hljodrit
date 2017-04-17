import React from 'react';
import { connect } from 'react-redux';
import { getPersonById, updatePersonById, getMediaAssociatedWithPerson } from '../../actions/personActions';
import MusicianDetailsForm from './musicianDetailsForm';
import MusicianMediaTable from './musicianMediaTable';
import Spinner from 'react-spinner';

class MusicianDetails extends React.Component {
    componentWillMount() {
        this.props.getPersonById(this.props.routeParams.musicianId);
        this.props.getMediaAssociatedWithPerson(this.props.routeParams.musicianId);
    }
    renderData() {
        return (
            <div className={!(!this.props.isFetchingPerson && !this.props.isFetchingPersonMedia) ? 'hidden' : 'col-xs-12'}>
                <h2>{this.props.musician.fullName}</h2>
                <MusicianDetailsForm 
                    musician={this.props.musician}
                    zipCodes={this.props.zipCodes}
                    countries={this.props.countries}
                    updateMusician={(musician) => this.props.updatePersonById(this.props.routeParams.musicianId, musician)} />
                <MusicianMediaTable 
                    musicianMedia={this.props.musicianMedia} />
            </div>
        );
    }
    render() {
        return (
            <div>
                <Spinner className={this.props.isFetchingPerson || this.props.isFetchingPersonMedia ? '' : 'hidden'} />
                {this.renderData()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        musician: state.person.selectedPerson,
        musicianMedia: state.person.selectedPersonMedia,
        zipCodes: state.common.zipCodes,
        countries: state.common.countries,
        isFetchingPerson: state.person.isFetchingPerson,
        isFetchingPersonMedia: state.person.isFetchingPersonMedia
    };
};

export default connect(mapStateToProps, { getPersonById, updatePersonById, getMediaAssociatedWithPerson })(MusicianDetails);