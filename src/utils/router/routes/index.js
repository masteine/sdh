import React, { Component } from 'react';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

class RenderRoute extends Component {
  components = {
    private: PrivateRoute,
    public: PublicRoute
  };

  render() {
    const TagName = this.components[this.props.type || 'public'];
    return <TagName {...this.props} />;
  }
}

export default RenderRoute;
