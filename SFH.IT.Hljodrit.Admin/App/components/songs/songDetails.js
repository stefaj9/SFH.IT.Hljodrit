import React from 'react';

const SongDetails = ({ routeParams }) => {
    return (
        <div>
            <h4>SongDetails</h4>
            <p>{routeParams.songId}</p>
        </div>
    );
};

export default SongDetails;