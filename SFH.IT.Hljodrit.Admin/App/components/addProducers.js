import React from 'react';
import ModalSteps from './modalSteps';
import _ from 'lodash';
import PeopleListModal from './peopleListModal';

export default class AddProducers extends React.Component {
    constructor() {
        super();

        this.state = {
            isAddProducerModelOpen: false,
            producers: []
        };
    }
    openAddProducerModal() {
        this.setState({
            isAddProducerModelOpen: true
        });
    }
    addProducer(producer) {
        const { producers } = this.state;
        let producersUpdated = _.cloneDeep(producers);
        producersUpdated = _.concat(producersUpdated, {
            id: producer.Id,
            name: producer.Fullname
        });

        this.setState({
            producers: producersUpdated,
            isAddProducerModelOpen: false
        });
    }
    removeProducer(e, producerId) {
        e.preventDefault();
        let producersUpdated = _.cloneDeep(this.state.producers);
        _.remove(producersUpdated, (producer) => {
            return producer.id === producerId;
        });

        this.setState({
            producers: producersUpdated
        });
    }
    renderProducers() {
        const { producers } = this.state;
        return producers.map((producer) => {
            return (
                <tr key={producer.id}>
                    <td>{producer.name}</td>
                    <td className="text-right">
                        <a href="#" onClick={(e) => this.removeProducer(e, producer.id) }>
                            <i className="fa fa-times"></i>
                        </a>
                    </td>
                </tr>
            );
        });
    }
    render() {
        const { producers, isAddProducerModelOpen } = this.state;
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={4} />
                <h4>Skrá framleiðendur</h4>
                <div className="form-group pull-right">
                    <button 
                        className="btn btn-default"
                        onClick={() => this.openAddProducerModal()}>Bæta við framleiðanda <i className="fa fa-fw fa-plus"></i></button>
                </div>
                <table className={'table table-default table-striped table-responsive' + (producers.length === 0 ? ' hidden': '')}>
                    <thead>
                        <tr>
                            <th>Nafn</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProducers()}
                    </tbody>
                </table>
                <p className={producers.length === 0 ? '' : 'hidden'}> <br/>
                <br/> Gerð er krafa um að skrá a.m.k. einn framleiðanda á plötuna.</p>
                <div className="btn-group pull-right">
                    <button 
                        className="btn btn-default"
                        onClick={() => this.props.back()}>Til baka</button>
                    <button 
                        disabled={producers.length === 0}
                        className="btn btn-default btn-primary" 
                        onClick={() => this.props.next(this.state.producers)}>Áfram
                    </button>
                </div>
                <PeopleListModal
                    isOpen={isAddProducerModelOpen}
                    close={() => this.setState({ isAddProducerModelOpen: false })}
                    update={(producer) => this.addProducer(producer)}
                    title="Bæta við framleiðanda"
                 />
            </div>
        );
    }
}