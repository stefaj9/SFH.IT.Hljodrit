import React from 'react';

class MusicianDetailsForm extends React.Component {
    componentWillReceiveProps(newProps) {
        console.log(newProps);
    }
    render() {
        return (
            <div></div>
        );
    }
}

MusicianDetailsForm.propTypes = {
    musician: React.PropTypes.object.isRequired
};

export default MusicianDetailsForm;