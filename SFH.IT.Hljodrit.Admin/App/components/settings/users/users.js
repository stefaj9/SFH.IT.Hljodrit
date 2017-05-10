import React from 'react';
import { connect } from 'react-redux';
import { getAllUserInAdminGroup } from '../../../actions/userActions';
import UserRegistrationForm from './userRegistrationForm';
import PromptModal from '../../common/promptModal';

class Users extends React.Component {
    componentWillMount() {
        this.props.getAllUserInAdminGroup();
    }
    constructor() {
        super();
        this.state = {
            isRegistrationModalOpen: false
        };
    }
    renderAdmins() {
        return this.props.admins.map((admin, idx) => {
            return (
                <div className="well" key={admin.id}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-3">{idx + 1}</div>
                        <div className="col-xs-12 col-sm-3">{admin.name}</div>
                        <div className="col-xs-12 col-sm-3">{admin.email}</div>
                        <div className="col-xs-12 col-sm-3 text-right">
                            <button className="btn btn-default">Eyða</button>
                        </div>
                    </div>
                </div>
            ); 
        });
    }
    render() {
        return (
            <div>
                <h4>Skráðir notendur</h4>
                <div className="text-right">
                    <button className="btn btn-default btn-primary" onClick={() => this.setState({ isRegistrationModalOpen: true })}><i className="fa fa-fw fa-plus"></i> Bæta við notanda</button>
                </div>
                <div className="spacer"></div>
                {this.renderAdmins()}
                <PromptModal
                    isOpen={this.state.isRegistrationModalOpen}
                    title="Nýskrá notanda"
                    content={<UserRegistrationForm />}
                    confirmBtnText="Nýskrá"
                    confirmBtnCallback={() => console.log('confirm')}
                    discardBtnText="Hætta við"
                    discardBtnCallback={() => this.setState({ isRegistrationModalOpen: false })} />
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        admins: state.user.admins
    };
};

export default connect(mapStateToProps, { getAllUserInAdminGroup })(Users);
