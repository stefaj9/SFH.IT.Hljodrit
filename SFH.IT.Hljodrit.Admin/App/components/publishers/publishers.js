import React from 'react';
import {connect} from 'react-redux';
import { getPublishersByCriteria } from '../../actions/organizationActions';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import PublisherList from './publishersListView';
import SearchBar from '../common/searchBar';
import Paging from '../common/paging';
import PageSelector from '../common/pageSelector';

class Publishers extends React.Component {

    componentWillMount() {
        this.props.getPublishersByCriteria(this.state.pageSize, this.state.pageNumber, this.state.searchString,
            this.props.isFetchingList, this.props.hasStoppedFetchingList);
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            pageNumber: 1,
            pageSize: 25,
            searchString: '',
        }
    }

    changePageSize(newPageSize) {
        this.setState({
            pageSize: newPageSize
        });

        this.props.getPublishersByCriteria(newPageSize, this.state.pageNumber, this.state.searchString,
            this.props.isFetchingList, this.props.hasStoppedFetchingList);
    }

    changePageNumber(newPageNumber) {
        this.setState({
            pageNumber: newPageNumber
        });

        this.props.getPublishersByCriteria(this.state.pageSize, newPageNumber, this.state.searchString,
            this.props.isFetchingList, this.props.hasStoppedFetchingList);
    }

    search(search) {
        this.setState({
            searchString: search.trim(),
            pageNumber: 1
        }, () => {
            this.props.getPublishersByCriteria(this.state.pageSize, 1, this.state.searchString,
                this.props.isFetchingList, this.props.hasStoppedFetchingList);
        });
    }

    render() {
        return (
            <div>
                <h2>Útgefendur</h2>
                <div className="row space-20">
                    <div className="col-xs-12 col-sm-12 no-padding">
                        <SearchBar
                            visible={true}
                            searchBy={(search) => this.search(search)}
                            searchTerm={this.state.searchString}
                            iconOn={false} />
                    </div>
                </div>
                <div className="row">
                    <PageSelector visible={!this.props.isFetching}
                                  change={newPageSize => this.changePageSize(newPageSize)} />
                </div>
                <PublisherList publishers={this.props.publishers}
                           isFetching={this.props.isFetching} />
                <div className="row">
                    <Paging visible={!this.props.isFetching}
                            currentPage={this.props.currentPage}
                            maximumPage={this.props.maximumPage}
                            changePage={newPageNumber => this.changePageNumber(newPageNumber)} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        publishers: state.organization.organizationEnvelope.objects,
        currentPage: state.organization.organizationEnvelope.currentPage,
        maximumPage: state.organization.organizationEnvelope.maximumPage,
        isFetching: state.flow.isFetchingList
    }
}

export default connect(mapStateToProps, {getPublishersByCriteria, isFetchingList, hasStoppedFetchingList})(Publishers);