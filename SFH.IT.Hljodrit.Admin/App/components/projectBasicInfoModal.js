import React from 'react';
import Modal from 'react-modal';
import ModalSteps from './modalSteps';

export default class ProjectBasicInfoModal extends React.Component {
    constructor() {
        super();

        this.state = {
            projectName: '',
            projectType: '',
            projectMainArtist: ''
        };
    }
    populateOptions() {
        // TODO: Populate with real data
        let options = ['Venjuleg plata', 'Safnplata', 'Single'];
        return options.map((option, idx) => {
            return (
                <option key={`${option}-${idx}`} value={idx}>{option}</option>
            );
        });
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                className="modal-window"
                overlayClassName="modal-overlay"
                contentLabel="Modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header"><ModalSteps steps={this.props.steps} currentStep={1} /></div>
                        <div className="modal-body">
                            <form action="" className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="project-name">Plötuheiti:</label>
                                    <input 
                                        type="text" 
                                        value={this.state.projectName} 
                                        onChange={(e) => this.setState({ projectName: e.target.value })} 
                                        id="project-name" 
                                        name="project-name" 
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="project-type">Tegund plötu:</label>
                                    <select 
                                        className="form-control" 
                                        name="project-type" 
                                        id="project-type" 
                                        value={this.state.projectType} 
                                        onChange={(e) => this.setState({ projectType: e.target.value })}>
                                            {this.populateOptions()}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="project-mainartist">Aðalflytjandi:</label>
                                    <input 
                                        type="text" 
                                        id="project-mainartist" 
                                        name="project-mainartist" 
                                        className="form-control"
                                        value={this.state.projectMainArtist}
                                        onChange={(e) => this.setState({ projectMainArtist: e.target.value })} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-default btn-primary" onClick={() => this.props.next(this.state)}>Áfram</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}