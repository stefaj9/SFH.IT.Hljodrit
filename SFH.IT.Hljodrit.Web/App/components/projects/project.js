import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getProjectsForUser } from '../../actions/projectActions';
import Table from '../common/table';
import MyProjectTableData from './myProjectTableData';
import Spinner from 'react-spinner';

class Project extends React.Component {
    componentWillMount() {
        this.props.getProjectsForUser();
    }
    render() {
        const { userProjects, isFetchingUserProjects } = this.props;
        return (
            <div>
                <div>
                    <h2>Verkefnin mín</h2>
                    <div className="row">
                        <div className="col-xs-12 text-right">
                            <button 
                                className="btn btn-default btn-primary btn-lg text-right"
                                onClick={() => browserHistory.push('/app/projects/createproject')}> <i className="fa fa-plus fa-fw"></i> Búa til nýtt verkefni</button>
                        </div>
                    </div>
                    <div className="spacer"></div>
                </div>
                <div className={isFetchingUserProjects ? 'hidden' : 'row'}>
                    <Table
                        tableData={ MyProjectTableData }
                        objects={ userProjects }
                        refCallback={ (ref) => { return ref; } }
                        isRemote={false}
                        pagination={true} />
                </div>
                <div className={isFetchingUserProjects ? 'text-center' : 'hidden'}>
                    <Spinner />
                    <p>Sæki verkefnin þín..</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userProjects: state.project.userProjects,
        isFetchingUserProjects: state.project.isFetchingUserProjects
    };
};

export default connect(mapStateToProps, { getProjectsForUser })(Project);