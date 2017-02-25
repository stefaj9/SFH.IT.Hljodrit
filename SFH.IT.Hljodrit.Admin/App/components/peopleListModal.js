import React from 'react';
import Modal from 'react-modal';

export default class PeopleListModal extends React.Component {
    componentWillReceiveProps(newProps) {
        if (newProps.isOpen) {
            // Fetches the data which is suppose to show in the modal
            newProps.fetch();
        }
    }
    constructor() {
        super();
        this.state = {
            selectedPersons: [],
            searchQuery: ''
        };
    }
    closeModal(e) {
        e.preventDefault();
        this.props.close();
    }
    searchInList(e) {
        e.preventDefault();

        // TODO: Issue a search request
    } 
    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen}
                contentLabel=""
                className="modal-window"
                overlayClass="modal-overlay">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>{this.props.title}</h4>
                            <span className="top-corner">
                                <a href="#" onClick={(e) => this.closeModal(e)}>
                                    <i className="fa fa-times"></i>
                                </a>
                            </span>
                        </div>
                        <div className="modal-body">
                            <form action="" onSubmit={(e) => this.searchInList(e)}>
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        placeholder="Leita.." 
                                        className="form-control"
                                        value={this.state.searchQuery}
                                        onChange={(e) => this.setState({ searchQuery: e.target.value })} />
                                    <span className="input-group-addon">
                                        <i className="fa fa-search"></i>
                                    </span>
                                    <input type="submit" className="hidden" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}