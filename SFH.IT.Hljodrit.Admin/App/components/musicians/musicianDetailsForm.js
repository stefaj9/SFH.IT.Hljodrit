import React from 'react';

class MusicianDetailsForm extends React.Component {
    componentWillReceiveProps(newProps) {
        console.log(newProps);
    }
    render() {
        return (
            <form action="" method="POST">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="musician-detail-name">Nafn</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="musician-detail-ssn">Kennitala</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="musician-detail-address">Heimilisfang</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="musician-detail-postal">Póstnúmer</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="musician-detail-city">Staður</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="musician-detail-mobile">Farsími</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="musician-detail-email">Netfang</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

MusicianDetailsForm.propTypes = {
    musician: React.PropTypes.object.isRequired,
    updateMusician: React.PropTypes.func.isRequired
};

export default MusicianDetailsForm;