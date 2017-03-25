import React from 'react';
import { connect } from 'react-redux';
import ModalSteps from '../common/modalSteps';
import _ from 'lodash';

class OverviewProject extends React.Component {
    renderPerformers(performers) {
        return performers.map((performer) => {
            const { id, name, instruments, role } = performer;
            let renderInstrument = _.join(instruments, ', ');
            return (
                <tr key={`${name}-${id}-${role}`}>
                    <td>{name}</td>
                    <td>{renderInstrument}</td>
                    <td>{role.name}</td>
                </tr>
            );
        });
    }
    renderSongs(songs) {
        return songs.map((song) => {
            const { number, name, length, performers } = song;
            return (
                <div key={`${number}-${name}`}>
                    <div className="song-info">{`${number}. ${name} - (${length})`}</div>
                    <table className="table table-default table-responsive">
                          <thead>
                              <tr>
                                  <th>Nafn</th>
                                  <th>Hljóðfæri</th>
                                  <th>Hlutverk</th>
                              </tr>
                          </thead>
                          <tbody>
                              {this.renderPerformers(performers)}
                          </tbody>
                      </table>
                </div>
            );
        });
    }
    render() {
        const { basicInfo, publisher, songs } = this.props.project;
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={5} />
                <h4>Staðfesting</h4>
                <div className="confirmation-wrapper">
                    <div className="confirmation-item row">
                        <div className="col-xs-12 col-sm-6 confirmation-item-title">Plötuheiti</div>
                        <div className="col-xs-12 col-sm-6 confirmation-item-text">{basicInfo.projectName}</div>
                    </div>
                    <div className="confirmation-item row">
                        <div className="col-xs-12 col-sm-6 confirmation-item-title">Plötutegund</div>
                        <div className="col-xs-12 col-sm-6 confirmation-item-text">{basicInfo.projectType}</div>
                    </div>
                    <div className="confirmation-item row">
                        <div className="col-xs-12 col-sm-6 confirmation-item-title">Aðalflytjandi</div>
                        <div className="col-xs-12 col-sm-6 confirmation-item-text">{basicInfo.projectMainArtist.name}</div>
                    </div>
                    <div className="confirmation-item row">
                        <div className="col-xs-12 confirmation-item-title">Lög</div>
                        <div className="col-xs-12 confirmation-item-table">{this.renderSongs(songs)}</div>
                    </div>
                    <div className="confirmation-item row">
                        <div className="col-xs-12 confirmation-item-title">Útgefandi</div>
                        <div className="col-xs-12 confirmation-item-text">{`${publisher.name} (${publisher.label})`}</div>
                    </div>
                </div>
                <div className="btn-group pull-right">
                    <button 
                        className="btn btn-default"
                        onClick={() => this.props.back()}>
                        Til baka
                    </button>
                    <button 
                        className="btn btn-default btn-primary" 
                        onClick={() => this.props.next(this.props.project)}>
                        Staðfesta
                    </button>
                </div>
            </div>
        );
    }
}

export default connect((state) => { return { project: state.project.selectedProject } }, null)(OverviewProject);