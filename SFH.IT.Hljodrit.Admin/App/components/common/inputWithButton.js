import React, {PropTypes} from 'react'
import Spinner from 'react-spinner';

const InputWithButton = ({placeHolder, inputValue, onChange, submit, isSubmitting, buttonText}) => {
    return (
        <div className="input-group no-border-radius spacer">
            <input placeholder={placeHolder}
                   type="text"
                   value={inputValue}
                   onChange={onChange}
                   className="form-control" />
            <span onClick={submit}
                  className={'input-group-addon' + (inputValue.length > 0 ? ' background-primary hover-cursor' : '')}>
                <span className={isSubmitting ? 'visibility-hidden' : ''}>
                    <i className="fa fa-fw fa-plus" />
                    {buttonText}
                </span>
                <Spinner className={isSubmitting ? 'spinner-small' : 'hidden'} />
            </span>
        </div>
    );
};

InputWithButton.propTypes = {
    placeHolder: PropTypes.string.isRequired,
    inputValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    buttonText: PropTypes.string.isRequired
};

export default InputWithButton;