import React from 'react';
import ModalSteps from './modalSteps';

export default class OverviewProject extends React.Component {
    render() {
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={5} />
                <h4>Staðfesting</h4>
                <div className="btn-group pull-right">
                    <button 
                        className="btn btn-default"
                        onClick={() => this.props.back()}>Til baka</button>
                    <button 
                        className="btn btn-default btn-primary" 
                        onClick={() => this.props.next(this.state)}>Staðfesta
                    </button>
                </div>
            </div>
        );
    }
}