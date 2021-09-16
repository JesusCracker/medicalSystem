import React, {Component} from 'react';
import queryString from 'query-string';
import LinkHeader from "../components/LinkHeader";

class UserPageDetail extends Component {

  render() {
    const query = queryString.parse(this.props.location.search);

    return (

      <div>
        <LinkHeader/>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consectetur delectus doloribus eaque error eum ex fuga ipsum laudantium, molestias nobis nulla omnis perspiciatis, quam quibusdam, sapiente ullam vitae voluptas!
      </div>
    );
  }
}

export default UserPageDetail;
