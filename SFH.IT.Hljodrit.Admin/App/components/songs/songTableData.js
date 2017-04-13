const songTableData = {
    name: { value: 'Nafn', formatter: undefined, sortable: true, width: '30%' },
    role: { value: 'Hlutverk', formatter: (cell) => { return cell; }, sortable: false, width: '25%' },
    instruments: { value: 'Hljóðfæri', formatter: (cell) => { return cell; }, sortable: false, width: '30%' },
    points: { value: 'Punktar', formatter: undefined, sortable: true, width: '10%' },
    action: { value: '', formatter: (cell) => { return cell; }, sortable: false, width: '5%', dataAlign: 'center' }
};

export default songTableData;
