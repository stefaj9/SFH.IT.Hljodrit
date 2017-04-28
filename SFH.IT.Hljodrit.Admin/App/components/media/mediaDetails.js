import React from 'react';
import { connect } from 'react-redux';
import { getMediaById } from '../../actions/songActions';
import { browserHistory} from 'react-router';
import Spinner from 'react-spinner';
import MediaDetailsForm from './mediaDetailsForm';
import Table from '../common/table';
import MediaAppearsOnTableData from './mediaAppearsOnTableData';
import MusiciansAppearsOnTableData from './musiciansAppearsOnTableData';
import ComposersOfMediaTableData from './composersOfMediaTableData';

class MediaDetails extends React.Component {
    componentWillMount() {
        this.props.getMediaById(this.props.routeParams.mediaId);
    }

    constructor(props, context) {
        super(props, context);
    }

    renderContent() {
        if (Object.keys(this.props.media).length > 0) {
            const currentMedia = this.props.media;
            return (
                <div>
                    <MediaDetailsForm title={currentMedia.mediaTitle}
                                      artist={currentMedia.mainArtist}
                                      isrc={currentMedia.isrc}
                                      duration={currentMedia.duration}
                                      publisher={currentMedia.publisher}
                                      label={currentMedia.label}
                                      releaseYear={currentMedia.releaseDate} />
                    <h3>Kemur fyrir á eftirfarandi plötum</h3>
                    <div className="row">
                        <Table tableData={MediaAppearsOnTableData}
                               objects={currentMedia.albumAppearances}
                               onClickCallback={(row) => browserHistory.push(`/albums/${row.albumId}`)}
                               refCallback={ref => { return ref; }}
                               isRemote={false}
                               pagination={false} />
                    </div>
                    <h3>Flytjendur</h3>
                    <div className="row">
                        <Table tableData={MusiciansAppearsOnTableData}
                               objects={currentMedia.musicians}
                               onClickCallback={(row) => browserHistory.push(`/musicians/${row.personId}`)}
                               refCallback={ref => { return ref; }}
                               isRemote={false}
                               pagination={false} />
                    </div>
                    <h3>Höfundar</h3>
                    <div className="row">
                        <Table tableData={ComposersOfMediaTableData}
                               objects={currentMedia.composers}
                               onClickCallback={(row) => browserHistory.push(`/musicians/${row.personId}`)}
                               refCallback={ref => { return ref; }}
                               isRemote={false}
                               pagination={false} />
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <Spinner className={this.props.isFetchingPublisher ? '' : 'hidden'} />
                { this.renderContent() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetchingPublisher: state.songs.isFetchingPublisher,
        media: state.songs.selectedMedia
    }
}

export default connect(mapStateToProps, { getMediaById }) (MediaDetails);