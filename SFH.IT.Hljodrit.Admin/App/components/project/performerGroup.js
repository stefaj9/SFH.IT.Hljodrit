import React from 'react';

class PerformerGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            group: [{
                name: 'Arnar Leifsson',
            }, {
                name: 'Björgvin Birkir Björgvinsson'
            }, {
                name: 'Baldur Tryggvason'
            }]
        }
    }
    renderGroup() {
        return this.state.group.map((member, idx) => {
            return (
                <div key={`${idx}-${member.name}`} className="group">{member.name}</div>
            );
        });
    }
    render() {
        return (
            <div>
                <h4>Hópar</h4>
                <div className="row">
                    <div className="col-xs-12 text-right">
                        <button 
                            className="btn btn-default">
                            <i className="fa fa-plus fa-fw"></i> Bæta við
                        </button>
                    </div>
                </div>
                <div className="group-wrapper">
                    {this.renderGroup()}
                </div>
            </div>
        );
    }
}

PerformerGroup.propTypes = {

};

export default PerformerGroup;