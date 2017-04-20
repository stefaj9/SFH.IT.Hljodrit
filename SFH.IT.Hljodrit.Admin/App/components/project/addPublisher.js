import React from 'react';
import { connect } from 'react-redux';
import ModalSteps from '../common/modalSteps';
import SelectPersonModal from './selectPersonModal';
import _ from 'lodash';
import { getPublishersByCriteria, getPublisherIsrcSeriesById } from '../../actions/organizationActions';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import { toastr } from 'react-redux-toastr';

class AddPublisher extends React.Component {
    componentWillReceiveProps(newProps) {
        if (newProps.isrcSeries.length > 0) {
            let publisher = _.cloneDeep(this.state.publisher);
            let firstIsrcSeries = newProps.isrcSeries[0];
            publisher.isrcSeriesId = firstIsrcSeries.isrcSeriesId;
            publisher.isrcOrganizationPart = firstIsrcSeries.isrcOrganizationPart;
            publisher.lastUsedIsrc = firstIsrcSeries.lastIsrcNumber;
            publisher.isrcSeriesPrettyName = `${firstIsrcSeries.purposeLabel} (${firstIsrcSeries.isrcOrganizationPart})`;
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
                isrcSeriesId: '',
                isrcOrganizationPart: '',
                isrcSeriesPrettyName: '',
                lastUsedIsrc: -1
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
    addPublisher(publisher) {
        this.setState({
            publisher: publisher
        });
        toastr.success('Tókst!', 'Það tókst að bæta við útgefanda');

        // Fetch isrc series for this publisher
        this.props.getPublisherIsrcSeriesById(publisher.id);
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
                lastUsedIsrc: -1
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
                    <label htmlFor="organization-isrc-series">Label</label>
                    <select value={this.state.isrcSeriesId} name="organization-isrc-series" id="organization-isrc-series" className="form-control" onChange={(e) => this.updateIsrcSeries(e)}>
                        {this.renderIsrcSeries()}
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
        organizationEnvelope: state.organization.organizationEnvelope
    };
};

export default connect(mapStateToProps, { getPublishersByCriteria, getPublisherIsrcSeriesById, isFetchingList, hasStoppedFetchingList })(AddPublisher);