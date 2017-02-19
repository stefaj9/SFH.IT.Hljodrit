import React from 'react';
import { connect } from 'react-redux';
import { getAllProjects } from '../actions/projectActions';
import ProjectSearchBar from './projectSearchBar';
import ProjectFilter from './projectFilter';
import ProjectListView from './projectListView';
import PageSelector from './pageSelector';
import Paging from './paging';

class ProjectManagement extends React.Component {
    componentWillReceiveProps() {
        this.setState({
            isFetching: false
        });
    }
    componentWillMount() {
        this.props.getAllProjects(this.state.pageSize, this.state.page);
    }
    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 1,
            pageSize: 25,
            isFetching: true
        };
    }
    changePagesize(newPagesize) {
        this.setState({
            pageSize: newPagesize,
            isFetching: true
        });

        this.props.getAllProjects(newPagesize, this.state.page);
    }
    changePageNumber(newPageNumber) {
        this.setState({
            pageNumber: newPageNumber,
            isFetching: true
        });

        this.props.getAllProjects(this.state.pageSize, newPageNumber);
    }
    render() {
        return (
            <div className="projects">
                <h2>Verkefnastýring</h2>
                <ProjectSearchBar />
                <ProjectFilter />
                <PageSelector change={(newPagesize) => this.changePagesize(newPagesize)} />
                <ProjectListView projects={this.props.projects} isFetching={this.state.isFetching} />
                <Paging 
                    visible={!this.state.isFetching}
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
        selectedProject: state.project.selectedProject
    };
}

export default connect(mapStateToProps, { getAllProjects })(ProjectManagement);