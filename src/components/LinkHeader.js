import React, {Component} from 'react';
import {Button, Card} from "antd-mobile";
import { Link } from 'react-router-dom'

class LinkHeader extends Component {
  render() {
    return (
      <div>
        <ul style={{display: "flex", listStyle: 'none', width: '100%'}}>
          <li style={{width: "20%"}}><Link to="/userDetail"><Button type="ghost" size="small" inline>1</Button></Link></li>
          <li style={{width: "20%"}}><Button type="ghost" size="small" inline>2</Button></li>
          <li style={{width: "20%"}}><Button type="ghost" size="small" inline>3</Button></li>
          <li style={{width: "20%"}}><Button type="ghost" size="small" inline>4</Button></li>
          <li style={{width: "20%"}}><Button type="ghost" size="small" inline>5</Button></li>
        </ul>
      </div>
    );
  }
}

export default LinkHeader;
