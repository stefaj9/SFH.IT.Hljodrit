import React from 'react';
import {connect} from 'react-redux';
import {getAllExceptions} from '../../../actions/settingsActions';
import ExceptionList from './exceptionsListView';
import PageSelector from '../../pageSelector';
import Paging from '../../paging';

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

    changePageSize(newPageSize) {
        this.setState({
            pageSize: newPageSize
        });

        this.props.getAllExceptions(newPageSize, this.state.page);
    }

    changePageNumber(newPageNumber) {
        this.setState({
            page: newPageNumber
        });

        this.props.getAllExceptions(this.state.pageSize, newPageNumber);
    }

    render() {
        return (
            <div>
                <h2>Exceptions</h2>
                <PageSelector change={newPageSize => this.changePageSize(newPageSize)} />
                <ExceptionList exceptions={this.props.exceptions}
                               isFetching={this.props.isFetching} />
                <Paging visible={!this.props.isFetching}
                        currentPage={this.props.currentPage}
                        maximumPage={this.props.maximumPage}
                        changePage={newPageNumber => this.changePageNumber(newPageNumber)} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    debugger;
    return {
        exceptions: state.settings.envelope.objects,
        currentPage: state.settings.envelope.currentPage,
        maximumPage: state.settings.envelope.maximumPage,
        isFetching: state.settings.isFetching
    }
}

export default connect(mapStateToProps, { getAllExceptions })(Exceptions);