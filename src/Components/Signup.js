import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/authActions'
import { Redirect } from 'react-router-dom';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap'
import firebase from '../Config/fbConfig'

class SignUp extends Component {
  constructor(props) {
    super(props)
    var curList = [];
    firebase.firestore().collection("Users").get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        curList.push(doc.data().username)
        // console.log(doc.id)
      })
    });

    this.state = {
      email: '',
      password: '',
      username: '',
      nameList: curList,
      usernametext: 'Please enter a unique username'
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
    if(e.target.id === "username")
    {
      var flag = false;
      // console.log(this.state.nameList)
      this.state.nameList.forEach(x => {
        if(x === e.target.value)
        {
          flag = true;
        }
      })
      if(flag || e.target.value.length < 4)
      {
        this.setState({
          usernametext: 'Please enter a different username'
        })
      }
      else
      {
        this.setState({
          usernametext: 'Perfect'
        })
      }
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.usernametext === "Perfect")
    {
      this.props.signUp(this.state)
    }
  }

  render() {
    const { authError } = this.props;
    const { auth } = this.props;
    if(auth.uid) return <Redirect to= '/home'/>;
    return (
      <div className="App">
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={this.handleChange} />
            <Form.Text className="text-muted">
              { this.state.usernametext }
            </Form.Text>
          </Form.Group>
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
              <Button type="submit" onClick={this.handleSubmit}>SIGN UP</Button>
              { authError ? <Alert variant="danger">{authError}</Alert> : null }
            </Col>
          </Form.Group>
          <Link to='/'>Back</Link>
        </Form>
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
    signUp: (newUser) => dispatch(signUp(newUser)),
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(SignUp);
