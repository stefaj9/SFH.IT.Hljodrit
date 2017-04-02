import React, {PropTypes} from 'react';
import Spinner from 'react-spinner';
import AlbumListItem from './albumListItem';

// add onSelect
const AlbumListView = ({albums, isFetching}) => {
    const renderAlbums = () => {
        if (!isFetching) {
            return albums.map(album => {
                return (
                    <AlbumListItem key={album.albumId}
                                       album={album}
                                       //onSelect={onSelect}
                                        />
                );
            });
        }
    };

    return (
        <div>
            <Spinner className={isFetching ? '' : 'hidden'} />
            {renderAlbums()}
        </div>
    );
};

AlbumListView.propTypes = {
    albums: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    //onSelect: PropTypes.func.isRequired
};

export default AlbumListView;
