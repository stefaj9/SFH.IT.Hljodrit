import React from 'react';
import { connect } from 'react-redux';
import ProjectItem from './projectItem';
import Spinner from 'react-spinner';
import PromptModal from '../common/promptModal';
import ProjectPreviewWindow from './projectPreviewWindow';
import { removeProjectById, sendCommentByProjectId } from '../../actions/projectActions';

class ProjectListView extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            title: '',
            content: '',
            confirmBtnText: '',
            confirmBtnDisabled: true,
            confirmBtnCallback: () => { return -1 },
            discardBtnText: '',
            discardBtnCallback: () => { return -1 },
            reviewComment: ''
        };
    }
    assignPromptModalContent(modalContent) {
        this.setState(modalContent);
    }
    toggleModal(state) {
        this.setState({ isModalOpen: state })
    }
    removeProjectCallback(projectId) {
        this.assignPromptModalContent({
            isModalOpen: true,
            title: 'Eyða verkefni',
            content: 'Ertu viss um að þú viljir eyða verkefni?',
            confirmBtnText: 'Staðfesta',
            confirmBtnCallback: () => { this.toggleModal(false); this.props.removeProjectById(projectId); },
            discardBtnText: 'Hætta við',
            discardBtnCallback: () => { this.toggleModal(false) }
        });
    }
    approveProjectCallback(projectId) {
        this.assignPromptModalContent({
            isModalOpen: true,
            title: 'Samþykkja verkefni',
            content: <ProjectPreviewWindow 
                        projectId={projectId}
                        isEditable={false}
                        action="approve"
                        assignConfirmBtnCallback={(cb) => this.setState({ confirmBtnCallback: cb, confirmBtnDisabled: false })} />,
            confirmBtnText: 'Samþykkja',
            confirmBtnDisabled: this.state.confirmBtnDisabled,
            discardBtnText: 'Hætta við',
            discardBtnCallback: () => { this.toggleModal(false) }
        });
    }
    commentProjectCallback(projectId) {
        this.assignPromptModalContent({
            isModalOpen: true,
            title: 'Senda athugasemd',
            content: <textarea onChange={(e) => { let value = e.target.value; this.setState({ confirmBtnCallback: () => { this.props.sendCommentByProjectId(projectId, { comment: value }); this.setState({ reviewComment: '', isModalOpen: false } ); } }) }}
            placeholder="Skrifaðu athugasemd.." 
            className="form-control">
            </textarea>,
            confirmBtnText: 'Senda', 
            confirmBtnDisabled: false,
            discardBtnText: 'Hætta við',
            discardBtnCallback: () => { this.toggleModal(false) }
        });
    }
    changeProjectCallback(projectId) {
        this.assignPromptModalContent({
            isModalOpen: true,
            title: 'Breyta verkefni',
            content: <ProjectPreviewWindow 
                        projectId={projectId}
                        isEditable={true}
                        action="modify" />,
            confirmBtnText: 'Breyta',
            confirmBtnCallback: () => { console.log('Change!') },
            discardBtnText: 'Hætta við',
            discardBtnCallback: () => { this.toggleModal(false) }
        });
    }
    renderProjectItems() {
        if (!this.props.isFetching) {
            return this.props.projects.map((item) => {
                return (
                    <ProjectItem 
                        key={item.id} 
                        project={item}
                        approveProjectCallback={(projectId) => this.approveProjectCallback(projectId)}
                        commentProjectCallback={(projectId) => this.commentProjectCallback(projectId)}
                        changeProjectCallback={(projectId) => this.changeProjectCallback(projectId)}
                        removeProjectCallback={(projectId) => this.removeProjectCallback(projectId)} />
                );
            });
        }
    }
    render() {
        const { isModalOpen, title, content, confirmBtnText, confirmBtnCallback, confirmBtnDisabled, discardBtnText, discardBtnCallback } = this.state;
        return (
            <div>
                <Spinner className={this.props.isFetching ? '' : 'hidden'} />
                {this.renderProjectItems()}
                <PromptModal
                    isOpen={isModalOpen}
                    title={title}
                    content={content}
                    confirmBtnText={confirmBtnText}
                    confirmBtnCallback={confirmBtnCallback}
                    confirmBtnDisabled={confirmBtnDisabled}
                    discardBtnText={discardBtnText}
                    discardBtnCallback={discardBtnCallback}
                    showConfirmSpinner={this.props.isPublishing} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isPublishing: state.project.isPublishingProject,
    };
};

export default connect(mapStateToProps, { removeProjectById, sendCommentByProjectId })(ProjectListView);