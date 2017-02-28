import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import PersonListView from './personListView';
import SearchBar from './searchBar';
import { getPersonsByCriteria } from '../actions/personActions';
import PageSelector from './pageSelector';
import Paging from './paging';

class PeopleListModal extends React.Component {
    componentWillMount() {
        const { pageSize, pageNumber, searchQuery } = this.state;
        //this.props.getPersonsByCriteria(pageSize, pageNumber, searchQuery);
    }
    constructor() {
        super();
        this.state = {
            selectedPersons: [],
            searchQuery: '',
            pageNumber: 1,
            pageSize: 25
        };
    }
    closeModal(e) {
        e.preventDefault();
        this.props.close();
    }
    search(term) {
        const { pageNumber, pageSize } = this.state;
        this.props.getPersonsByCriteria(pageSize, pageNumber, term);
        this.setState({
            searchQuery: term
        });
    }
    changePagesize(newPagesize) {
        const { searchQuery, pageNumber } = this.state;
        this.props.getPersonsByCriteria(newPagesize, pageNumber, searchQuery);

        this.setState({
            pageSize: newPagesize
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
                            <h4>{this.props.title}</h4>
                            <span className="top-corner">
                                <a href="#" onClick={(e) => this.closeModal(e)}>
                                    <i className="fa fa-times"></i>
                                </a>
                            </span>
                        </div>
                        <div className="modal-body">
                            <SearchBar searchBy={(term) => this.search(term)} />
                            <PageSelector change={(newPagesize) => this.changePagesize(newPagesize)} />
                            <PersonListView persons={this.props.persons} isFetching={this.props.isFetchingPersons} />
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

export default connect(mapStateToProps, { getPersonsByCriteria })(PeopleListModal);
