import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarLinks from './Navbar'

class Home extends Component {
    render(){
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to= '/' />;

        return (
            <div className="container">
                <NavbarLinks />
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        auth: state.firebase.auth        
    }
}

export default connect(mapStatetoProps)(Home);