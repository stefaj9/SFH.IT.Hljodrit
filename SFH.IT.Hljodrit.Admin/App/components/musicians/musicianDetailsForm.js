import React from 'react';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';

class MusicianDetailsForm extends React.Component {
    componentWillReceiveProps(newProps) {
        if (_.keys(newProps.musician).length > 0) {
            let musician = _.cloneDeep(newProps.musician);
            if (musician.ssn.length === 10) {
                musician.ssn = `${musician.ssn.slice(0, 6)}-${musician.ssn.slice(6)}`;
            }
            this.setState({ currentMusician: musician });
        }
    }
    constructor() {
        super();
        this.state = {
            currentMusician: {
                fullName: '',
                ssn: '',
                postalAddressLine1: '',
                zipCode: '',
                website: '',
                area: '',
                email: '',
                isDeceased: false,
                countryCode: '',
                mobileNumber: ''
            }
        };
    }
    onInputChange(e, prop) {
        let currentMusician = _.cloneDeep(this.state.currentMusician);
        currentMusician[prop] = e.target.value;
        this.setState({ currentMusician: currentMusician });
    }
    onSsnChange(e) {
        let value = e.target.value;
        if (value.length > 11) {
            return;
        }
        let currentMusician = _.cloneDeep(this.state.currentMusician);
        let oldLength = currentMusician.ssn.length;

        if (oldLength < value.length && value.length === 6) {
            currentMusician.ssn = `${value}-`;
        } else if (oldLength > value.length && oldLength === 7) {
            currentMusician.ssn = value.slice(0, -1);
        } else {
            currentMusician.ssn = value;
        }

        this.setState({ currentMusician: currentMusician });
    }
    onCheckChange(e, prop) {
        let currentMusician = _.cloneDeep(this.state.currentMusician);
        currentMusician[prop] = e.target.checked;
        this.setState({ currentMusician: currentMusician });
    }
    onSubmit(e) {
        e.preventDefault();
        if (!this.isSsnValid() && !this.isMobileValid()) {
            toastr.error('Villa!', 'Kennitala og símanúmerið er ekki á réttu formi.');
            return;
        }
        if (!this.isSsnValid()) {
            toastr.error('Villa!', 'Kennitala er ekki á réttu formi.');
            return;
        }
        if (!this.isMobileValid()) {
            toastr.error('Villa!', 'Símanúmer er ekki á réttu formi.');
            return;
        }
        this.props.updateMusician(this.state.currentMusician);
    }
    isSsnValid() {
        return this.state.currentMusician.ssn.match(/^([0-9]{6}-[0-9]{4})|(^$)$/g) !== null;
    }
    isMobileValid() {
        return this.state.currentMusician.mobileNumber.match(/^[0-9]*$/g) !== null;
    }
    renderZipCodes() {
        return this.props.zipCodes.map((zip) => {
            return (
                <option key={zip.code} value={zip.code}>{`${zip.code} ${zip.area}`}</option>
            );
        });
    }
    renderCountries() {
        return this.props.countries.map((country) => {
            return (
                <option key={country.twoLetterCode} value={country.twoLetterCode}>{country.name}</option>
            );
        });
    }
    render() {
        const currentMusician = this.state.currentMusician;
        return (
            <form action="" method="POST" onSubmit={(e) => this.onSubmit(e)}>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label htmlFor="musician-detail-name">Nafn</label>
                            <input type="text" value={currentMusician.fullName} onChange={(e) => this.onInputChange(e, 'fullName')} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="musician-detail-ssn">Kennitala</label>
                            <input type="text" value={currentMusician.ssn} onChange={(e) => this.onSsnChange(e)} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="musician-detail-address">Heimilisfang</label>
                            <input type="text" value={currentMusician.postalAddressLine1} onChange={(e) => this.onInputChange(e, 'postalAddressLine1')} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="musician-detail-postal">Póstnúmer</label>
                            <select className="form-control" value={currentMusician.zipCode} onChange={(e) => this.onInputChange(e, 'zipCode')}>
                                {this.renderZipCodes()}
                            </select>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className={'form-group' + (currentMusician.zipCode === '0' || currentMusician.zipCode === '' ? '' : ' hidden')}>
                            <label htmlFor="musician-detail-city">Staður</label>
                            <input type="text" value={currentMusician.area} onChange={(e) => this.onInputChange(e, 'area')} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="musician-detail-country">Land</label>
                            <select className="form-control" value={currentMusician.countryCode} onChange={(e) => this.onInputChange(e, 'countryCode')}>
                                {this.renderCountries()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="musician-detail-website">Vefsíða</label>
                            <input type="text" value={currentMusician.website} onChange={(e) => this.onInputChange(e, 'website')} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="musician-detail-email">Netfang</label>
                            <input type="email" value={currentMusician.email} onChange={(e) => this.onInputChange(e, 'email')} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="musician-detail-mobile">Símanúmer</label>
                            <input type="text" value={currentMusician.mobileNumber} onChange={(e) => this.onInputChange(e, 'mobileNumber')} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Látinn?</label>
                            <div>
                                <input type="checkbox" checked={currentMusician.isDeceased} onChange={(e) => this.onCheckChange(e, 'isDeceased')} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 text-right">
                        <button type="submit" className="btn btn-default btn-primary">Vista</button>
                    </div>
                </div>
            </form>
        );
    }
}

MusicianDetailsForm.propTypes = {
    musician: React.PropTypes.object.isRequired,
    updateMusician: React.PropTypes.func.isRequired,
    zipCodes: React.PropTypes.array.isRequired,
    countries: React.PropTypes.array.isRequired
};

export default MusicianDetailsForm;