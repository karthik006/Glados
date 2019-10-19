import React from 'react'
import { NavLink } from 'react-router-dom'
import { signOut } from '../store/authActions'
import { connect } from 'react-redux';

const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to='/Games'>Games</NavLink></li>
            <li><a onClick={props.signOut} className="btn btn-floating blue lighten-1">T</a></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(signOut())
    }
}
  
export default connect(null, mapDispatchToProps)(SignedInLinks)