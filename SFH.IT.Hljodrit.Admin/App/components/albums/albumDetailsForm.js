import React, {PropTypes} from 'react';
import Table from './../common/table';
import {data, tableKey} from './albumTableData';

const AlbumDetailsForm = ({album, songs, countryOptions}) => {
    console.log(songs);
    validateAlbum(album);
    return (
        <div>
            <div>
            <form>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Plötuheiti</label>
                        <input type="text" className="form-control"
                            value={album.albumTitle}/>
                    </div>
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Aðalflytjandi</label>
                        <input type="text" className="form-control"
                            value={album.mainArtistName}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Útgefandi</label>
                        <input type="text" className="form-control"
                            value={album.publisher}/>
                    </div>
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Label</label>
                        <select className="form-control"
                            value={album.label}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Framleiðsluland</label>
                        <select className="form-control"
                            value={album.countryOfProduction}>
                            {countryOptions()}
                        </select>
                    </div>
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Útgáfuland</label>
                        <select className="form-control"
                            value={album.countryOfPublication}>
                            {countryOptions()}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary pull-right">Vista</button>
            </form>
            </div>
            <div>
                <h3>Lög</h3>
                debugger;
                <Table tableKey={tableKey} tableData={data} objects={songs} />
            </div>
        </div>
    );
};

function validateAlbum(album) {
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

AlbumDetailsForm.propTypes = {
    album: PropTypes.object.isRequired
};

export default AlbumDetailsForm;
