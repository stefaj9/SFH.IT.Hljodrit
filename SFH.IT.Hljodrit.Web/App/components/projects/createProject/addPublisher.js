import React from 'react';
import { connect } from 'react-redux';
import Steps from '../../common/steps';
import SelectPersonModal from '../selectPersonModal';
import { getPublishersByCriteria } from '../../../actions/organizationActions';
import { isFetchingList, hasStoppedFetchingList } from '../../../actions/flowActions';
import { toastr } from 'react-redux-toastr';

class AddPublisher extends React.Component {
    constructor() {
        super();

        this.state = {
            isAddPublisherModelOpen: false,
            publisher: {
                id: -1,
                name: ''
            }
        };
    }
    openAddPublisherModal() {
        this.setState({
            isAddPublisherModelOpen: true
        });
    }
    addPublisher(publisher) {
        this.setState({
            publisher: publisher
        });
        toastr.success('Tókst!', 'Það tókst að bæta við útgefanda');
    }
    removePublisher(e) {
        e.preventDefault();
        this.setState({
            publisher: {
                id: -1,
                name: ''
            }
        });
        toastr.success('Tókst!', 'Það tókst að fjarlægja útgefanda');
    }
    renderPublisher() {
        const { publisher } = this.state;
        return (
            <tr key={publisher.id}>
                <td>{publisher.name}</td>
                <td className="text-right">
                    <a href="#" onClick={(e) => this.removePublisher(e) }>
                        <i className="fa fa-times"></i>
                    </a>
                </td>
            </tr>
        );
    }
    render() {
        const { publisher, isAddPublisherModelOpen } = this.state;
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <Steps steps={this.props.steps} currentStep={2} />
                <h4>Skrá útgefanda</h4>
                <div className="form-group pull-right">
                    <button 
                        disabled={publisher.id !== -1}
                        className="btn btn-default"
                        onClick={() => this.openAddPublisherModal()}>Bæta við útgefanda <i className="fa fa-fw fa-plus"></i></button>
                </div>
                <table className={'table table-default table-striped table-responsive' + (publisher.id === -1 ? ' hidden': '')}>
                    <thead>
                        <tr>
                            <th>Nafn</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderPublisher()}
                    </tbody>
                </table>
                <p className={publisher.id === -1 ? '' : 'hidden'}> <br/>
                <br/> Gerð er krafa um að skrá einn útgefanda á plötuna.</p>
                <div className="btn-group pull-right">
                    <button 
                        className="btn btn-default"
                        onClick={() => this.props.back()}>Til baka</button>
                    <button 
                        disabled={publisher.id === -1}
                        className="btn btn-default btn-primary" 
                        onClick={() => this.props.next(this.state.publisher)}>Áfram
                    </button>
                </div>
                <SelectPersonModal
                    isOpen={isAddPublisherModelOpen}
                    fetch={this.props.getPublishersByCriteria}
                    beginFetch={this.props.isFetchingList}
                    stoppedFetch={this.props.hasStoppedFetchingList}
                    envelope={this.props.organizationEnvelope}
                    close={() => this.setState({ isAddPublisherModelOpen: false })}
                    update={(publisher) => this.addPublisher(publisher)}
                    next={() => this.setState({ isAddPublisherModelOpen: false })}
                    steps={() => { return ( <h4>Bæta við útgefanda</h4> ) } }
                 />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        organizationEnvelope: state.organization.organizationEnvelope
    };
};

export default connect(mapStateToProps, { getPublishersByCriteria, isFetchingList, hasStoppedFetchingList })(AddPublisher);