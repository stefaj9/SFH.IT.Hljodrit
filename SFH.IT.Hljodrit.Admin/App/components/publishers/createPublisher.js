import React, {PropTypes} from 'react';

const CreatePublisher = ({publisher, onChange, zipCodes, updateZipAndCity}) => {
    let zipCodeOptions = zipCodes.map((z) => {
        return (
            <option key={z.code} value={z.code} name={z.area}>{`${z.code} ${z.area}`}</option>
        );
    });

    const updateZipField = (e) => {
        let chosenZipCode = e.target.value;
        let newCity = '';

        for (let i = 0; i < zipCodes.length; i++) {
            if (zipCodes[i].code === chosenZipCode) {
                newCity = zipCodes[i].area;
                break;
            }
        }

        updateZipAndCity(chosenZipCode, newCity);
    };

    return (
        <div>
            <h2>Framleiðandi</h2>
            <div>
                <form>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Nafn</label>
                            <input type="text" className="form-control"
                                   onChange={(e) => onChange('fullName', e.target.value)}
                                   value={publisher.fullName}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Kennitala</label>
                            <input type="text" className="form-control"
                                   onChange={(e) => onChange('ssn', e.target.value)}
                                   value={publisher.ssn} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Netfang</label>
                            <input type="text" className="form-control"
                                   onChange={(e) => onChange('email', e.target.value)}
                                   value={publisher.email}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Símanúmer</label>
                            <input type="text" className="form-control"
                                   onChange={(e) => onChange('phoneNumber', e.target.value)}
                                   value={publisher.phoneNumber} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Heimilisfang</label>
                            <input type="text" className="form-control"
                                   onChange={(e) => onChange('address', e.target.value)}
                                   value={publisher.address}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Vefsíða</label>
                            <input type="text" className="form-control"
                                   onChange={(e) => onChange('website', e.target.value)}
                                   value={publisher.website}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label htmlFor="">Staður</label>
                            <select value={publisher.zipCode} className="form-control"
                                    onChange={e => updateZipField(e)} >
                                <option value=""> Ekki skráð </option>
                                {zipCodeOptions}
                            </select>
                        </div>
                    </div>
                    <h3>Tengiliður</h3>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Nafn</label>
                            <input type="text" className="form-control"
                                   onChange={(e) => onChange('mainContactName', e.target.value)}
                                   value={publisher.mainContactName}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Símanúmer</label>
                            <input type="text" className="form-control"
                                   onChange={(e) => onChange('mainContactPhoneNumber', e.target.value)}
                                   value={publisher.mainContactPhoneNumber} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Netfang</label>
                            <input type="text" className="form-control"
                                   onChange={(e) => onChange('mainContactEmail', e.target.value)}
                                   value={publisher.mainContactEmail}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

CreatePublisher.propTypes = {
    publisher: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    zipCodes: PropTypes.array.isRequired
};

export default CreatePublisher;