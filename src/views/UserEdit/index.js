import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import CustomForm from '../../components/Form/index';
class UserEdit extends React.Component {
  state = {
    createUserCondition: true,
    user: {}
  };

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      const user = this.props.location.state.user;
      this.setState({ createUserCondition: false, user });
    }
  }

  submitForm = async (data) => {
    const { createUserCondition, user } = this.state;
    const { createUser, editUserById, getUserById } = this.props;

    if (createUserCondition) {
      const formData = data;
      return await createUser(formData);
    } else {
      const d = { id: user.id, formData: data };
      await editUserById(d);
      return await getUserById(user.id);
    }
  };

  render() {
    const { user, createUserCondition } = this.state;
    return (
      <div>
        <Row style={{ marginBottom: '15px' }}>
          <Col>
            <Button href="/">Back</Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h1>{createUserCondition ? 'Add new' : 'Edit'} user</h1>
            <CustomForm submitData={this.submitForm} user={user} />
          </Col>
        </Row>
      </div>
    );
  }
}
const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({
  createUser: (data) => dispatch.users.createUser(data),
  editUserById: (data) => dispatch.users.editUserById(data),
  getUserById: (id) => dispatch.users.getUserById(id)
});

export default connect(mapState, mapDispatch)(UserEdit);
