import React from 'react';
import ListView from '../common/listView';
import { getPersonsByCriteria } from '../../actions/personActions';
import { browserHistory } from 'react-router';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import SearchBar from '../common/searchBar';
import PageSelector from '../common/pageSelector';
import Paging from '../common/paging';
import Spinner from 'react-spinner';
import { connect } from 'react-redux';
import Filter from '../common/filter';

class Musicians extends React.Component {

    constructor() {
        super();
        this.state = {
            searchQuery: '',
            pageNumber: 1,
            pageSize: 25,
            hasFetched: false,
            filterProperties: [
                {
                    action: 'performers',
                    display: 'Flytjendur'
                },
                {
                    action: 'producers',
                    display: 'Framleiðendur'
                },
                {
                    action: 'vip',
                    display: 'VIP'
                }
            ],
            filters: {
                performers: false,
                producers: false,
                vip: false
            }
        };
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.isOpen) {
            this.resetState();
        } else {
            if (!this.state.hasFetched) {
                const { pageSize, pageNumber, searchQuery } = this.state;
                this.props.getPersonsByCriteria(pageSize, pageNumber, searchQuery, this.props.isFetchingList, this.props.hasStoppedFetchingList);
                this.setState({ hasFetched: true });
            }
        }
    }

    search(term) {
        const { pageSize } = this.state;
        this.props.getPersonsByCriteria(pageSize, 1, term, this.props.isFetchingList, this.props.hasStoppedFetchingList);
        this.setState({
            searchQuery: term,
            pageNumber: 1
        });
    }

    changePagesize(newPagesize) {
        const { searchQuery } = this.state;
        this.props.getPersonsByCriteria(newPagesize, 1, searchQuery, this.props.isFetchingList, this.props.hasStoppedFetchingList);

        this.setState({
            pageSize: newPagesize,
            pageNumber: 1
        });
    }

    changePageNumber(newPageNumber) {
        const { searchQuery, pageSize } = this.state;
        this.props.getPersonsByCriteria(pageSize, newPageNumber, searchQuery, this.props.isFetchingList, this.props.hasStoppedFetchingList);

        this.setState({
            pageNumber: newPageNumber
        });
    }

    componentWillMount() {
        const { pageSize, pageNumber, searchQuery } = this.state;
        this.props.getPersonsByCriteria(pageSize, pageNumber, searchQuery, this.props.isFetchingList, this.props.hasStoppedFetchingList);
    }

    resetState() {
        this.setState({
            searchQuery: '',
            pageNumber: 1,
            pageSize: 25
        });
    }

    filterBy(filteredData) {
        let filters = this.state.filters;
        switch (filteredData) {
            case 0: this.setState({ filters: { performers: !this.state.performers } }); filters.pending = !this.state.pending;
                break;
            case 1: this.setState({ filters: { producers: !this.state.producers } }); filters.resent = !this.state.resent;
                break;
            case 2: this.setState({ filters: { vip: !this.state.vip } }); filters.approved = !this.state.approved;
                break;
        }
    }
    renderData() {
        let containsData = !this.props.isFetchingPersons && this.props.persons.length !== 0;
        return (
            <div className={this.props.isFetchingPersons ? 'hidden' : ''}>
                <h2>Aðilar</h2>
                <SearchBar
                    searchTerm={this.state.searchQuery}
                    visible={true}
                    searchBy={(term) => this.search(term)} />
                <Filter filters={this.state.filterProperties} filterBy={(filter) => this.filterBy(filter)} />
                <PageSelector visible={containsData} change={(newPagesize) => this.changePagesize(newPagesize)} />
                <ListView
                    items={this.props.persons}
                    isFetching={this.props.isFetchingPersons}
                    rowClass="hover-cursor"
                    add={(item) => browserHistory.push(`/app/musicians/${item.id}`)}
                    />
                <Paging
                    visible={!this.props.isFetchingPersons}
                    currentPage={this.props.currentPage}
                    maximumPage={this.props.maximumPage}
                    changePage={(newPageNumber) => this.changePageNumber(newPageNumber)}
                    />
            </div>
        );
    }

    render() {
        return (
            <div>
                <Spinner className={this.props.isFetchingPersons ? '' : 'hidden'} />
                {this.renderData()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        persons: state.person.personEnvelope.objects,
        isFetchingPersons: state.flow.isFetchingList,
        currentPage: state.person.personEnvelope.currentPage,
        maximumPage: state.person.personEnvelope.maximumPage,
    };
};

export default connect(mapStateToProps, { getPersonsByCriteria, isFetchingList, hasStoppedFetchingList })(Musicians);
