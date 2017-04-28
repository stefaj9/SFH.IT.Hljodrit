import React from 'react';

const PublisherDetailsForm = ({name, ssn, city, address, zipCode, mainContactName,
mainContactEmail, mainContactPhone }) => {
    return (
        <div>
            <div className="row">
                <div className="col-xs-12 col-sm-6 form-group">
                    <label>Nafn</label>
                    <input type="text" className="form-control" disabled="true"
                           value={name}/>
                </div>
                <div className="col-xs-12 col-sm-6 form-group">
                    <label>Kennitala</label>
                    <input type="text" className="form-control" disabled="true"
                           value={ssn} />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-sm-4 form-group">
                    <label>Heimilisfang</label>
                    <input type="text" className="form-control" disabled="true"
                           value={address} />
                </div>
                <div className="col-xs-12 col-sm-4 form-group">
                    <label>Póstnúmer</label>
                    <input type="text" className="form-control" disabled="true"
                           value={zipCode} />
                </div>
                <div className="col-xs-12 col-sm-4 form-group">
                    <label>Staður</label>
                    <input type="text" className="form-control" disabled="true"
                           value={city} />
                </div>
            </div>
            <div>
                <h3>Tengiliður</h3>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-4 form-group">
                    <label>Nafn</label>
                    <input type="text" className="form-control" disabled="true"
                           value={mainContactName}/>
                </div>
                <div className="col-xs-12 col-sm-4 form-group">
                    <label>Netfang</label>
                    <input type="text" className="form-control" disabled="true"
                           value={mainContactEmail}>
                    </input>
                </div>
                <div className="col-xs-12 col-sm-4 form-group">
                    <label>Sími</label>
                    <input type="text" className="form-control" disabled="true"
                           value={mainContactPhone}>
                    </input>
                </div>
            </div>
        </div>
    )
};

export default PublisherDetailsForm;