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

        this.editor = [];
        this.editor.push({"guid": "3030-36765", "name": "Grand Theft Auto V", "img": "https://images.igdb.com/igdb/image/upload/t_original/co1nt4.jpg"});
        this.editor.push({"guid": "3030-29441", "name": "Sleeping Dogs", "img": "https://images.igdb.com/igdb/image/upload/t_original/co1ij2.jpg"});
        this.editor.push({"guid": "3030-22928", "name": "Assassin's Creed II", "img": "https://images.igdb.com/igdb/image/upload/t_original/co1rcf.jpg"});
        this.editor.push({"guid": "3030-21170", "name": "Portal", "img": "https://images.igdb.com/igdb/image/upload/t_original/co1plc.jpg"});
        this.editor.push({"guid": "3030-23245", "name": "Batman: Arkham Asylum", "img": "https://images.igdb.com/igdb/image/upload/t_original/co1nmb.jpg"});
        this.editor.push({"guid": "3030-21500", "name": "L.A. Noire", "img": "https://images.igdb.com/igdb/image/upload/t_original/co1s0g.jpg"});

        // e1[0].guid = "3030-36765";
        // e1[0].name = "Grand Theft Auto V";
        // e1[0].img = "https://images.igdb.com/igdb/image/upload/t_original/co1nt4.jpg";

        // e1[1].guid = "3030-29441";
        // e1[1].name = "Sleeping Dogs";
        // e1[1].img = "https://images.igdb.com/igdb/image/upload/t_original/co1ij2.jpg";

        // e1[2].guid = "3030-22928";
        // e1[2].name = "Assassin's Creed II";
        // e1[2].img = "https://images.igdb.com/igdb/image/upload/t_original/co1rcf.jpg";

        // e1[3].guid = "3030-21170";
        // e1[3].name = "Portal";
        // e1[3].img = "https://images.igdb.com/igdb/image/upload/t_original/co1plc.jpg";

        // e1[4].guid = "3030-23245";
        // e1[4].name = "Batman: Arkham Asylum";
        // e1[4].img = "https://images.igdb.com/igdb/image/upload/t_original/co1nmb.jpg";

        // e1[5].guid = "3030-21500";
        // e1[5].name = "L.A. Noire";
        // e1[5].img = "https://images.igdb.com/igdb/image/upload/t_original/co1s0g.jpg";

        // const API_KEY = "be4be496b4cbadd105c4f10780c4ea73f51e7fbd";
        
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
                    <Carousel.Item key={ temp.data[id].name } style={{textAlign: "center"}}>
                        <img className="img-fluid" style={{maxHeight: "500px"}} src={ "https:" + temp.data[id].img_path.data[0].url.replace("t_thumb", "t_original") } alt="First slide"/>
                    </Carousel.Item>
                );
            }
        }
        
        tempo.e1 = [];
        for(var i=0;i<this.editor.length;i++) {
            tempo.e1.push(
                <Carousel.Item key={ this.editor[i].guid } style={{textAlign: "center"}}>
                    <img className="img-fluid" style={{maxHeight: "500px"}} src={ this.editor[i].img } alt="First slide"/>
                </Carousel.Item>
            );
        }
        
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
                        <h4>POPULAR ON PS4</h4>
                        <Carousel>
                            { this.state.gameDetails.popular }
                        </Carousel>
                    </Card.Body>
                </Card>
                <br />
                <Card bg="dark" text="white">
                    <Card.Body>
                        <h4>EDITORS CHOICE</h4>
                        <Carousel>
                            { this.state.gameDetails.e1 }
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