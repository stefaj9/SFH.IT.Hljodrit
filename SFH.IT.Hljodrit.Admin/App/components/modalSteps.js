import React from 'react';

export default class ModalSteps extends React.Component {
    renderSteps() {
        return this.props.steps.map((step) => {
            return (
                <div key={step.name} className="text-center col-xs-2">
                    <div className="icon"><i className={step.class + ' fa-2x'}></i></div>
                    <div className="step-title">{step.name}</div>
                </div>
            );
        });
    }
    render() {
        return (
            <div className="steps-wrapper row">
                {this.renderSteps()}
            </div>
        );
    }
}