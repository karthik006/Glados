import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../store/authActions'
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import { Form, Row, Col, Button, Alert } from 'react-bootstrap'

class SigninPage extends Component {
  state = {
    email: '',
    password: '' ,
    loading: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    })
    this.props.signIn(this.state)
    this.setState({
      loading: false
    })
  }

  render() {
    const { authError } = this.props;
    const { auth } = this.props;
    if(auth.uid) return <Redirect to= '/Home'/>;
    return (
        <div className="App">
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group as={Row}>
              <Col>
                <Button type="submit" onClick={this.handleSubmit}>LOGIN</Button>
                { authError ? <Alert variant="danger">{authError}</Alert> : null }
              </Col>
            </Form.Group>
            <Link to='/signup'>New to Glados? Click here to sign up.</Link>
          </Form>
          { this.loading ? <Spinner animation="border" variant="danger" /> : null }
        </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    auth: state.firebase.auth, 
    authError: state.auth.authError
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(SigninPage);
