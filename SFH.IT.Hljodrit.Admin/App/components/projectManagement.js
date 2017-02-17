import React from 'react';
import { connect } from 'react-redux';
import ProjectSearchBar from './projectSearchBar';
import ProjectFilter from './projectFilter';
import ProjectListView from './projectListView';

class ProjectManagement extends React.Component {
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
        projects: state.projectManagement.projects
    };
}

export default connect(mapStateToProps, null)(ProjectManagement);