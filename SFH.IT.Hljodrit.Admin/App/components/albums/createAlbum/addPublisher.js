import React from 'react';
import { connect } from 'react-redux';
import ModalSteps from '../../common/modalSteps';
import SelectPersonModal from '../../project/selectPersonModal';
import _ from 'lodash';
import { getPublishersByCriteria, getPublisherIsrcSeriesById, getLabelsByPublisherId } from '../../../actions/organizationActions';
import { isFetchingList, hasStoppedFetchingList } from '../../../actions/flowActions';
import { toastr } from 'react-redux-toastr';

class AddPublisher extends React.Component {
    componentWillReceiveProps(newProps) {
        if (newProps.isrcSeries.length > 0 && newProps.labels.length > 0) {
            let firstIsrcSeries = newProps.isrcSeries[0];
            let firstLabel = newProps.labels[0];
            this.setState({
                publisher: Object.assign({}, this.state.publisher, {
                    isrcSeriesId: firstIsrcSeries.isrcSeriesId,
                    isrcOrganizationPart: firstIsrcSeries.isrcOrganizationPart,
                    lastUsedIsrc: firstIsrcSeries.lastIsrcNumber,
                    isrcSeriesPrettyName: `${firstIsrcSeries.purposeLabel} (${firstIsrcSeries.isrcOrganizationPart})`,
                    labelId: firstLabel.labelId,
                    labelName: firstLabel.labelName
                })
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
                isrcSeriesId: '',
                isrcOrganizationPart: '',
                isrcSeriesPrettyName: '',
                lastUsedIsrc: -1,
                labelId: -1,
                labelName: ''
            }
        };
    }
    openAddPublisherModal() {
        this.setState({
            isAddPublisherModelOpen: true
        });
    }
    renderIsrcSeries() {
        return this.props.isrcSeries.map((serie) => {
            return (
                <option 
                    key={serie.isrcSeriesId} 
                    data-organization-part={serie.isrcOrganizationPart} 
                    data-last-used-isrc={serie.lastIsrcNumber} 
                    value={serie.isrcSeriesId}>
                        {`${serie.purposeLabel} (${serie.isrcOrganizationPart})`}
                </option>
            );
        });
    }
    renderLabels() {
        return this.props.labels.map(label => {
            return (
                <option key={label.labelId} value={label.labelId}>{label.labelName}</option>
            );
        });
    }
    addPublisher(publisher) {
        this.setState({
            publisher: publisher
        });
        toastr.success('Tókst!', 'Það tókst að bæta við útgefanda');

        // Fetch isrc series and labels for this publisher
        this.props.getPublisherIsrcSeriesById(publisher.id);
        this.props.getLabelsByPublisherId(publisher.id);
    }
    removePublisher(e) {
        e.preventDefault();
        this.setState({
            publisher: {
                id: -1,
                name: '',
                isrcSeriesId: '',
                isrcOrganizationPart: '',
                isrcSeriesPrettyName: '',
                lastUsedIsrc: -1,
                labelId: -1,
                labelName: ''
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
        let index = e.target.selectedIndex;
        this.setState({ 
            publisher: Object.assign({}, this.state.publisher, {
                labelId: e.target.value,
                labelName: e.target.options[index].text
            })
        });
    }
    updateIsrcSeries(e) {
        let publisher = _.cloneDeep(this.state.publisher);

        publisher.isrcSeriesId = e.target.value;
        publisher.isrcSeriesPrettyName = e.target.options[e.target.selectedIndex].text;
        publisher.isrcOrganizationPart = e.target.options[e.target.selectedIndex].getAttribute('data-organization-part');
        publisher.lastUsedIsrc = e.target.options[e.target.selectedIndex].getAttribute('data-last-used-isrc');
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
                    <label htmlFor="organization-isrc-series">Isrc-runa</label>
                    <select value={publisher.isrcSeriesId} name="organization-isrc-series" id="organization-isrc-series" className="form-control" onChange={(e) => this.updateIsrcSeries(e)}>
                        {this.renderIsrcSeries()}
                    </select>
                </div>
                <div className={'form-group' + (this.state.publisher.id === -1 ? ' hidden' : '')}>
                    <label htmlFor="organization-labels">Labels</label>
                    <select value={publisher.labelId} name="organization-label" id="organization-label" className="form-control" onChange={(e) => this.updateLabel(e)}>
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
        isrcSeries: state.organization.selectedOrganizationIsrcSeries,
        labels: state.organization.selectedOrganizationLabels,
        organizationEnvelope: state.organization.organizationEnvelope
    };
};

export default connect(mapStateToProps, { getPublishersByCriteria, getPublisherIsrcSeriesById, getLabelsByPublisherId, isFetchingList, hasStoppedFetchingList })(AddPublisher);