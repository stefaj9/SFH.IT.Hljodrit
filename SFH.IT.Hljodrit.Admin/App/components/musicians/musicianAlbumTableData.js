const musicianAlbumTableData = {
    albumTitle: { value: 'Heiti', formatter: (cell) => { return cell; }, sortable: true },
    releaseYear: { value: 'Útgáfuár', sortable: true },
    numberOfTracks: { value: 'Fjöldi laga', sortable: true },
    mainArtistName: { value: 'Aðalflytjandi', formatter: (cell) => { return cell; }, sortable: true }
};

export default musicianAlbumTableData;