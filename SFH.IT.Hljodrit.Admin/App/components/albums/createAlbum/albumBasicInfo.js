import React from 'react';
import { connect } from 'react-redux';
import ModalSteps from '../../common/modalSteps';
import { getMainArtistsByCriteria } from '../../../actions/mainArtistActions';
import { isFetchingList, hasStoppedFetchingList } from '../../../actions/flowActions';
import { toastr } from 'react-redux-toastr';
import SelectPersonModal from '../../project/selectPersonModal';

class AlbumBasicInfo extends React.Component {
    constructor() {
        super();

        this.state = {
            albumName: '',
            albumType: {
                id: 1,
                value: 'Venjuleg plata'
            },
            albumYearOfPublish: '',
            albumCountryOfPublish: {
                code: 'IS',
                name: 'Ísland'
            },
            albumMainArtist: {
                id: -1,
                name: ''
            },
            mainArtistModalIsOpen: false
        };
    }
    populateOptions() {
        let options = [{ id: 1, value: 'Venjuleg plata' }, { id: 2, value: 'Safnplata' }, { id: 3, value: 'Single' }];
        return options.map((option) => {
            return (
                <option key={option.id} value={option.id}>{option.value}</option>
            );
        });
    }
    populateCountryOptions() {
        return this.props.countries.map((country) => {
            return (
                <option key={country.numericIsoCode} value={country.twoLetterCode}>{country.name}</option>
            );
        });
    }
    updateCountry(e) {
        let code = e.target.value;
        let name = e.target.options[e.target.selectedIndex].text;

        this.setState({
            albumCountryOfPublish: {
                code: code,
                name: name
            }
        });
    }
    isValid() {
        const { albumType, albumName, albumMainArtist, albumYearOfPublish } = this.state;
        return albumType.id === 1 ? albumName.length > 0 && albumMainArtist.id !== -1 && albumYearOfPublish !== '' : albumName.length > 0 && albumYearOfPublish !== '';
    }
    submitBasicInfo(e) {
        e.preventDefault();
        this.props.next(this.state);
    }
    addMainArtist(artist) {
        this.setState({
            albumMainArtist: artist
        });
        toastr.success('Tókst!', 'Það tókst að bæta við aðalflytjanda');
    }
    removeMainArtist(e) {
        e.preventDefault();
        this.setState({
            albumMainArtist: {
                id: -1,
                name: ''
            }
        });
        toastr.success('Tókst!', 'Það tókst að fjarlægja aðalflytjanda');
    }
    selectAlbumType(e) {
        let index = e.target.selectedIndex;
        this.setState({
            albumType: {
                id: parseInt(e.target.value),
                value: e.target.options[index].text
            }
        });
    }
    render() {
        const { albumType, albumName, albumMainArtist, mainArtistModalIsOpen, albumYearOfPublish, albumCountryOfPublish } = this.state;
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={1} />
                <h4>Grunnupplýsingar</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="album-name">Plötuheiti:</label>
                        <input 
                            autoFocus={true}
                            type="text" 
                            value={albumName} 
                            onChange={(e) => this.setState({ albumName: e.target.value })} 
                            id="album-name" 
                            name="album-name" 
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="album-type">Tegund plötu:</label>
                        <select 
                            className="form-control" 
                            name="album-type" 
                            id="album-type" 
                            value={albumType.id} 
                            onChange={(e) => this.selectAlbumType(e) }>
                                {this.populateOptions()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="album-publish-year">Útgáfuár:</label>
                        <input 
                            type="number"
                            className="form-control"
                            name="album-publish-year"
                            id="album-publish-year"
                            value={albumYearOfPublish}
                            onChange={(e) =>  this.setState({ albumYearOfPublish: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="album-publish-country">Útgáfuland:</label>
                        <select 
                            name="album-publish-country" 
                            id="album-publish-country" 
                            className="form-control"
                            value={albumCountryOfPublish.code}
                            onChange={(e) => this.updateCountry(e)}>
                            {this.populateCountryOptions()}
                        </select>
                    </div>
                    <div className={albumType.id === 1 ? 'form-group' : 'hidden'}>
                        <div className={albumMainArtist.id === -1 ? 'hidden' : ''}>
                            <table className="table table-default table-striped table-responsive">
                                <thead>
                                    <tr>
                                        <th>Nafn</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{albumMainArtist.name}</td>
                                        <td><a href="#" onClick={(e) => this.removeMainArtist(e) }><i className="fa fa-times"></i></a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className={albumMainArtist.id !== -1 ? 'hidden' : ''}>Gerð er krafa um að það sé skráður aðalflytjandi á plötuna.</p>
                        <div className="form-group">
                            <button 
                                className="btn btn-default"
                                disabled={albumMainArtist.id !== -1}
                                onClick={(e) => { e.preventDefault(); this.setState({ mainArtistModalIsOpen: true }) } }> <i className="fa fa-fw fa-plus"></i> Bæta við aðalflytjanda</button>
                        </div>
                    </div>
                    <div className="form-group pull-right">
                        <button 
                            className="btn btn-default btn-primary" 
                            onClick={(e) => this.submitBasicInfo(e)}
                            disabled={!this.isValid()} >
                            Áfram
                        </button>
                    </div>
                </form>
                <SelectPersonModal
                    isOpen={mainArtistModalIsOpen}
                    close={() => this.setState({ mainArtistModalIsOpen: false })}
                    registerPath="/api/mainartists"
                    envelope={this.props.mainArtistEnvelope}
                    fetch={this.props.getMainArtistsByCriteria}
                    beginFetch={this.props.isFetchingList}
                    stoppedFetch={this.props.hasStoppedFetchingList}
                    next={() => this.setState({ mainArtistModalIsOpen: false })}
                    update={(artist) => this.addMainArtist(artist)}
                    steps={() => { return ( <h4>Bæta við aðalflytjanda</h4> ) } } />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        mainArtistEnvelope: state.mainArtist.mainArtistEnvelope,
        countries: state.common.countries
    };
};

export default connect(mapStateToProps, { getMainArtistsByCriteria, isFetchingList, hasStoppedFetchingList })(AlbumBasicInfo);