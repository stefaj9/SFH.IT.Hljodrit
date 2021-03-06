import React from 'react';

export default class ModalSteps extends React.Component {
    renderSteps() {
        return this.props.steps.map((step, idx) => {
            let stepClass = '';
            if (idx + 1 > this.props.currentStep) {
                stepClass = 'step-unfinished';
            } else if (idx + 1 < this.props.currentStep) {
                stepClass = 'step-finished';
            } else {
                stepClass = 'step-current';
            }
            return (
                <div key={step.name} className={'text-center step ' + stepClass}>
                    <div className="icon"><i className={step.class + ' fa-2x'}></i></div>
                    <div className="step-title hidden-xs hidden-sm">{step.name}</div>
                </div>
            );
        });
    }
    render() {
        return (
            <div className="steps-wrapper">
                {this.renderSteps()}
            </div>
        );
    }
}