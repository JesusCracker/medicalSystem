import { NavBar } from "antd-mobile";
import React, {Fragment, PureComponent } from "react";
//import PropTypes from 'prop-types'
import style from './header.less'

class DoctorLogin extends PureComponent {
    render() {
        const { titleNavbar,titleNoction } = this.props
        return (
            <Fragment>
                <NavBar className={style.header}>{titleNavbar}</NavBar>
                {titleNoction && <div className={style.headerNoction}>
                    {titleNoction}
                </div>}
            </Fragment>
        )
    }
}


DoctorLogin.propTypes = {
    //data: PropTypes.string
};


export default DoctorLogin;
