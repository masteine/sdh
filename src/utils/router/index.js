import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch } from 'react-router-dom';
import { Sugar } from 'react-preloaders';
import RenderRoute from './routes';
import Users from '../../views/Users/_routes';
import UserDetails from '../../views/UserDetails/_routes';
import UserEdit from '../../views/UserEdit/_routes';
import { Container } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
const mergedRoutes = [...Users, ...UserDetails, ...UserEdit];

class AppRouter extends React.Component {
  render() {
    const authStatus = false;
    return (
      <Router history={this.props.history}>
        <Container>
          <main>
            <Switch>
              {mergedRoutes.map((route, i) => (
                <RenderRoute key={i} auth={authStatus} {...route} />
              ))}
            </Switch>
          </main>
          <Sugar />
          <ToastContainer />
        </Container>
      </Router>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(AppRouter);
