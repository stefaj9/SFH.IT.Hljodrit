import React from 'react';
import {connect} from 'react-redux';
import { getPublishersByCriteria, createPublisher } from '../../actions/organizationActions';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import { getZipCodes } from '../../actions/commonActions';
import PublisherList from './publishersListView';
import PromptModal from '../common/promptModal';
import CreatePublisher from './createPublisher';
import SearchBar from '../common/searchBar';
import Paging from '../common/paging';
import PageSelector from '../common/pageSelector';
import _ from 'lodash';

class Publishers extends React.Component {

    componentWillMount() {
        this.props.getPublishersByCriteria(this.state.pageSize,
            this.state.pageNumber, this.state.searchString,
            this.props.isFetchingList, this.props.hasStoppedFetchingList);

        this.props.getZipCodes();
    }

    emptyPublisher() {
        return {
            fullName: '',
            address: '',
            zipCode: '',
            city: '',
            ssn: '',
            email: '',
            phoneNumber: '',
            website: '',
            mainContactEmail: '',
            mainContactPhoneNumber: '',
            mainContactName: ''
        }
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            pageNumber: 1,
            pageSize: 25,
            searchString: '',
            isModalOpen: false,
            newPublisher: this.emptyPublisher(),
            isDirtyForm: false
        };

        this.updateNewPublisher = this.updateNewPublisher.bind(this);
        this.resetNewPublisher = this.resetNewPublisher.bind(this);
        this.updateZipAndCityFields = this.updateZipAndCityFields.bind(this);

    }

    resetNewPublisher() {
        this.setState({
            newPublisher: this.emptyPublisher()
        })
    }

    createPublisher() {
        this.props.createPublisher(this.state.newPublisher);
    }

    updateNewPublisher(key, value) {
        let updatedNewPublisher = _.cloneDeep(this.state.newPublisher);
        updatedNewPublisher[key] = value;

        this.setState({
            newPublisher: updatedNewPublisher,
        })
    }

    newPublisherIsValid() {
        let publisherKeys = Object.keys(this.state.newPublisher);
        let newPublisher = this.state.newPublisher;
        for (let i = 0; i < publisherKeys.length; i++) {
            let currentKey = publisherKeys[i];
            if (currentKey !== 'website' && newPublisher[publisherKeys[i]] === '')
                return false;
        }
        return true;
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

    toggleModal(state) {
        this.setState({ isModalOpen: state })
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

    updateZipAndCityFields(newZip, newCity) {
        let updatedNewPublisher = _.cloneDeep(this.state.newPublisher);
        updatedNewPublisher['zipCode'] = newZip;
        updatedNewPublisher['city'] = newCity;

        this.setState({
            newPublisher: updatedNewPublisher,
        });
    }

    render() {
        return (
            <div>
                <h2>Útgefendur</h2>
                <div className="row space-20 text-right">
                    <button className="btn btn-default" onClick={() => this.setState({isModalOpen: true})}>
                        <i className="fa fa-fw fa-plus"/> Bæta við útgefanda
                    </button>
                </div>
                <div className="row space-20 ">
                    <div className="col-xs-12 col-sm-12 no-padding">
                        <SearchBar
                            visible={true}
                            searchBy={(search) => this.search(search)}
                            searchTerm={this.state.searchString}
                            iconOn={false} />
                    </div>
                </div>
                <div className="row">
                    <PageSelector visible={!this.props.isFetchingPublisher}
                                  change={newPageSize => this.changePageSize(newPageSize)} />
                </div>
                <PublisherList publishers={this.props.publishers}
                           isFetching={this.props.isFetchingPublisher} />
                <div className="row">
                    <Paging visible={!this.props.isFetchingPublisher}
                            currentPage={this.props.currentPage}
                            maximumPage={this.props.maximumPage}
                            changePage={newPageNumber => this.changePageNumber(newPageNumber)} />
                </div>
                <PromptModal isOpen={this.state.isModalOpen}
                             title="Bæta við framleiðanda"
                             content={<CreatePublisher publisher={this.state.newPublisher}
                                                       onChange={this.updateNewPublisher}
                                                       onClose={this.resetNewPublisher}
                                                       zipCodes={this.props.zipCodes}
                                                       updateZipAndCity={this.updateZipAndCityFields} />}
                             confirmBtnText="Bæta við"
                             confirmBtnCallback={() => {
                                 this.createPublisher();
                                 this.toggleModal(false);
                                 this.resetNewPublisher();
                             }}
                             confirmBtnDisabled={!this.newPublisherIsValid()}
                             discardBtnText="Loka"
                             discardBtnCallback={() => { this.toggleModal(false); this.resetNewPublisher(); }} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        publishers: state.organization.organizationEnvelope.objects,
        currentPage: state.organization.organizationEnvelope.currentPage,
        maximumPage: state.organization.organizationEnvelope.maximumPage,
        isFetchingPublisher: state.flow.isFetchingList,
        isCreatingPublisher: state.organization.isCreatingPublisher,
        zipCodes: state.common.zipCodes
    }
}

export default connect(mapStateToProps, {
    getPublishersByCriteria,
    isFetchingList,
    hasStoppedFetchingList,
    createPublisher,
    getZipCodes
}) (Publishers);