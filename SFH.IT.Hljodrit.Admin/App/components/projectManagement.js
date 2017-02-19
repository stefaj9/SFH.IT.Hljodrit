import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import { getAllProjects } from '../actions/projectActions';
import Filter from './filter';
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
            isFetching: true,
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
            }
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
    filterBy(filteredData) {

        switch (filteredData) {
            case 0: this.setState({ pending: !this.state.pending });
                break;
            case 1: this.setState({ resent: !this.state.resent });
                break;
            case 2: this.setState({ approved: !this.state.approved });
                break;
        }

        this.props.getAllProjects(this.state.pageSize, this.state.pageNumber, this.state.filters);
    }
    render() {
        return (
            <div className="projects">
                <h2>Verkefnastýring</h2>
                <SearchBar />
                <Filter filters={this.state.filterProperties} filterBy={(filter) => this.filterBy(filter)} />
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
