import React from 'react';
import { withContext } from '../../context/AppContext';

class AboutPage extends React.Component {
  render() {
    const { user } = this.props;
    return <div>Hi {user.name}</div>;
  }
}
export default withContext(AboutPage);
