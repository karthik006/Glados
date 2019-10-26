import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarLinks from './Navbar'
import { Carousel, Card } from 'react-bootstrap'

import igdb from 'igdb-api-node';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameDetails: []
        }

        
        this.getGameDetails();
    }

    async getGameDetails() {
        var tempo = [];
        tempo.popular = []
        var temp = await this.client.fields('*').sort("popularity", "desc").where('platforms=48').request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/');
        console.log(temp);
        for(var id = 0;id<temp.data.length;id++) {
            if(temp.data[id].cover) {
                temp.data[id].img_path = await this.client.fields('*').where('id = '+temp.data[id].cover).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/covers/');
                tempo.popular.push(
                    <Carousel.Item key={ temp.data[0].name } style={{textAlign: "center"}}>
                        <img class="img-fluid" style={{maxHeight: "500px"}} src={ "https:" + temp.data[id].img_path.data[0].url.replace("t_thumb", "t_original") } alt="First slide"/>
                    </Carousel.Item>
                );
            }
        }
        
        tempo.e1 = [];

        
        this.setState({
            gameDetails: tempo
        });
    }

    render(){
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to= '/' />;

        return (
            <div className="container">
                <NavbarLinks />
                <br />
                <Card bg="dark" text="white">
                    <Card.Body>
                        <Carousel>
                            { this.state.gameDetails.popular }
                        </Carousel>
                    </Card.Body>
                </Card>
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