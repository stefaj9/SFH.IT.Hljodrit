import React from 'react';
import { connect } from 'react-redux';
import SearchBar from '../common/searchBar';
import { getAllProjects } from '../../actions/projectActions';
import Filter from '../common/filter';
import ProjectListView from './projectListView';
import PageSelector from '../common/pageSelector';
import Paging from '../common/paging';
import AsideFlag from '../common/asideFlag';
import _ from 'lodash';

class ProjectManagement extends React.Component {
    componentWillMount() {
        this.props.getAllProjects(this.state.pageSize, this.state.page, { inWorkingStage: true, recordingFinished: true, readyForPublish: true, published: true }, this.state.searchString);
    }
    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 1,
            pageSize: 25,
            filterProperties: [
                {
                    action: 'inWorkingStage',
                    display: 'Í vinnslu'
                }, 
                {
                    action: 'recordingFinished',
                    display: 'Hljóðritun lokið'
                },
                {
                    action: 'readyForPublish',
                    display: 'Tilbúið til útgáfu'
                },
                {
                    action: 'published',
                    display: 'Útgefið'
                }
            ],
            filters: {
                inWorkingStage: false,
                recordingFinished: false,
                readyForPublish: false,
                published: false
            },
            searchString: ''
        };
    }
    changePagesize(newPagesize) {
        this.setState({
            pageSize: newPagesize
        });

        this.props.getAllProjects(newPagesize, this.state.page, this.state.filters, this.state.searchString);
    }
    changePageNumber(newPageNumber) {
        this.setState({
            pageNumber: newPageNumber
        });

        this.props.getAllProjects(this.state.pageSize, newPageNumber, this.state.filters, this.state.searchString);
    }
    setFilter(filterKey) {
        let filters = _.cloneDeep(this.state.filters);
        filters[filterKey] = !filters[filterKey];

        this.setState({ filters: filters });

        return filters;
    }
    filterBy(filteredData) {
        let filters = {};
        switch (filteredData) {
            case '0': filters = this.setFilter('inWorkingStage');
                break;
            case '1': filters = this.setFilter('recordingFinished');
                break;
            case '2': filters = this.setFilter('readyForPublish');
                break;
            case '3': filters = this.setFilter('published');
                break;
        }
        if (_.every(filters, filter => { return filter === false })) {
            filters = { inWorkingStage: true, recordingFinished: true, readyForPublish: true, published: true };
        }
        this.props.getAllProjects(this.state.pageSize, this.state.page, filters, this.state.searchString);
    }
    searchBy(searchString) {
        this.setState({
            searchString: searchString
        });
        let filters  = this.state.filters;
        if (_.every(filters, filter => { return filter === false })) {
            filters = { inWorkingStage: true, recordingFinished: true, readyForPublish: true, published: true };
        }
        this.props.getAllProjects(this.state.pageSize, this.state.page, filters, searchString);
    }
    render() {
        return (
            <div className="projects">
                <AsideFlag
                    content={<div className="color-info-box-wrapper text-center">
                                <div className="col-xs-12 col-sm-3">
                                    <div className="color" style={{ backgroundColor: 'rgba(244, 67, 54, 0.3)' }}></div>
                                    <div className="color-info-text">Í vinnslu</div>
                                </div>
                                <div className="col-xs-12 col-sm-3">
                                    <div className="color" style={{ backgroundColor: 'rgba(255, 152, 0, 0.3)' }}></div>
                                    <div className="color-info-text">Hljóðritun lokið</div>
                                </div>
                                <div className="col-xs-12 col-sm-3">
                                    <div className="color" style={{ backgroundColor: 'rgba(3, 169, 244, 0.3)' }}></div>
                                    <div className="color-info-text">Tilbúið til útgáfu</div>
                                </div>
                                <div className="col-xs-12 col-sm-3">
                                    <div className="color" style={{ backgroundColor: 'rgba(76, 175, 80, 0.3)' }}></div>
                                    <div className="color-info-text">Útgefið</div>
                                </div>
                            </div>}
                    type='info' />
                <h2>Verkefnastýring</h2>
                <SearchBar visible={true} searchBy={(search) => this.searchBy(search)} searchTerm={this.state.searchString} />
                <Filter filters={this.state.filterProperties} filterBy={(filter) => this.filterBy(filter)} />
                <PageSelector change={(newPagesize) => this.changePagesize(newPagesize)} />
                <ProjectListView projects={this.props.projects} isFetching={this.props.isFetchingProjects} />
                <Paging 
                    visible={!this.props.isFetchingProjects}
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
        projects: state.project.projectEnvelope.objects,
        currentPage: state.project.projectEnvelope.currentPage,
        maximumPage: state.project.projectEnvelope.maximumPage,
        isFetchingProjects: state.project.isFetchingProjects
    };
}


export default connect(mapStateToProps, { getAllProjects })(ProjectManagement);
