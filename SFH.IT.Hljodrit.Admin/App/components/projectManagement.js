import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import { getAllProjects } from '../actions/projectActions';
import Filter from './filter';
import ProjectListView from './projectListView';
import PageSelector from './pageSelector';
import Paging from './paging';

class ProjectManagement extends React.Component {
    componentWillMount() {
        this.props.getAllProjects(this.state.pageSize, this.state.page, this.state.filters, this.state.searchString);
    }
    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 1,
            pageSize: 25,
            filterProperties: [
                {
                    action: 'pending',
                    display: 'Í bið'
                }, 
                {
                    action: 'resent',
                    display: 'Endursent'
                },
                {
                    action: 'approved',
                    display: 'Samþykkt'
                }
            ],
            filters: {
                pending: false,
                resent: false,
                approved: false
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
    filterBy(filteredData) {
        let filters = this.state.filters;
        switch (filteredData) {
            case 0: this.setState({ filters: { pending: !this.state.pending } }); filters.pending = !this.state.pending;
                break;
            case 1: this.setState({ filters: { resent: !this.state.resent } }); filters.resent = !this.state.resent;
                break;
            case 2: this.setState({ filters: { approved: !this.state.approved } }); filters.approved = !this.state.approved;
                break;
        }

        this.props.getAllProjects(this.state.pageSize, this.state.page, filters, this.state.searchString);
    }
    searchBy(searchString) {
        this.setState({
            searchString: searchString
        });
        this.props.getAllProjects(this.state.pageSize, this.state.page, this.state.filters, searchString);
    }
    render() {
        return (
            <div className="projects">
                <h2>Verkefnastýring</h2>
                <SearchBar searchBy={(search) => this.searchBy(search)} />
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
        projects: state.project.projectEnvelope.projects,
        currentPage: state.project.projectEnvelope.currentPage,
        maximumPage: state.project.projectEnvelope.maximumPage,
        selectedProject: state.project.selectedProject,
        isFetchingProjects: state.project.isFetchingProjects
    };
}


export default connect(mapStateToProps, { getAllProjects })(ProjectManagement);
