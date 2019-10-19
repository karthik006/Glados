import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarLinks from '../Navbar'
import { Card, Row, Col, Image, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
import firebase from '../../Config/fbConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import igdb from 'igdb-api-node';

class GameDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seen: false,
            watchlist: false,
            currentGameDetails: props.location.aboutProps.game,
        }
        this.id = props.match.params.id;
        //this.urlString = "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/";
        
        // this.getGameDetails(props.location.aboutProps.game).then(result => {
        //     this.setState({
        //         currentGameDetails: result
        //     });
        //     console.log(this.state.currentGameDetails);
        // });
        const temp = props.location.aboutProps.game;

        temp.genreList = [];
        if(temp.genres) {
            temp.genres.forEach(async (id) => {
                this.getGameGenre(id).then((result) => {
                    temp.genreList.push(<Button key={ result.data[0].name } variant="primary" size="sm">{ result.data[0].name }</Button>);
                });
            });
            this.setState({
                currentGameDetails: temp
            });
        }

        temp.screenList = [];
        if(temp.screenshots) {
            temp.screenshots.forEach(async (id) => {
                this.getGameShots(id).then((result) => {
                    temp.screenList.push(<Image key={ result.data[0].image_id } src={ "https:" + result.data[0].url} />);
                });
            });
            this.setState({
                currentGameDetails: temp
            });
        }

        const { auth } = props;
        const UID = auth.uid;

        firebase.firestore().collection(UID).doc("Movies").collection("Watchlist").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if(doc.key === this.state.curMovie.id)
                {
                    this.setState({
                        watchlist: true
                    })
                }
            })
        })

        firebase.firestore().collection(UID).doc("Movies").collection("Seen").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if(doc.key === this.state.curMovie.id)
                {
                    this.setState({
                        seen: true,
                        watchlist: false
                    })
                }
            })
        })
    }

    async getGameGenre(id) {
        var tempname = await this.client.fields('*').where('id = '+id).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/genres/');
        console.log(tempname.data[0].name);
        return tempname;
    }

    async getGameShots(id) {
        var tempname = await this.client.fields('*').where('id = '+id).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/screenshots/');
        console.log(tempname.data[0].url);
        return tempname;
    }

    // async getGameDetails(temp) {
    //     temp.genreList = [];
    //     if(temp.genres) {
    //         temp.genres.forEach(async (id) => {
    //             var tempname = await this.client.fields('*').where('id = '+id).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/genres/');
    //             console.log(tempname.data[0].name);
    //             temp.genreList.push(<Button key={ tempname.data[0].name } variant="primary" size="sm">{ tempname.data[0].name }</Button>);
    //         });
    //     }

    //     temp.screenList = [];
    //     if(temp.screenshots) {
    //         temp.screenshots.forEach(async (id) => {
    //             var tempname = await this.client.fields('*').where('id = '+id).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/screenshots/');
    //             console.log(tempname.data[0].url);
    //             temp.screenList.push(<Image key={ tempname.data[0].image_id } src={ "https:" + tempname.data[0].url} />);
    //         });
    //     }

    //     return temp;
    // }

    render(){
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to= '/' />;
        if(this.state.currentGameDetails)
        {
            return (
                <div className="container">
                    <NavbarLinks />
                    <br />
                    <Card bg="dark" text="white">
                        {/* <Card.Img src="holder.js/100px270" alt="Card image" /> */}
                        <Card.Body>
                            <Card.Header><h4>{ this.state.currentGameDetails.name }</h4></Card.Header>
                            <Row>
                                <Col sm={3}>
                                    <Image src={ this.state.currentGameDetails.img_path?"https:" + this.state.currentGameDetails.img_path.data[0].url.replace("t_thumb","t_cover_big"):null } rounded />
                                </Col>
                                <Col sm={9} style={{textAlign:"start"}}>
                                    <Card.Title>{ this.state.currentGameDetails.first_release_date?new Date(this.state.currentGameDetails.first_release_date*1000).getFullYear():"NA" }</Card.Title>
                                    <br />
                                    <Card.Text>{ this.state.currentGameDetails.storyline? this.state.currentGameDetails.storyline: this.state.currentGameDetails.summary}</Card.Text>
                                    <br />
                                    <Card.Text>
                                        <ButtonToolbar>
                                            { 
                                                this.state.seen ? 
                                                <Button variant="success" style={{ marginRight: '1rem' }} disabled>
                                                    <FontAwesomeIcon icon="list" />
                                                </Button> :
                                                <Button variant="outline-primary" style={{ marginRight: '1rem' }}>
                                                    <FontAwesomeIcon icon="list" />
                                                </Button>
                                            }
                                            {
                                                this.state.watchlist ?
                                                <Button variant="success" style={{ marginRight: '1rem' }} disabled>
                                                    <FontAwesomeIcon icon="bookmark" />
                                                </Button> :
                                                this.state.seen ?
                                                <Button variant="outline-primary" style={{ marginRight: '1rem' }} disabled>
                                                    <FontAwesomeIcon icon="bookmark" />
                                                </Button> :
                                                <Button variant="outline-primary" style={{ marginRight: '1rem' }}>
                                                    <FontAwesomeIcon icon="bookmark" />
                                                </Button>
                                            }
                                            <Button variant="outline-primary"><FontAwesomeIcon icon="heart" /></Button>
                                        </ButtonToolbar>
                                    </Card.Text>
                                    <br />
                                    <Card.Text>
                                        <ButtonGroup key={this.state.currentGameDetails.genreList.length} aria-label="Basic example">
                                            { this.state.currentGameDetails.genreList }
                                        </ButtonGroup>
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br/>
                </div>
            );
        }
        else
        {
            return (
                <div className="container center">
                    <p>Loading...</p>
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

export default connect(mapStatetoProps)(GameDetails);