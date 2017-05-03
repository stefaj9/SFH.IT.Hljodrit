import React from 'react';
import PropTypes from 'prop-types';

const Steps = ({ steps, currentStep }) => {
    function renderSteps() {
        return steps.map((step, idx) => {
            let stepClass = '';
            if (idx + 1 > currentStep) {
                stepClass = 'step-unfinished';
            } else if (idx + 1 < currentStep) {
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
    return (
        <div className="steps-wrapper">{renderSteps()}</div>
    );
};

Steps.propTypes = {
    steps: PropTypes.array.isRequired,
    currentStep: PropTypes.number.isRequired
};

export default Steps;