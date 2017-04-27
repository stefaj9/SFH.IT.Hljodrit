import React from 'react';
import { connect } from 'react-redux';
import Steps from '../../common/steps';

class ProjectOverview extends React.Component {
    renderPerformers(performers) {
        return performers.map((performer) => {
            const { id, name, instrument, role } = performer;
            return (
                <tr key={`${name}-${id}-${role.code}`}>
                    <td>{name}</td>
                    <td>{instrument.instrumentNameIcelandic}</td>
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
                <Steps steps={this.props.steps} currentStep={5} />
                <h4>Staðfesting</h4>
                <div className="confirmation-wrapper">
                    <div className="confirmation-item row">
                        <div className="col-xs-12 col-sm-6 confirmation-item-title">Heiti á verkefni</div>
                        <div className="col-xs-12 col-sm-6 confirmation-item-text">{basicInfo.projectName}</div>
                    </div>
                    <div className="confirmation-item row">
                        <div className="col-xs-12 col-sm-6 confirmation-item-title">Tegund verkefnis</div>
                        <div className="col-xs-12 col-sm-6 confirmation-item-text">{basicInfo.projectType.value}</div>
                    </div>
                    <div className="confirmation-item row">
                        <div className="col-xs-12 col-sm-6 confirmation-item-title">Aðalflytjandi</div>
                        <div className="col-xs-12 col-sm-6 confirmation-item-text">{basicInfo.projectMainArtist.name.length > 0 ? basicInfo.projectMainArtist.name : 'Enginn skráður'}</div>
                    </div>
                    <div className="confirmation-item row">
                        <div className="col-xs-12 col-sm-6 confirmation-item-title">Staða verkefnis</div>
                        <div className="col-xs-12 col-sm-6 confirmation-item-text">{basicInfo.projectStatus.name}</div>
                    </div>
                    <div className="confirmation-item row">
                        <div className="col-xs-12 col-sm-6 confirmation-item-title">Útgáfuár</div>
                        <div className="col-xs-12 col-sm-6 confirmation-item-text">{basicInfo.projectYearOfPublish}</div>
                    </div>
                    <div className="confirmation-item row">
                        <div className="col-xs-12 confirmation-item-title">Lög</div>
                        <div className="col-xs-12 confirmation-item-table">{this.renderSongs(songs)}</div>
                    </div>
                    <div className="confirmation-item row">
                        <div className="col-xs-12 confirmation-item-title">Útgefandi</div>
                        <div className="col-xs-12 confirmation-item-text">{publisher.name}</div>
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

export default connect((state) => { return { project: state.project.projectToCreate } }, null)(ProjectOverview);