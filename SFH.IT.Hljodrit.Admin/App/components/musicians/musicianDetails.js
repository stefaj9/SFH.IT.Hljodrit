import React from 'react';
import { connect } from 'react-redux';
import { getPersonById, updatePersonById } from '../../actions/personActions';
import MusicianDetailsForm from './musicianDetailsForm';
import Spinner from 'react-spinner';

class MusicianDetails extends React.Component {
    componentWillMount() {
        this.props.getPersonById(this.props.routeParams.musicianId);
    }
    renderData() {
        return (
            <div className={this.props.isFetchingPerson ? 'hidden' : ''}>
                <h2>{this.props.musician.fullName}</h2>
                <MusicianDetailsForm 
                    musician={this.props.musician}
                    zipCodes={this.props.zipCodes}
                    countries={this.props.countries}
                    updateMusician={(musician) => this.props.updatePersonById(this.props.routeParams.musicianId, musician)} />
            </div>
        );
    }
    render() {
        return (
            <div>
                <Spinner className={this.props.isFetchingPerson ? '' : 'hidden'} />
                {this.renderData()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        musician: state.person.selectedPerson,
        zipCodes: state.common.zipCodes,
        countries: state.common.countries,
        isFetchingPerson: state.person.isFetchingPerson
    };
};

export default connect(mapStateToProps, { getPersonById, updatePersonById })(MusicianDetails);