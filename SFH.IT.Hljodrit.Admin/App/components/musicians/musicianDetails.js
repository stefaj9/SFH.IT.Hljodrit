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
                <MusicianDetailsForm musician={this.props.musician} />
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