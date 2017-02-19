import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import { getAllProjects } from '../actions/projectActions';
import Filter from './filter';
import ProjectListView from './projectListView';

class ProjectManagement extends React.Component {
    componentWillMount() {
        this.props.getAllProjects();
    }
    render() {
        return (
            <div className="projects">
                <h2>Verkefnastýring</h2>
                <SearchBar />
                <Filter />
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
