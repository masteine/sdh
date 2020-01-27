import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../../components/List/index';
import { Button } from 'reactstrap';
import CustomModal from '../../components/Modal/index';
import history from '../../utils/history/index';

class Users extends Component {
  state = {
    activeItem: ''
  };
  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  removeUser = async (user) => {
    await this.setState({
      activeItem: user
    });
  };

  showDetails = (user) => {
    history.push('/user-details', { user: user });
  };

  onClose = () => {
    this.setState({
      activeItem: ''
    });
  };

  deleteUser = async () => {
    const { deleteUser, getUsers } = this.props;
    const id = this.state.activeItem.id;
    await deleteUser(id);
    await this.setState({
      activeItem: ''
    });
    await getUsers();
  };

  render() {
    const { activeItem } = this.state;
    const { users } = this.props.users;
    return (
      <div>
        <h1>Users list</h1>
        <Button color="primary" href="/user-edit">
          Add user
        </Button>
        <List
          data={users}
          showDetails={(e, user) => this.showDetails(e, user)}
          removeUser={(user) => this.removeUser(user)}
        />
        <CustomModal
          isOpen={activeItem !== ''}
          onClose={this.onClose}
          acceptAction={this.deleteUser}>
          Do you really want delete{' '}
          <strong>
            {activeItem.first_name} {activeItem.last_name}{' '}
          </strong>{' '}
          user?
        </CustomModal>
      </div>
    );
  }
}

const mapState = (state) => ({
  users: state.users
});

const mapDispatch = (dispatch) => ({
  getUsers: () => dispatch.users.getUsers(),
  deleteUser: (id) => dispatch.users.deleteUser(id)
});

export default connect(mapState, mapDispatch)(Users);
