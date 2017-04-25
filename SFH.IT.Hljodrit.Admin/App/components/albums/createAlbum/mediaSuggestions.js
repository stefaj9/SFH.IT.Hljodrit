import React from 'react';
import Spinner from 'react-spinner';
import moment from 'moment';

const MediaSuggestions = ({ media, isFetching, songs, addSongToList }) => {
    const renderMediaSuggestions = () => {
        if (!isFetching) {
            if (media.length === 0) {
                return (
                    <h4 className="text-center">Ekkert lag fannst með þessum leitarskilyrðum</h4>
                );
            }
            return media.map((media) => {
                // Only render songs which are NOT in the selected song table.
                if (!_.find(songs, (s) => { return s.id === media.mediaId })) {
                    return (
                        <div className="well row" key={media.mediaId}>
                            <div className="col-xs-11 song-select-info">
                                <div className="row">
                                    <div className="col-xs-6 text-left">
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <strong>Nafn:</strong>
                                            </div>
                                            <div className="col-xs-7">
                                                {media.mediaTitle}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 text-right">
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <strong>Aðalflytjandi:</strong>
                                            </div>
                                            <div className="col-xs-7">
                                                {media.mainArtist}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6 text-left">
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <strong>Útgáfudagsetning:</strong>
                                            </div>
                                            <div className="col-xs-7">
                                                {(media.releaseDate ? moment(media.releaseDate).format('LL') : 'N/A')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 text-right">
                                        <div className="row">
                                            <div className="col-xs-5">
                                                <strong>Lengd lags:</strong>
                                            </div>
                                            <div className="col-xs-7">
                                                {(media.duration ? media.duration : 'N/A')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div 
                                className="col-xs-1 text-center add-song-plus"
                                onClick={(e) => addSongToList(e, media.mediaId, media.mediaTitle, media.duration, media.isrc, '')}>
                                <i className="fa fa-plus fa-2x"></i>
                            </div>
                        </div>
                    );
                }
            });
        }
    }
    return (
        <div>
            {renderMediaSuggestions()}
            <Spinner className={isFetching ? '' : 'hidden'} />
        </div>
    );
}

MediaSuggestions.propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    media: React.PropTypes.array.isRequired,
    songs: React.PropTypes.array.isRequired,
    addSongToList: React.PropTypes.func.isRequired
};

export default MediaSuggestions;