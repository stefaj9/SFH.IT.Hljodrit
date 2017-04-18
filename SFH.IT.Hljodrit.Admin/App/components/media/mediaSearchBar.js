import React from 'react';

const MediaSearchBar = () => {
    return (
        <div className="row song-search-bar">
            <div className="col-xs-8">
                <input
                    onKeyDown={(e) => this.getNewSongs(e)}
                    onChange={(e) => this.setState({ songSearchTerm: e.target.value })}
                    value={this.state.songSearchTerm}
                    type="text"
                    placeholder="Leita.."
                    className="form-control no-border-radius" />
            </div>
            <div className="col-xs-4">
                <select
                    name="song-search-by"
                    id="song-search-by"
                    className="form-control no-border-radius"
                    value={this.state.selectSongFilter}
                    onChange={(e) => this.setState({ selectSongFilter: e.target.value })}>
                    <option value="name">Nafn lags</option>
                    <option value="mainArtist">Aðalflytjandi</option>
                    <option value="publishYear">Útgáfuár</option>
                </select>
            </div>
        </div>
    );
};