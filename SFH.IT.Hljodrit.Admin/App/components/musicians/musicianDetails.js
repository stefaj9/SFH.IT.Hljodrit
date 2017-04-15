import React from 'react';
import { connect } from 'react-redux';
import { getPersonById } from '../../actions/personActions';
import MusicianDetailsForm from './musicianDetailsForm';

class MusicianDetails extends React.Component {
    componentWillMount() {
        this.props.getPersonById(this.props.routeParams.musicianId);
    }
    render() {
        return (
            <div>
                <h2>{this.props.musician.fullName}</h2>
                <MusicianDetailsForm 
                    musician={this.props.musician}
                    updateMusician={(musician) => console.log(musician)} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        musician: state.person.selectedPerson
    };
};

export default connect(mapStateToProps, { getPersonById })(MusicianDetails);