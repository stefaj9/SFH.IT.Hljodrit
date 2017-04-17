const musicianMediaTableData = {
    isrc: { value: 'ISRC', formatter: undefined, sortable: true },
    mediaTitle: { 
        value: 'Heiti', 
        formatter: (cell) => { return cell; }, 
        sortable: true, 
        sortFunc: (a, b, order) => {
            let first = a.mediaTitle.props.children;
            let second = b.mediaTitle.props.children;
            if (order === 'desc') {
                return first.localeCompare(second);
            } else {
                return second.localeCompare(first);
            }
        }
    },
    mainArtist: {
        value: 'Aðalflytjandi', 
        formatter: (cell) => { return cell; }, 
        sortable: true,
        sortFunc: (a, b, order) => {
            let first = a.mainArtist.props.children;
            let second = b.mainArtist.props.children;
            if (order === 'desc') {
                return first.localeCompare(second);
            } else {
                return second.localeCompare(first);
            }
        }
    },
    duration: { value: 'Lengd', formatter: undefined, sortable: true },
    releaseDate: { value: 'Útgáfuár', formatter: undefined, sortable: true },
    roles: { value: 'Hlutverk', formatter: undefined, sortable: true },
    instruments: { value: 'Hljóðfæri', formatter: undefined, sortable: true }
};

export default musicianMediaTableData;