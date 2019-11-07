import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { signOut } from '../store/authActions'
import { connect } from 'react-redux';

class NavbarLinks extends Component {
  render() {
    return (
        <Navbar bg="dark" expand="md" variant="dark">
          <Navbar.Brand><NavLink to='/Home' className="link">Glados</NavLink></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <Nav.Link><NavLink to='/About' className="link">About</NavLink></Nav.Link>
              </Nav.Item>
              <NavDropdown title="Games" id="dropdown-item-button">
                <NavDropdown.Item><NavLink to='/Game'>Search</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink to='/Playlist'>Playlist</NavLink></NavDropdown.Item>
                <NavDropdown.Item>Recommended</NavDropdown.Item>
              </NavDropdown>
              <Nav.Item>
                <Nav.Link><NavLink to='/' onClick={this.props.signOut}>Logout</NavLink></Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}


export default connect(null, mapDispatchToProps)(NavbarLinks)