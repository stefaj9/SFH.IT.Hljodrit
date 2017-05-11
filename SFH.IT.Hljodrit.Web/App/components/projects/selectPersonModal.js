import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { resetRegisterId, register } from '../../actions/flowActions';
import ListView from '../common/listView';
import SearchBar from '../common/searchBar';
import PageSelector from '../common/pageSelector';
import Paging from '../common/paging';
import Spinner from 'react-spinner';
import _ from 'lodash';

class SelectPersonModal extends React.Component {
    componentWillReceiveProps(newProps) {
        if (newProps.isOpen) {
            if (newProps.registerIndividualId !== undefined && newProps.registerIndividualId !== -1) {
                let user = _.cloneDeep(this.state.registerUser);
                user.id = newProps.registerIndividualId;
                this.props.update(user);
                this.props.next();
                this.props.resetRegisterId();
            }
            if (!this.state.hasFetched) {
                const { pageSize, pageNumber, searchQuery } = this.state;
                this.props.fetch(pageSize, pageNumber, searchQuery, this.props.beginFetch, this.props.stoppedFetch);
                this.setState({ hasFetched: true });
            }
        } else {
            this.resetState();
        }
    }
    closeModal(e) {
        this.resetState();
        this.props.close(e);
    }
    constructor() {
        super();
        this.state = {
            searchQuery: '',
            pageNumber: 1,
            pageSize: 25,
            hasFetched: false,
            registerFormShowing: false,
            registerUser: {
                id: -1,
                name: '',
                ssn: '',
                address: '',
                zipCode: '0',
                email: '',
                numericCountryIsoCode: '4',
                isDeceased: false
            }
        };
    }
    resetState() {
        this.setState({
            searchQuery: '',
            pageNumber: 1,
            pageSize: 25,
            hasFetched: false,
            registerFormShowing: false,
            registerUser: {
                id: -1,
                name: '',
                ssn: '',
                address: '',
                zipCode: '',
                email: '',
                numericCountryIsoCode: '',
                isDeceased: false
            }
        });
    }
    search(term) {
        const { pageSize } = this.state;
        this.props.fetch(pageSize, 1, term, this.props.beginFetch, this.props.stoppedFetch);
        this.setState({
            searchQuery: term,
            pageNumber: 1
        });
    }
    changePagesize(newPagesize) {
        const { searchQuery } = this.state;
        this.props.fetch(newPagesize, 1, searchQuery, this.props.beginFetch, this.props.stoppedFetch);

        this.setState({
            pageSize: newPagesize,
            pageNumber: 1
        });
    }
    changePageNumber(newPageNumber) {
        const { searchQuery, pageSize } = this.state;
        this.props.fetch(pageSize, newPageNumber, searchQuery, this.props.beginFetch, this.props.stoppedFetch);

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
        this.props.fetch(25, 1, '', this.props.beginFetch, this.props.stoppedFetch);
        this.setState({ hasFetched: true });
    }
    register(e) {
        e.preventDefault();
        this.props.register(this.state.registerUser, this.props.registerPath);
    }
    onNameChange(e) {
        let user = _.cloneDeep(this.state.registerUser);
        user.name = e.target.value;
        this.setState({ registerUser: user });
    }
    onSsnChange(e) {
        if (e.target.value.length > 11) {
            return;
        }
        let oldLength = this.state.registerUser.ssn.length;
        let user = _.cloneDeep(this.state.registerUser);
        if (oldLength < e.target.value.length && e.target.value.length === 6) {
            user.ssn = `${e.target.value}-`;
        } else if (oldLength > e.target.value.length && oldLength === 7) {
            user.ssn = e.target.value.slice(0, -1);
        } else {
            user.ssn = e.target.value;
        }
        this.setState({ registerUser: user });
    }
    onAddressChange(e) {
        let user = _.cloneDeep(this.state.registerUser);
        user.address = e.target.value;
        this.setState({ registerUser: user });
    }
    onPostalCodeChange(e) {
        let user = _.cloneDeep(this.state.registerUser);
        user.zipCode = e.target.value;
        this.setState({ registerUser: user });
    }
    onCountryChange(e) {
        let user = _.cloneDeep(this.state.registerUser);
        user.numericCountryIsoCode = e.target.value;
        this.setState({ registerUser: user });
    }
    onDeceasedChange(e) {
        let user = _.cloneDeep(this.state.registerUser);
        user.isDeceased = e.target.value;
        this.setState({ registerUser: user });
    }
    isValidRegisterForm() {
        const user = this.state.registerUser;
        return user.name && user.address;
    }
    renderRegisterForm() {
        if (!this.props.isFetching && this.props.envelope.objects.length === 0 && this.props.registerPath !== undefined) {
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
                const { registerUser } = this.state;
                return (
                    <div>
                        <h4>Nýskrá notanda</h4>
                        <form action="">
                            <div className="form-group">
                                <label htmlFor="">Nafn</label>
                                <input
                                    value={registerUser.name}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => this.onNameChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Kennitala</label>
                                <input
                                    value={registerUser.ssn}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => this.onSsnChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Heimilisfang</label>
                                <input value={registerUser.address} type="text" className="form-control" onChange={(e) => this.onAddressChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Póstnúmer</label>
                                <select value={registerUser.zipCode} name="" id="" className="form-control" onChange={(e) => this.onPostalCodeChange(e)} >
                                    {zipCodes}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Land</label>
                                <select value={registerUser.numericCountryIsoCode} name="" id="" className="form-control" onChange={(e) => this.onCountryChange(e)} >
                                    {countries}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="isDeceased">Er látinn?</label>
                                <input type="checkbox" id="isDeceased" />
                            </div>
                            <div className="btn-group pull-right">
                                <button className="btn btn-default" onClick={(e) => this.backToList(e)}>Hætta við</button>
                                <div className="spinner-btn-wrapper">
                                    <button
                                        disabled={this.props.isRegistering || !this.isValidRegisterForm()}
                                        className="btn btn-default btn-primary"
                                        onClick={(e) => this.register(e)}>
                                            <Spinner
                                                className={this.props.isRegistering ? 'spinner-btn' : 'hidden'} />
                                            <span className={this.props.isRegistering ? 'non-visible' : ''}>Áfram</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                );
            }
        } else {
            if (!this.props.isFetching && this.props.envelope.objects.length === 0) {
                return (
                    <div className="text-center no-person-to-show">Einstaklingur sem leitað er að fannst ekki. Prófaðu að leita með öðrum skilyrðum.</div>
                );
            }
        }
    }
    renderBody() {
        let containsData = !this.props.isFetching && this.props.envelope.objects.length !== 0;
        return (
            <div>
                <div className="row">
                    <SearchBar
                        searchTerm={this.state.searchQuery}
                        visible={!this.state.registerFormShowing}
                        searchBy={(term) => this.search(term)}
                        iconOn={true} />
                    <PageSelector visible={containsData} change={(newPagesize) => this.changePagesize(newPagesize)} />
                </div>
                <ListView
                    items={this.props.envelope.objects}
                    isFetching={this.props.isFetching}
                    add={(o) => { this.props.update(o); this.props.next(); } } />
                {this.renderRegisterForm()}
                <Paging
                    visible={containsData}
                    currentPage={this.props.envelope.currentPage}
                    maximumPage={this.props.envelope.maximumPage}
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
                                <a href="#" onClick={(e) => this.closeModal(e)}>
                                    <i className="fa fa-times"></i>
                                </a>
                            </span>
                        </div>
                        <div className="modal-body">
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
        isFetching: state.flow.isFetchingList,
        isRegistering: state.flow.isRegisteringIndividual,
        registerIndividualId: state.flow.registerIndividualId,
        zipCodes: state.common.zipCodes,
        countries: state.common.countries
    };
};

export default connect(mapStateToProps, { register, resetRegisterId })(SelectPersonModal);
