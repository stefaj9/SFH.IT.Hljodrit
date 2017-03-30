import React, {PropTypes} from 'react';

const AlbumListItem = ({album, onSelect}) => {
    return (
        <div className={'list well row ' + album.albumTitle}>
            <div className="list-info col-md-6 col-xs-12">
                <div className="list-name">
                    <div className="title">Level:</div>
                    <div className="value">{album.albumTitle}</div>
                </div>
                <div className="list-author">
                    <div className="title">Logged:</div>
                    <div className="value">{album.albumTitle}</div>
                </div>
                <div className="list-author">
                    <div className="title">Machine name:</div>
                    <div className="value">{album.albumTitle}</div>
                </div>
                <div className="list-author">
                    <div className="title">Url:</div>
                    <div className="value">{album.albumTitle}</div>
                </div>
            </div>

        </div>
    );
};

AlbumListItem.propTypes = {
    album: PropTypes.object.isRequired,
    //onSelect: PropTypes.func.isRequired
};

export default AlbumListItem;
