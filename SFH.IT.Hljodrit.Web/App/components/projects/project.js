import React from 'react';
import MyProjects from './myProjects';
import { browserHistory } from 'react-router';

export default class Project extends React.Component {
    render() {
        return (
            <div>
                <h2>Verkefnin mín</h2>
                <div className="row">
                    <div className="col-xs-12 text-right">
                        <button 
                            className="btn btn-default btn-primary btn-lg text-right"
                            onClick={() => browserHistory.push('/app/projects/createproject')}>Búa til nýtt verkefni</button>
                    </div>
                </div>
                <MyProjects projects={[]} />
            </div>
        );
    }
}