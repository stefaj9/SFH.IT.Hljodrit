import React from 'react';
import Table from './../common/table';
import albumTableData from './albumTableData';

class AlbumDetailsForm extends React.Component {

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.setState({
            countryOfPublication: newProps.album.countryOfPublication,
            countryOfProduction: newProps.album.countryOfProduction,
            label: newProps.album.label,
            albumTitle: newProps.album.albumTitle,
            mainArtistName: newProps.album.mainArtistName,
            publisher: newProps.album.publisher,
        });
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            albumTitle: '',
            mainArtistName: '',
            publisher: '',
            countryOfPublication: '',
            countryOfProduction: '',
            label: ''
        }
    }

    validateAlbum(album) {
        if (!album.label) {
            album.label = 'ekki skráð';
        }
        if (!album.mainArtistName) {
            album.mainArtistName = 'ekki skráð';
        }
        if (!album.publisher) {
            album.publisher ='ekki skráð';
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Plötuheiti</label>
                            <input type="text" className="form-control"
                                value={this.state.albumTitle}
                                onChange={(e) => this.setState({albumTitle: e.target.value})}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Aðalflytjandi</label>
                            <input type="text" className="form-control"
                                value={this.state.mainArtistName}
                                onChange={(e) => this.setState({mainArtistName: e.target.value})}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Útgefandi</label>
                            <input type="text" className="form-control"
                                value={this.state.publisher}
                                onChange={(e) => this.setState({publisher: e.target.value})}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Label</label>
                                <input type="text" className="form-control"
                                    value={this.state.label}
                                    onChange={(e) => this.setState({label: e.target.value})}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Framleiðsluland</label>
                            <select className="form-control"
                                onChange={(e) => this.setState({countryOfProduction: e.target.value})}
                                value={this.state.countryOfProduction}>
                                {this.props.countryOptions()}
                            </select>
                        </div>
                        <div className="col-xs-12 col-sm-6 form-group">
                            <label>Útgáfuland</label>
                            <select className="form-control"
                                value={this.state.countryOfPublication}>
                                onChange={(e) => this.setState({countryOfProduction: e.target.value})}
                                {this.props.countryOptions()}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary pull-right">Vista</button>
                </form>
                <div>
                    <h3>Lög</h3>
                    <Table tableData={albumTableData} objects={this.props.songs} />
                </div>
            </div>
        );
    }
};

export default AlbumDetailsForm;
