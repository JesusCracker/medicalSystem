import {Card, WhiteSpace,Button} from "antd-mobile";
import React from "react";
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router';
import LinkHeader from "./LinkHeader";




const User = (props) => {
  const { dispatch,loading,history } = props;

  const {global}=loading
  const { error, user } = props.user;
  let isFetching = loading.effects["user/fetch"]

  let data;

  if (error) {
    data = error;
  } else if (isFetching) {
    data = "Loading..."
  } else {
    data = user && user.data[0].name
  }



  return (
    <div>
      <div>
        <Card>
          <LinkHeader/>
          <Card.Header
            title="This is title"
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            extra={<span>this is extra</span>}
          />
          <Card.Body>
            <div>This is content of `Card`</div>
          </Card.Body>
          <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
        </Card>
      </div>
      <div>{data}</div>
      <button onClick={() => {
        dispatch({type: 'user/fetch'})
      }}>getUser
      </button>
      <button onClick={()=>{

        // history.push({pathname: `/userDetail/10`});
        dispatch(
          routerRedux.push(
            {
              pathname: `/userDetail?id=${11}`
            },

           /* {
              pathname:`/userDetail/${id}`,
              id: { page: 1 },
            }*/
            )
        );
      }}>go</button>

    </div>
  )
}

User.propTypes = {
  data: PropTypes.string
};


export default User;
