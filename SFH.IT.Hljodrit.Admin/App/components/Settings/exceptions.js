import React from 'react';
import {connect} from 'react-redux';
import {getAllExceptions} from '../../actions/settingsActions';

class Exceptions extends React.Component {
    componentWillMount() {
        this.props.getAllExceptions(this.state.pageSize, this.state.page);
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 1,
            pageSize: 25
        }
    }

    render() {
        return (
            <div>
                <h2>Exceptions</h2>
            </div>
        );
    }
}

function mapStateToProps(state) {
    debugger;
    return state;

}

export default connect(mapStateToProps, { getAllExceptions })(Exceptions);