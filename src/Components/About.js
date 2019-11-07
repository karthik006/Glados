import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarLinks from './Navbar'
// import { Carousel, Card } from 'react-bootstrap'

class About extends Component {
    render(){
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to= '/' />;

        return (
            <div className="container">
                <NavbarLinks />
                <br />
                Glados is awesome. It's so awesome that you won't believe it.
                <br />
                #freehongkong
                <br />
                #teamtrees
                <br />
                #xijinpingsux
                <br />
                Yo mama so fat, she's Keshav
                <br />
                Yeet!
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        auth: state.firebase.auth        
    }
}

export default connect(mapStatetoProps)(About);