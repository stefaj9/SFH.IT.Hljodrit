import React from 'react';
import Spinner from 'react-spinner';

const AlbumDetailsForm = ({hasFetched, album, updateAlbumField, openModal, getMainArtistsByCriteria,
                           updateMainArtist, getPublishersByCriteria, updatePublisher,
        populateLabelOptions, countryOptions, updateSelectedAlbum, selectedAlbumHasChanged}) => {
    return (
        <div>
            <Spinner className={!hasFetched ? '' : 'hidden'} />
             <form>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Plötuheiti</label>
                        <input type="text" className="form-control"
                            value={album.albumTitle}
                            onChange={(e) => updateAlbumField('albumTitle', e.target.value)}/>
                    </div>
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Aðalflytjandi</label>
                        <div className="input-group">
                            <input type="text" className="form-control"disabled="true"
                                value={album.mainArtistName}
                                />
                                <div className="input-group-btn">
                                    <button type="button" className="btn btn-primary"
                                        onClick={() => openModal(getMainArtistsByCriteria, 'Breyta aðalflytjanda', updateMainArtist)}>
                                        Breyta
                                    </button>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Útgefandi</label>
                        <div className="input-group">
                            <input type="text" className="form-control" disabled="true"
                                value={album.publisher}/>
                            <div className="input-group-btn">
                                <button type="button" className="btn btn-primary"
                                    onClick={() => openModal(getPublishersByCriteria,'Breyta útgefanda',
                                                        updatePublisher)}>
                                    Breyta
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Label</label>
                            <select value={album.labelId} className="form-control"
                                onChange={(e) => updateAlbumField('labelId', e.target.value)}>
                                <option value="-1"> Ekki skráð </option>
                                {populateLabelOptions()}
                            </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Framleiðsluland</label>
                        <select className="form-control"
                            onChange={(e) => updateAlbumField('countryOfProduction', e.target.value)}
                            value={album.countryOfProduction}>
                            {countryOptions()}
                        </select>
                    </div>
                    <div className="col-xs-12 col-sm-6 form-group">
                        <label>Útgáfuland</label>
                        <select className="form-control"
                            onChange={(e) => updateAlbumField('countryOfPublication', e.target.value)}
                            value={album.countryOfPublication}>
                            {countryOptions()}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-default btn-primary pull-right"
                    disabled={!selectedAlbumHasChanged}
                    onClick={(e) => updateSelectedAlbum(e)}>
                    Vista
                </button>
            </form>
        </div>
    );
};

export default AlbumDetailsForm;
