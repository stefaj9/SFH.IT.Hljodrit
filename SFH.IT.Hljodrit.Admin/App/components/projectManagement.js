import React from 'react';
import { connect } from 'react-redux';
import { getAllProjects } from '../actions/projectActions';
import ProjectSearchBar from './projectSearchBar';
import ProjectFilter from './projectFilter';
import ProjectListView from './projectListView';
import PageSelector from './pageSelector';

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
    render() {
        return (
            <div className="projects">
                <h2>Verkefnastýring</h2>
                <ProjectSearchBar />
                <ProjectFilter />
                <PageSelector change={(newPagesize) => this.changePagesize(newPagesize)} />
                <ProjectListView projects={this.props.projects} isFetching={this.state.isFetching} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        projects: state.project.projects,
        selectedProject: state.project.selectedProject
    };
}

export default connect(mapStateToProps, { getAllProjects })(ProjectManagement);