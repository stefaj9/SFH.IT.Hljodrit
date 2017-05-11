import React from 'react';
import { connect } from 'react-redux';
import { getAllUserInAdminGroup, removeUserById, createUser } from '../../../actions/userActions';
import UserRegistrationForm from './userRegistrationForm';
import PromptModal from '../../common/promptModal';
import Spinner from 'react-spinner';

class Users extends React.Component {
    componentWillMount() {
        this.props.getAllUserInAdminGroup();
    }
    constructor() {
        super();
        this.state = {
            isRegistrationModalOpen: false,
            isRemoveUserModalOpen: false,
            selectedUser: {
                id: -1,
                name: ''
            },
            registrationUser: {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
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
                            <button className="btn btn-default" onClick={() => this.setState({ selectedUser: { id: admin.id, name: admin.name }, isRemoveUserModalOpen: true })}>Eyða</button>
                        </div>
                    </div>
                </div>
            ); 
        });
    }
    updateRegistrationInfo(prop, value) {
        this.setState({
            registrationUser: Object.assign({}, this.state.registrationUser, {
                [prop]: value
            })
        });
    }
    render() {
        const { isRegistrationModalOpen, isRemoveUserModalOpen, registrationUser, selectedUser } = this.state;
        return (
            <div>
                <h4>Skráðir notendur</h4>
                <div className={this.props.isFetchingUsers ? 'hidden' : ''}>
                    <div className="text-right">
                        <button className="btn btn-default btn-primary" onClick={() => this.setState({ isRegistrationModalOpen: true })}><i className="fa fa-fw fa-plus"></i> Bæta við notanda</button>
                    </div>
                    <div className="spacer"></div>
                    {this.renderAdmins()}
                </div>
                <div className={this.props.isFetchingUsers ? 'text-center' : 'hidden'}>
                    <Spinner />
                    <p>Sæki notendur..</p>
                </div>
                <PromptModal
                    isOpen={isRegistrationModalOpen}
                    title="Nýskrá notanda"
                    content={<UserRegistrationForm update={(prop, value) => this.updateRegistrationInfo(prop, value)} />}
                    confirmBtnText="Nýskrá"
                    confirmBtnCallback={() => { this.props.createUser(registrationUser); this.setState({ isRegistrationModalOpen: false }); }}
                    discardBtnText="Hætta við"
                    discardBtnCallback={() => this.setState({ isRegistrationModalOpen: false })} />
                <PromptModal
                    isOpen={isRemoveUserModalOpen}
                    title="Eyða notanda"
                    content={`Ertu viss um að þú viljir eyða ${selectedUser.name}?`}
                    confirmBtnText="Eyða"
                    confirmBtnCallback={() => { this.props.removeUserById(selectedUser.id); this.setState({ isRemoveUserModalOpen: false }); }}
                    discardBtnText="Hætta við"
                    discardBtnCallback={() => this.setState({ isRemoveUserModalOpen: false })} />
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        admins: state.user.admins,
        isFetchingUsers: state.user.isFetchingUsers
    };
};

export default connect(mapStateToProps, { getAllUserInAdminGroup, removeUserById, createUser })(Users);
