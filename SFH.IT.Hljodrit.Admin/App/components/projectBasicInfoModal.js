import React from 'react';

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
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <form action="" className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="project-name">Plötuheiti:</label>
                        <input type="text" id="project-name" name="project-name" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="project-type">Tegund plötu:</label>
                        <select className="form-control" name="project-type" id="project-type">{this.populateOptions()}</select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="project-mainartist">Aðalflytjandi:</label>
                        <input type="text" id="project-mainartist" name="project-mainartist" className="form-control"/>
                    </div>
                </form>
            </div>
        );
    }
}