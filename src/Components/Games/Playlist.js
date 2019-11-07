import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarLinks from '../Navbar'
import firebase from '../../Config/fbConfig'
import { Tabs, Tab, Spinner } from 'react-bootstrap'
import Template from './ViewTemplate'

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        const { auth } = props;
        this.UID = auth.uid;

        var play = [];
        var wish = [];
        firebase.firestore().collection(this.UID).doc("Games").collection("Playlist").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                var game = []
                game.guid = doc._document.proto.fields.ID.stringValue;
                game.image = []
                game.image.thumb_url = doc._document.proto.fields.Image.stringValue;
                game.name = doc._document.proto.fields.Name.stringValue;
                game.expected_release_year = doc._document.proto.fields.Release.integerValue;
                if(doc._document.proto.fields.Played.stringValue === "Yes") {
                    play.push(<Template key={ game.guid } game={ game } />)
                }
                else {
                    wish.push(<Template key={ game.guid } game={ game } />);
                }
                //doc._document.proto.fields.ID
                console.log(doc);
            })
            this.setState({
                playlist: play,
                wishlist: wish
            });
        })
    }

    render(){
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to= '/' />;
        if(this.state.playlist && this.state.wishlist) {
            return (
                <div className="container">
                    <NavbarLinks />
                    <br />
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="playlist" title="Playlist">
                            { this.state.playlist }
                        </Tab>
                        <Tab eventKey="wishlist" title="Wishlist">
                            { this.state.wishlist }
                        </Tab>
                    </Tabs>
                    <br/>
                </div>
            );
        }
        else {
            return (
                <div className="container center">
                    {/* <p>Loading...</p> */}
                    <center>
                        <Spinner animation="grow" variant="danger" />
                    </center>
                </div>
            )
        }
    }
}

const mapStatetoProps = (state) => {
    return {
        auth: state.firebase.auth        
    }
}

export default connect(mapStatetoProps)(Playlist);