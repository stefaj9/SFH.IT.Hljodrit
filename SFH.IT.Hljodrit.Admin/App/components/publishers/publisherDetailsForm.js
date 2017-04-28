import React from 'react';

const PublisherDetailsForm = ({name, ssn, zipCodes, address, zipCode, mainContactName,
mainContactEmail, mainContactPhone, updatePublisherField, selectedPublisherHasChanged,
updateSelectedPublisher}) => {
    let zipCodeOptions = zipCodes.map((z) => {
        return (
            <option key={z.code} value={z.code} name={z.area}>{`${z.code} ${z.area}`}</option>
        );
    });

    const updateZipField = (e) => {
        console.log(e.target);
        updatePublisherField('zip', e.target.value);
        updatePublisherField('city', e.target.name);
    };

    return (
        <div>
            <form>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Nafn</label>
                        <input type="text" className="form-control"
                               onChange={(e) => updatePublisherField('fullName', e.target.value)}
                               value={name}/>
                    </div>
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Kennitala</label>
                        <input type="text" className="form-control"
                               onChange={(e) => updatePublisherField('ssn', e.target.value)}
                               value={ssn} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Heimilisfang</label>
                        <input type="text" className="form-control"
                               onChange={(e) => updatePublisherField('address', e.target.value)}
                               value={address} />
                    </div>
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label htmlFor="">Staður</label>
                        <select value={zipCode} name="" id="" className="form-control"
                                onChange={e => updateZipField(e)} >
                            <option value="-1"> Ekki skráð </option>
                            {zipCodeOptions}
                        </select>
                    </div>
                </div>
                <div>
                    <h3>Tengiliður</h3>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-4 form-group">
                        <label>Nafn</label>
                        <input type="text" className="form-control"
                               onChange={(e) => updatePublisherField('mainContactName', e.target.value)}
                               value={mainContactName}/>
                    </div>
                    <div className="col-xs-12 col-sm-4 form-group">
                        <label>Netfang</label>
                        <input type="text" className="form-control"
                               onChange={(e) => updatePublisherField('mainContactEmail', e.target.value)}
                               value={mainContactEmail}>
                        </input>
                    </div>
                    <div className="col-xs-12 col-sm-4 form-group">
                        <label>Sími</label>
                        <input type="text" className="form-control"
                               onChange={(e) => updatePublisherField('mainContactPhone', e.target.value)}
                               value={mainContactPhone}>
                        </input>
                    </div>
                </div>
                <button type="submit" className="btn btn-default btn-primary pull-right"
                        disabled={!selectedPublisherHasChanged}
                        onClick={(e) => updateSelectedPublisher(e)}>
                    Vista
                </button>
            </form>
        </div>
    )
};

export default PublisherDetailsForm;