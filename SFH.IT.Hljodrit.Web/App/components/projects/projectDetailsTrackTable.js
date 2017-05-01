import React from 'react';
import PropTypes from 'prop-types';
import Table from '../common/table';
import ProjectDetailsTrackTableData from './projectDetailsTrackTableData';
import PromptModal from '../common/promptModal';

class ProjectDetailsTrackTable extends React.Component {
    constructor() {
        super();
        this.state = {
            bootstrapTableRef: null,
            selectedTracksForDeletion: [],
            isTrackAddModalOpen: false
        };
    }
    addToListOfSelectedTracks(tracks, status) {
        let selectedTracks = _.cloneDeep(this.state.selectedTracksForDeletion);
        if (!status) {
            _.forEach(tracks, (track) => {
                _.remove(selectedTracks, (t) => { return t === track.id });
            });
        } else {
            selectedTracks = _.concat(selectedTracks, tracks.map((t) => { return t.id }));
        }
        this.setState({
            selectedTracksForDeletion: selectedTracks
        });
    }
    removeTracksFromProject() {
        this.addToListOfSelectedTracks(this.state.selectedTracksForDeletion, false);
        this.props.removeTracksFromProject(this.state.selectedTracksForDeletion);
        this.setState({ selectedTracksForDeletion: [] });
        this.state.bootstrapTableRef.reset();
    }
    render() {
        return (
            <div>
                <Table
                    tableData={ProjectDetailsTrackTableData}
                    objects={this.props.tracks}
                    refCallback={(ref) => { if (this.state.bootstrapTableRef === null && ref !== null) { this.setState({ bootstrapTableRef: ref }); } }}
                    isRemote={false}
                    pagination={false}
                    selectRow={true}
                    selectRowMode="checkbox"
                    selectRowCallback={(row, status) => this.addToListOfSelectedTracks([row], status)}
                    selectRowCallBackAll={(status, rows) => this.addToListOfSelectedTracks(rows, status)} />
                <div className="text-right">
                    <div className="spacer"></div>
                    <div className="btn-group">
                        <button disabled={this.state.selectedTracksForDeletion.length === 0} className="btn btn-default btn-primary" onClick={() => this.removeTracksFromProject()}><i className="fa fa-fw fa-minus"></i> Eyða völdum lögum</button>
                        <button className="btn btn-default btn-primary" onClick={() => this.setState({ isTrackAddModalOpen: true })}><i className="fa fa-fw fa-plus"></i> Bæta við lagi</button>
                    </div>
                </div>
                <PromptModal
                    isOpen={this.state.isTrackAddModalOpen}
                    title="Bæta við lagi"
                    content={<h3>Content</h3>}
                    confirmBtnText="Bæta við"
                    confirmBtnCallback={() => this.setState({ isTrackAddModalOpen: false })}
                    discardBtnText="Loka"
                    discardBtnCallback={() => this.setState({ isTrackAddModalOpen: false })}
                    showConfirmSpinner={this.props.isLoading} />
            </div>
        );
    }
}

ProjectDetailsTrackTable.propTypes = {
    tracks: PropTypes.array.isRequired,
    removeTracksFromProject: PropTypes.func,
    addTrackToProject: PropTypes.func,
    isLoading: PropTypes.bool
};

export default ProjectDetailsTrackTable;