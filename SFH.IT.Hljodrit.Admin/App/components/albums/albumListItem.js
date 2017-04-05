import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';

const AlbumListItem = ({album}) => {
    return (
        <div className={'list well row ' + album.albumTitle}
            onClick={() => browserHistory.push(`/albums/${album.albumId}`)}>
            <div className="list-info col-md-6 col-xs-12">
                <div className="list-name">
                    <div className="title">Plötuheiti:</div>
                    <div className="value">{album.albumTitle}</div>
                </div>
                <div className="list-author">
                    <div className="title">Aðalflytjandi:</div>
                    <div className="value">{album.mainArtistName}</div>
                </div>
                <div className="list-author">
                    <div className="title">Útgáfuár:</div>
                    <div className="value">{album.releaseYear}</div>
                </div>
                <div className="list-author">
                    <div className="title">Fjöldi laga:</div>
                    <div className="value">{album.numberOfTracks}</div>
                </div>
            </div>
        </div>
    );
};

AlbumListItem.propTypes = {
    album: PropTypes.object.isRequired
};

export default AlbumListItem;
