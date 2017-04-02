import React from 'react';
import { connect } from 'react-redux';
import ModalSteps from '../common/modalSteps';
import SelectPersonModal from './selectPersonModal';
import _ from 'lodash';
import { getPublishersByCriteria, getPublisherLabelsById } from '../../actions/organizationActions';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import { toastr } from 'react-redux-toastr';

class AddPublisher extends React.Component {
    componentWillReceiveProps(newProps) {
        if (newProps.labels.length > 0) {
            let publisher = _.cloneDeep(this.state.publisher);
            let firstLabel = newProps.labels[0];
            publisher.label = firstLabel.isrcSeriesId;
            publisher.labelName = firstLabel.isrcOrganizationPart;
            publisher.labelPrettyName = `${firstLabel.purposeLabel} (${firstLabel.isrcOrganizationPart})`;
            this.setState({
                publisher: publisher
            });
        }
    }
    constructor() {
        super();

        this.state = {
            isAddPublisherModelOpen: false,
            publisher: {
                id: -1,
                name: '',
                label: '',
                labelName: '',
                labelPrettyName: ''
            }
        };
    }
    openAddPublisherModal() {
        this.setState({
            isAddPublisherModelOpen: true
        });
    }
    renderLabels() {
        return this.props.labels.map((label) => {
            return (
                <option key={label.isrcSeriesId} data-organization-part={label.isrcOrganizationPart} value={label.isrcSeriesId}>{`${label.purposeLabel} (${label.isrcOrganizationPart})`}</option>
            );
        });
    }
    addPublisher(publisher) {
        this.setState({
            publisher: publisher
        });
        toastr.success('Tókst!', 'Það tókst að bæta við útgefanda');

        // Fetch labels for this publisher
        this.props.getPublisherLabelsById(publisher.id);
    }
    removePublisher(e) {
        e.preventDefault();
        this.setState({
            publisher: {
                id: -1,
                name: '',
                label: '',
                labelName: '',
                labelPrettyName: ''
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
    updateLabel(e) {
        let publisher = _.cloneDeep(this.state.publisher);
        publisher.label = e.target.value;
        publisher.labelPrettyName = e.target.options[e.target.selectedIndex].text;
        publisher.labelName = e.target.getAttribute('data-organization-part');
        this.setState({ publisher: publisher });
    }
    render() {
        const { publisher, isAddPublisherModelOpen } = this.state;
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={2} />
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
                <div className={'form-group' + (this.state.publisher.id === -1 ? ' hidden' : '')}>
                    <label htmlFor="organization-label">Label</label>
                    <select value={this.state.label} name="organization-label" id="organization-label" className="form-control" onChange={(e) => this.updateLabel(e)}>
                        {this.renderLabels()}
                    </select>
                </div>
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
        labels: state.organization.selectedOrganizationLabels,
        organizationEnvelope: state.organization.organizationEnvelope
    };
};

export default connect(mapStateToProps, { getPublishersByCriteria, getPublisherLabelsById, isFetchingList, hasStoppedFetchingList })(AddPublisher);