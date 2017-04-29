import React from 'react';
import { connect } from 'react-redux';
import { getProjectById } from '../../actions/projectActions';
import Spinner from 'react-spinner';

class ProjectDetails extends React.Component {
    componentWillMount() {
        this.props.getProjectById(this.props.routeParams.projectId);
    }
    render() {
        const { selectedProject } = this.props;
        return (
            <div>
                <Spinner className={this.props.isFetchingProjectById ? '' : 'hidden'} />
                <div className={this.props.isFetchingProjectById ? 'hidden' : ''}>
                    {selectedProject.projectName}
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        selectedProject: state.project.selectedProject,
        isFetchingProjectById: state.project.isFetchingProjectById
    };
};

export default connect(mapStateToProps, { getProjectById })(ProjectDetails);