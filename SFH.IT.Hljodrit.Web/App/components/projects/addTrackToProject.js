import React from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import { Tabs, Tab } from 'react-bootstrap';
import moment from 'moment';

class AddTrackToProject extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 1,
            currentSongName: '',
            currentFullSongLength: moment(new Date(2017, 1, 1, 0, 0, 0, 0)),
            currentSongLength: '',
            currentSongIsrc: ''
        };
    }
    addSongLength(value) {
        if (moment(value).isValid()) {
            this.setState({
                currentSongLength: moment(value).format('HH:mm:ss'),
                currentFullSongLength: moment(value)
            }, this.assignAddFunction());
        }
    }
    handleInput(prop, value) {
        this.setState({
            [prop]: value
        }, this.assignAddFunction());
    }
    assignAddFunction() {
        const { currentSongName, currentSongLength, currentSongIsrc } = this.state;
        this.props.addFunction({ 
            projectId: this.props.projectId, 
            trackName: currentSongName,
            isrc: currentSongIsrc,
            duration: currentSongLength,
            trackOrder: this.props.nextSongNumber
        });
    }
    render() {
        return (
            <Tabs 
                id="add-song-tabs"
                activeKey={this.state.selectedTab} 
                onSelect={(key) => this.setState({ selectedTab: key })}>
                <Tab eventKey={1} title="Nýskrá">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="song-name">Nafn lags:</label>
                            <input 
                                tabIndex="1"
                                name="song-name"
                                id="song-name"
                                autoFocus={true}
                                type="text" 
                                placeholder="Skráðu inn nafn lags.." 
                                className="form-control" 
                                value={this.state.currentSongName}
                                onChange={(e) => this.handleInput('currentSongName', e.target.value)} />
                        </div>
                        <div className="form-group row">
                            <div className="col-xs-12">
                                <label htmlFor="">Lengd lags:</label>
                                <TimePicker
                                    showSecond={true}
                                    value={this.state.currentFullSongLength}
                                    defaultValue={moment(new Date(2017, 1, 1, 0, 0, 0, 0))}
                                    onChange={this.addSongLength.bind(this)} />
                            </div>
                        </div>
                    </form>
                </Tab>
                <Tab eventKey={2} title="Leita">
                </Tab>
            </Tabs>
        );
    }
};

AddTrackToProject.propTypes = {
    projectId: PropTypes.string.isRequired,
    addFunction: PropTypes.func.isRequired,
    nextSongNumber: PropTypes.number.isRequired
};

export default AddTrackToProject;