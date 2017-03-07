import React from 'react';
//import Filter from '../common/filter';
import PersonListView from '../common/personListView';
import { getPersonsByCriteria } from '../../actions/personActions';
import SearchBar from '../common/searchBar';
import PageSelector from '../common/pageSelector';
import Paging from '../common/paging';
import { connect } from 'react-redux';
import Filter from '../common/filter';

export class Users extends React.Component {

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
                this.props.getPersonsByCriteria(pageSize, pageNumber, searchQuery);
                this.setState({ hasFetched: true });
            }
        }
    }

    search(term) {
        console.log(term);
        const { pageSize } = this.state;
        this.props.getPersonsByCriteria(pageSize, 1, term);
        this.setState({
            searchQuery: term,
            pageNumber: 1
        });
    }

    changePagesize(newPagesize) {
        const { searchQuery } = this.state;
        this.props.getPersonsByCriteria(newPagesize, 1, searchQuery);

        this.setState({
            pageSize: newPagesize,
            pageNumber: 1
        });
    }

    changePageNumber(newPageNumber) {
        const { searchQuery, pageSize } = this.state;
        this.props.getPersonsByCriteria(pageSize, newPageNumber, searchQuery);

        this.setState({
            pageNumber: newPageNumber
        });
    }

    componentWillMount() {
        const { pageSize, pageNumber, searchQuery } = this.state;
        this.props.getPersonsByCriteria(pageSize, pageNumber, searchQuery);
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

    render() {
        let containsData = !this.props.isFetchingPersons && this.props.persons.length !== 0;
        return (
            <div>
                <h2>Aðilar</h2>
                <SearchBar
                    searchTerm={this.state.searchQuery}
                    visible={true}
                    searchBy={(term) => this.search(term)} />
                <Filter filters={this.state.filterProperties} filterBy={(filter) => this.filterBy(filter)} />
                <PageSelector visible={containsData} change={(newPagesize) => this.changePagesize(newPagesize)} />
                <PersonListView
                    persons={this.props.persons}
                    isFetching={this.props.isFetchingPersons}
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
}

function mapStateToProps(state) {
    return {
        persons: state.person.personEnvelope.persons,
        isFetchingPersons: state.person.isFetching,
        currentPage: state.person.personEnvelope.currentPage,
        maximumPage: state.person.personEnvelope.maximumPage,
    };
};

export default connect(mapStateToProps, { getPersonsByCriteria })(Users);
