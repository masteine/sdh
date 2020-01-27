import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardSubtitle,
  Button
} from 'reactstrap';
import history from '../../utils/history/index';
import CustomModal from '../../components/Modal/index';

class UserDetails extends React.Component {
  state = {
    showModal: false,
    emptyPage: false,
    user: {}
  };

  async componentDidMount() {
    if (this.props.location.state === undefined) {
      history.goBack();
    }
    const user = await this.props.location.state.user;
    const id = user.id;
    /* CAN GET FROM REDUX STATE
    await this.setState({ user });
    */
    await this.props.getUserById(id);
  }

  toggleModal = async () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  deleteUser = async () => {
    const { deleteUser, user } = this.props;
    const id = user.id;
    await deleteUser(id);
    toast.success('User has been deleted');
    await this.setState({ showModal: false, emptyPage: true });
  };

  editProfile = (user) => {
    history.push('/user-edit', { user });
  };

  render() {
    const { showModal, emptyPage } = this.state;
    const { user } = this.props;

    return (
      <div>
        <Row style={{ marginBottom: '15px' }}>
          <Col>
            <Button href="/">Back</Button>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <h1>User details</h1>
            {emptyPage ? (
              <p>Card is empty</p>
            ) : (
              <Card>
                <CardBody>
                  <CardSubtitle>
                    User name: {user.first_name} {user.last_name}
                  </CardSubtitle>
                </CardBody>
                <CardBody>
                  <CardText>Birth date: {user.birth_date}</CardText>
                  <CardText>Gender: {user.gender}</CardText>
                  <CardText>Job: {user.job}</CardText>
                  <CardText>Biography: {user.biography}</CardText>
                  <CardText>
                    {' '}
                    <small className="text-muted">
                      {user.is_active ? 'User active' : 'User non active'}
                    </small>
                  </CardText>
                  <Button
                    onClick={() => this.editProfile(user)}
                    color="primary"
                    style={{ marginRight: '15px' }}>
                    Edit profile
                  </Button>
                  <Button onClick={() => this.toggleModal()} color="danger">
                    Delete
                  </Button>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
        <CustomModal
          isOpen={showModal}
          onClose={() => this.toggleModal()}
          acceptAction={this.deleteUser}>
          Do you really want delete{' '}
          <strong>
            {user.first_name} {user.last_name}{' '}
          </strong>{' '}
          user?
        </CustomModal>
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.users.user
});

const mapDispatch = (dispatch) => ({
  getUserById: (id) => dispatch.users.getUserById(id),
  deleteUser: (id) => dispatch.users.deleteUser(id)
});

export default connect(mapState, mapDispatch)(UserDetails);
