const myProjectTableData = {
    projectName: { 
        value: 'Heiti', 
        formatter: (cell) => { return cell; }, 
        sortable: true,
        sortFunc: (a, b, order) => {
            let first = a.projectName.props.children;
            let second = b.projectName.props.children;
            if (order === 'desc') {
                return first.localeCompare(second);
            } else {
                return second.localeCompare(first);
            }
        },
        width: '30%'
    },
    mainArtist: {
        value: 'Aðalflytjandi',
        sortable: true,
        width: '30%'
    },
    lastModificationDate: {
        value: 'Síðast uppfært',
        sortable: true,
        width: '20%'
    },
    projectStatusName: {
        value: 'Staða',
        sortable: true,
        width: '20%'
    }
};

export default myProjectTableData;