import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { getPersonsByCriteria } from '../../actions/personActions';
import { getZipCodes, getCountries } from '../../actions/commonActions';
import PersonListView from '../common/personListView';
import SearchBar from '../common/searchBar';
import PageSelector from '../common/pageSelector';
import Paging from '../common/paging';

class SelectPersonModal extends React.Component {
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
    componentWillMount() {
        this.props.getZipCodes();
        this.props.getCountries();
    }
    constructor() {
        super();
        this.state = {
            searchQuery: '',
            pageNumber: 1,
            pageSize: 25,
            hasFetched: false,
            registerFormShowing: false
        };
    }
    resetState() {
        this.setState({
            searchQuery: '',
            pageNumber: 1,
            pageSize: 25,
            hasFetched: false,
            registerFormShowing: false
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
    changeToRegisterForm(e) {
        e.preventDefault();
        this.setState({
            registerFormShowing: true
        });
    }
    backToList(e) {
        e.preventDefault();
        this.resetState();
        this.props.getPersonsByCriteria(25, 1, '');
        this.setState({ hasFetched: true });
    }
    renderRegisterForm() {
        if (!this.props.isFetchingPersons && this.props.persons.length === 0) {
            if (!this.state.registerFormShowing) {
                return (
                    <div className="text-center no-person-to-show">
                        <h5>Einstaklingur sem þú leitar að er ekki til staðar. Ef þú vilt stofna nýjan smelltu <a href="#" onClick={(e) => this.changeToRegisterForm(e)}>hér</a></h5>
                    </div>
                );
            } else {
                let zipCodes = this.props.zipCodes.map((z) => {
                    return (
                        <option key={z.code} value={z.code}>{`${z.code} ${z.area}`}</option>
                    );
                });
                let countries = this.props.countries.map((c) => {
                    return (
                        <option key={c.numericIsoCode} value={c.numericIsoCode}>{c.name}</option>
                    );
                });
                return (
                    <div>
                        <h4>Nýskrá notanda</h4>
                        <form action="">
                            <div className="form-group">
                                <label htmlFor="">Kennitala</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Nafn</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Heimilisfang</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Bæjarfélag</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Póstnúmer</label>
                                <select name="" id="" className="form-control">
                                    {zipCodes}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Land</label>
                                <select name="" id="" className="form-control">
                                    {countries}
                                </select>
                            </div>
                            <div className="btn-group pull-right">
                                <button className="btn btn-default" onClick={(e) => this.backToList(e)}>Hætta við</button>
                                <button className="btn btn-default btn-primary">Áfram</button>
                            </div>
                        </form>
                    </div>
                );
            }
        }
    }
    renderBody() {
        let containsData = !this.props.isFetchingPersons && this.props.persons.length !== 0;
        return (
            <div>
                <SearchBar
                    searchTerm={this.state.searchQuery}
                    visible={!this.state.registerFormShowing}
                    searchBy={(term) => this.search(term)} />
                <PageSelector visible={containsData} change={(newPagesize) => this.changePagesize(newPagesize)} />
                <PersonListView
                    persons={this.props.persons}
                    isFetching={this.props.isFetchingPersons}
                    add={(person) => { this.props.update(person); this.props.next(); } } />
                {this.renderRegisterForm()}
                <Paging
                    visible={containsData}
                    currentPage={this.props.currentPage}
                    maximumPage={this.props.maximumPage}
                    changePage={(newPageNumber) => this.changePageNumber(newPageNumber)}
                    />
            </div>
        );
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
                            { this.props.steps() }
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
                                add={(person) => { this.props.update(person); this.props.next(); } } />
                            <Paging
                                visible={!this.props.isFetchingPersons}
                                currentPage={this.props.currentPage}
                                maximumPage={this.props.maximumPage}
                                changePage={(newPageNumber) => this.changePageNumber(newPageNumber)}
                                />
                            {this.renderBody()}
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
        maximumPage: state.person.personEnvelope.maximumPage,
        zipCodes: state.common.zipCodes,
        countries: state.common.countries
    };
};

export default connect(mapStateToProps, { getPersonsByCriteria, getZipCodes, getCountries })(SelectPersonModal);
