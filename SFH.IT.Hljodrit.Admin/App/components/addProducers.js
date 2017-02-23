import React from 'react';
import ModalSteps from './modalSteps';

export default class AddProducers extends React.Component {
    render() {
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={4} />
                <h4>Skrá framleiðendur</h4>
                <div className="btn-group pull-right">
                    <button 
                        className="btn btn-default"
                        onClick={() => this.props.back()}>Til baka</button>
                    <button 
                        className="btn btn-default btn-primary" 
                        onClick={() => this.props.next(this.state)}>Áfram
                    </button>
                </div>
            </div>
        );
    }
}