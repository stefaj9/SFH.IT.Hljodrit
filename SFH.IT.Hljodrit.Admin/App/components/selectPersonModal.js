import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { getPersonsByCriteria } from '../actions/personActions';
import PersonListView from './personListView';
import SearchBar from './searchBar';
import PageSelector from './pageSelector';
import Paging from './paging';

class SelectPersonModal extends React.Component {
    componentWillReceiveProps(newProps) {
        if (!newProps.isOpen) {
            this.resetState();
        }
    }
    componentWillMount() {
        const { pageSize, pageNumber, searchQuery } = this.state;
        this.props.getPersonsByCriteria(pageSize, pageNumber, searchQuery);
    }
    constructor() {
        super();
        this.state = {
            searchQuery: '',
            pageNumber: 1,
            pageSize: 25
        };
    }
    resetState() {
        this.setState({
            searchQuery: '',
            pageNumber: 1,
            pageSize: 25
        });
    }
    search(term) {
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
    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen}
                contentLabel=""
                className="modal-window"
                overlayClass="modal-overlay">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Veldu flytjanda</h4>
                            <span className="top-corner">
                                <a href="#" onClick={(e) => this.props.close(e)}>
                                    <i className="fa fa-times"></i>
                                </a>
                            </span>
                        </div>
                        <div className="modal-body">
                            <SearchBar searchBy={(term) => this.search(term)} />
                            <PageSelector change={(newPagesize) => this.changePagesize(newPagesize)} />
                            <PersonListView
                                persons={this.props.persons} 
                                isFetching={this.props.isFetchingPersons}
                                add={(person) => this.props.update(person)} />
                            <Paging
                                visible={!this.props.isFetchingPersons}
                                currentPage={this.props.currentPage} 
                                maximumPage={this.props.maximumPage}
                                changePage={(newPageNumber) => this.changePageNumber(newPageNumber)}
                                />
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        persons: state.person.personEnvelope.persons,
        isFetchingPersons: state.person.isFetching,
        currentPage: state.person.personEnvelope.currentPage,
        maximumPage: state.person.personEnvelope.maximumPage
    };
};

export default connect(mapStateToProps, { getPersonsByCriteria })(SelectPersonModal);