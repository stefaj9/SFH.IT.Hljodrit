import React from 'react';
import { connect } from 'react-redux';
import { getAllProjects } from '../actions/projectActions';
import ProjectSearchBar from './projectSearchBar';
import ProjectFilter from './projectFilter';
import ProjectListView from './projectListView';

class ProjectManagement extends React.Component {
    componentWillMount() {
        this.props.getAllProjects();
    }
    render() {
        return (
            <div className="projects">
                <h2>Verkefnastýring</h2>
                <ProjectSearchBar />
                <ProjectFilter />
                <ProjectListView projects={this.props.projects} />
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