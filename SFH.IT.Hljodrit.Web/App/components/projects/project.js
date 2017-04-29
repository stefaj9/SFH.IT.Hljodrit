import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getProjectsForUser } from '../../actions/projectActions';
import Table from '../common/table';
import MyProjectTableData from './myProjectTableData';

class Project extends React.Component {
    componentWillMount() {
        this.props.getProjectsForUser();
    }
    render() {
        return (
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
                <div className="row">
                    <Table
                        tableData={ MyProjectTableData }
                        objects={ this.props.userProjects }
                        refCallback={ (ref) => { return ref; } }
                        isRemote={false}
                        pagination={true} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userProjects: state.project.userProjects
    };
};

export default connect(mapStateToProps, { getProjectsForUser })(Project);