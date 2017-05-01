const ProjectDetailsTrackTableData = {
    trackOrder: {
        value: 'Nr.',
        sortable: true,
        width: '10%'
    },
    trackName: {
        value: 'Nafn',
        formatter: (cell) => { return cell; },
        sortable: true,
        sortFunc: (a, b, order) => {
            let first = a.trackName.props.children;
            let second = b.trackName.props.children;
            if (order === 'desc') {
                return first.localeCompare(second);
            } else {
                return second.localeCompare(first);
            }
        },
        width: '35%'
    },
    isrc: {
        value: 'ISRC',
        sortable: true,
        width: '35%'
    },
    duration: {
        value: 'Lengd',
        sortable: true,
        width: '20%'
    }
}

export default ProjectDetailsTrackTableData;