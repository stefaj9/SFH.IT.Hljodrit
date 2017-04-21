import React from 'react';
import { connect } from 'react-redux';
import ProjectItem from './projectItem';
import Spinner from 'react-spinner';
import PromptModal from '../common/promptModal';
import ProjectPreviewWindow from './projectPreviewWindow';
import { removeProjectById } from '../../actions/projectActions';

class ProjectListView extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            title: '',
            content: '',
            confirmBtnText: '',
            confirmBtnCallback: () => { return -1 },
            discardBtnText: '',
            discardBtnCallback: () => { return -1 }
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
                        action="approve" />,
            confirmBtnText: 'Samþykkja',
            confirmBtnCallback: () => { console.log('Approve!') },
            discardBtnText: 'Hætta við',
            discardBtnCallback: () => { this.toggleModal(false) }
        });
    }
    commentProjectCallback(projectId) {
        console.log(projectId);
        this.assignPromptModalContent({
            isModalOpen: true,
            title: 'Senda athugasemd',
            content: <textarea placeholder="Skrifaðu athugasemd.." className="form-control"></textarea>,
            confirmBtnText: 'Senda',
            confirmBtnCallback: () => { console.log('Comment!') },
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
        const { isModalOpen, title, content, confirmBtnText, confirmBtnCallback, discardBtnText, discardBtnCallback } = this.state;
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
                    discardBtnText={discardBtnText}
                    discardBtnCallback={discardBtnCallback} />
            </div>
        );
    }
}

export default connect(null, { removeProjectById })(ProjectListView);