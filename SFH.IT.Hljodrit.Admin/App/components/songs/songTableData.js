const songTableData = {
    name: {
        value: 'Nafn',
        formatter: (cell) => {
            return cell;
        },
        sortable: true,
        sortFunc: (a, b, order) => {
            let first = a.name.props.children;
            let second = b.name.props.children;
            if (order === 'desc') {
                return first.localeCompare(second);
            } else {
                return second.localeCompare(first);
            }
        },
        width: '30%'
    },
    role: {
        value: 'Hlutverk',
        formatter: (cell) => {
            return cell;
        },
        sortable: false,
        width: '25%'
    },
    instruments: {
        value: 'Hljóðfæri',
        formatter: (cell) => {
            return cell;
        },
        sortable: false,
        width: '25%'
    },
    points: {
        value: 'Punktar',
        formatter: undefined,
        sortable: true,
        width: '10%'
    },
    action: {
        value: '',
        formatter: (cell) => {
            return cell;
        },
        sortable: false,
        width: '10%',
        dataAlign: 'center'
    }
};

export default songTableData;