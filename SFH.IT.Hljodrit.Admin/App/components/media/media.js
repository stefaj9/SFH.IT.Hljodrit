import React from 'react';
import { connect } from 'react-redux';
import { getMediaRecordingsByCriteria } from '../../actions/songActions';
import Table from '../common/table';
import mediaTableData from './mediaTableData';
import Spinner from 'react-spinner';

class Media extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h1>Hljóðrit</h1>
                <Table tableData={mediaTableData} objects={this.props.mediaEnvelope.objects} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.songs.isFetching,
        mediaEnvelope: state.songs.mediaRecordingEnvelope
    }
}

export default connect(mapStateToProps, { getMediaRecordingsByCriteria }) (Media);