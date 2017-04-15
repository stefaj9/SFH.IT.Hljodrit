import React from 'react';
import _ from 'lodash';

class MusicianDetailsForm extends React.Component {
    componentWillReceiveProps(newProps) {
        if (_.keys(newProps.musician).length > 0) {
            let musician = _.cloneDeep(newProps.musician);
            musician.ssn = `${musician.ssn.slice(0, 6)}-${musician.ssn.slice(6)}`;
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
                countryCode: ''
            }
        };
    }
    onInputChange(e, prop) {
        let currentMusician = _.cloneDeep(this.state.currentMusician);
        currentMusician[prop] = e.target.value;
        this.setState({ currentMusician: currentMusician });
    }
    onSsnChange(e) {
        if (e.target.value.length > 11) {
            return;
        }
        let currentMusician = _.cloneDeep(this.state.currentMusician);
        let oldLength = currentMusician.ssn.length;

        if (oldLength < e.target.value.length && e.target.value.length === 6) {
            currentMusician.ssn = `${e.target.value}-`;
        } else if (oldLength > e.target.value.length && oldLength === 7) {
            currentMusician.ssn = e.target.value.slice(0, -1);
        } else {
            currentMusician.ssn = e.target.value;
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
        this.props.updateMusician(this.state.currentMusician);
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
                        <div className={'form-group' + (currentMusician.zipCode === '0' ? '' : ' hidden')}>
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