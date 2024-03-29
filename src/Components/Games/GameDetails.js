import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarLinks from '../Navbar'
import { Card, Row, Col, Image, Button, ButtonGroup, ButtonToolbar, Modal, Spinner, Carousel } from 'react-bootstrap'
import firebase from '../../Config/fbConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import $ from 'jquery'
//import igdb from 'igdb-api-node';

class GameDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seen: false,
            watchlist: false,
            show: false
        }
        const guid = props.match.params.id;
        //const temp = props.location.aboutProps.game;
        // const genresList = ["", "", "Point-and-click", "", "Fighting", "Shooter", "", "Music",
        //                     "Platform", "Puzzle", "Racing", "Real Time Strategy", "Role-playing", "Simulator",
        //                     "Sport", "Strategy", "Turn-based strategy", "", "", "", "", "", "", "",
        //                     "Tactical", "Hack and slash", "Quiz/Trivia", "", "", "", "Pinball", "Adventure",
        //                     "Indie", "Arcade"]

        // const platformList = ["", "", "", "Linux", "Nintendo 64", "Wii", "PC (Microsoft Windows)", "PlayStation", 
        //                       "PlayStation 2", "PlayStation 3", "", "Xbox", "Xbox 360", "PC DOS", "Mac", "Commodore C64/128", 
        //                       "Amiga", "", "Nintendo Entertainment System (NES)", "Super Nintendo Entertainment System (SNES)", 
        //                       "Nintendo DS", "Nintendo GameCube", "Game Boy Color", "Dreamcast", "Game Boy Advance", "Amstrad CPC", 
        //                       "ZX Spectrum", "MSX", "", "Sega Mega Drive/Genesis", "Sega 32X", "", "Sega Saturn", "Game Boy", 
        //                       "Android", "Sega Game Gear", "Xbox Live Arcade", "Nintendo 3DS", "PlayStation Portable", 
        //                       "iOS", "", "Wii U", "N-Gage", "", "Tapwave Zodiac", "PlayStation Network", "PlayStation Vita", 
        //                       "Virtual Console (Nintendo)", "PlayStation 4", "Xbox One", 
        //                       "3DO Interactive Multiplayer", "Family Computer Disk System", "Arcade", "MSX2", "", 
        //                       "Mobile", "WiiWare", "WonderSwan", "Super Famicom", "Atari 2600", "Atari 7800", "Atari Lynx", 
        //                       "Atari Jaguar", "Atari ST/STE", "Sega Master System", "Atari 8-bit", "Atari 5200", "Intellivision", 
        //                       "ColecoVision", "BBC Microcomputer System", "Vectrex", "Commodore VIC-20", "Ouya", "BlackBerry OS", 
        //                       "Windows Phone", "Apple II", "", "Sharp X1", "Sega CD", "Neo Geo MVS", "Neo Geo AES", "", 
        //                       "Web browser", "", "SG-1000", "Donner Model 30", "TurboGrafx-16/PC Engine", "Virtual Boy", 
        //                       "Odyssey", "Microvision", "Commodore PET", "Bally Astrocade", "SteamOS", "Commodore 16", 
        //                       "Commodore Plus/4", "PDP-1", "PDP-10", "PDP-8", "DEC GT40", "Family Computer (FAMICOM)", 
        //                       "Analogue electronics", "Ferranti Nimrod Computer", "EDSAC", "PDP-7", "HP 2100", "HP 3000", 
        //                       "SDS Sigma 7", "Call-A-Computer time-shared mainframe computer system", "PDP-11", "CDC Cyber 70", 
        //                       "PLATO", "Imlac PDS-1", "Microcomputer", "OnLive Game System", "Amiga CD32", "Apple IIGS", 
        //                       "Acorn Archimedes", "Philips CD-i", "FM Towns", "Neo Geo Pocket", "Neo Geo Pocket Color", 
        //                       "Sharp X68000", "Nuon", "WonderSwan Color", "SwanCrystal", "PC-8801", "TRS-80", "Fairchild Channel F", 
        //                       "PC Engine SuperGrafx", "Texas Instruments TI-99", "Nintendo Switch", "Nintendo PlayStation", 
        //                       "Amazon Fire TV", "Philips Videopac G7000", "Acorn Electron", "Hyper Neo Geo 64", "Neo Geo CD", 
        //                       "New Nintendo 3DS", "VC 4000", "1292 Advanced Programmable Video System", "AY-3-8500", 
        //                       "AY-3-8610", "PC-50X Family", "AY-3-8760", "AY-3-8710", "AY-3-8603", "AY-3-8605", "AY-3-8606", 
        //                       "AY-3-8607", "PC-98", "Turbografx-16/PC Engine CD", "TRS-80 Color Computer", "FM-7", 
        //                       "Dragon 32/64", "Amstrad PCW", "Tatung Einstein", "Thomson MO5", "NEC PC-6000 Series", 
        //                       "Commodore CDTV", "Nintendo DSi", "Nintendo eShop", "Windows Mixed Reality", "Oculus VR", 
        //                       "SteamVR", "Daydream", "PlayStation VR", "Pokémon mini", "PlayStation 5", "", 
        //                       "Xbox Project Scarlett", "Google Stadia"]

        // temp.genreList = [];
        // if(temp.genres) {
        //     temp.genres.forEach((id) => {
        //         temp.genreList.push(<Button key={ id } variant="primary" size="sm">{ genresList[id] }</Button>);
        //     });
        //     this.setState({
        //         currentGameDetails: temp
        //     });
        // }

        // var screenList = [];
        // if(temp.screenshots) {
        //     temp.screenshots.forEach(async (id) => {
        //         this.getGameShots(id).then((result) => {
        //             screenList.push(<Image key={ result.data[0].image_id } src={ "https:" + result.data[0].url.replace("t_thumb", "t_original")} />);
        //         });
        //     });
        //     this.setState({
        //         currentGameScreenshots: screenList
        //     });
        // }

        const urlString = "https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/game/"+ guid +"/?api_key=" + API_KEY + "&format=json";

        $.ajax({
            url: urlString,
            success: (searchResult) => {
                const gameDetails = searchResult.results;
                console.log(gameDetails)

                gameDetails.genreList = []
                if(gameDetails.genres) {
                    gameDetails.genres.forEach((genreName) => {
                        gameDetails.genreList.push(<Button variant="primary" size="sm">{ genreName.name }</Button>)     
                    })
                }
                
                gameDetails.developersList = "";
                if(gameDetails.developers) {
                    gameDetails.developers.forEach((pName) => {
                        gameDetails.developersList += pName.name + ", ";
                    })
                }
                gameDetails.developersList = gameDetails.developersList.substring(0, gameDetails.developersList.length - 2);

                gameDetails.productionList = "";
                if(gameDetails.publishers) {
                    gameDetails.publishers.forEach((pName) => {
                        gameDetails.productionList += pName.name + ", ";
                    })
                }
                gameDetails.productionList = gameDetails.productionList.substring(0, gameDetails.productionList.length - 2);

                gameDetails.platformList = "";
                if(gameDetails.platforms) {
                    gameDetails.platforms.forEach((platName) => {
                        gameDetails.platformList += platName.name + ", ";     
                    })
                }
                gameDetails.platformList = gameDetails.platformList.substring(0, gameDetails.platformList.length - 2);

                gameDetails.similarList = []
                if(gameDetails.similar_games) {
                    gameDetails.similar_games.forEach((simName) => {
                        gameDetails.similarList.push(
                            // <Card>
                            //     <Card.Img src={ tempGame.image.thumb_url }/>
                            // </Card>
                            <li><a href={ simName.api_detail_url.substring(35, simName.api_detail_url.length-1) }>{ simName.name }</a></li>
                        )
                        // $.ajax({
                        //     url: "https://cors-anywhere.herokuapp.com/" + simName.api_detail_url + "/?api_key=" + API_KEY + "&format=json",
                        //     success: (simResult) => {
                        //         const tempGame = simResult.results;
                        //         console.log(tempGame);
                                
                        //     }
                        // })
                    })
                }

                gameDetails.screen = []
                if(gameDetails.images) {
                    for(var i of gameDetails.images) {
                        gameDetails.screen.push(
                            <Carousel.Item style={{textAlign: "center"}}>
                                <img className="img-fluid" src={ i.super_url?i.super_url:null } alt="Screenshot" rounded/>
                            </Carousel.Item>
                        );
                        if(gameDetails.screen.length > 10) {
                            break;
                        } 
                    }
                }

                this.setState({
                    currentGameDetails: gameDetails
                })
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data")
            }
        })

        const { auth } = props;
        this.UID = auth.uid;

        // firebase.firestore().collection(this.UID).doc("Games").collection("Playlist").get().then((snapshot) => {
        //     snapshot.docs.forEach(doc => {
        //         if(doc.id === guid)
        //         {
        //             this.setState({
        //                 watchlist: true
        //             })
        //         }
        //     })
        // })

        firebase.firestore().collection(this.UID).doc("Games").collection("Playlist").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if(doc.id === guid)
                {
                    if(doc._document.proto.fields.Played.stringValue === "Yes") {
                        this.setState({
                            seen: true,
                            watchlist: false
                        })
                    }
                    else {
                        this.setState({
                            watchlist: true
                        })
                    }
                }
                //doc._document.proto.fields.ID
                //console.log(doc._document.proto.fields.ID.stringValue);
            })
        })
        //this.getGameDetails(temp);
    }

    addList = (e) => {
        firebase.firestore().collection(this.UID).doc("Games").collection("Playlist").doc(this.state.currentGameDetails.guid).set({
            "ID": this.state.currentGameDetails.guid,
            "Name": this.state.currentGameDetails.name,
            "Image": this.state.currentGameDetails.image.thumb_url,
            "Release": this.state.currentGameDetails.expected_release_year,
            "Played": "Yes"
        });
        this.setState({
            show: true,
            msg: "Added to playlist."
        });
        // e.target.disabled = true;
        // e.target.variant = "success";
    }

    addMark = (e) => {
        firebase.firestore().collection(this.UID).doc("Games").collection("Playlist").doc(this.state.currentGameDetails.guid).set({
            "ID": this.state.currentGameDetails.guid,
            "Name": this.state.currentGameDetails.name,
            "Image": this.state.currentGameDetails.image.thumb_url,
            "Release": this.state.currentGameDetails.expected_release_year,
            "Played": "No"
        });
        this.setState({
            show: true,
            msg: "Bookmarked and added to wishlist."
        });
    }

    handleClose = (e) => {
        this.setState({
            show: false
        });
    }

    // async getGameGenre(id) {
    //     var tempname = await this.client.fields('*').where('id = '+id).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/genres/');
    //     //console.log(tempname.data[0].name);
    //     tempname.data[0].id = id;
    //     return tempname;
    // }

    // async getGameShots(id) {
    //     var tempname = await this.client.fields('*').where('id = '+id).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/screenshots/');
    //     console.log(tempname.data[0].url);
    //     return tempname;
    // }

    // async getGameDetails(temp) {
    //     temp.screenList = [];
    //     if(temp.screenshots) {
    //         for(var id of temp.screenshots) {
    //             var tempname = await this.client.fields('*').where('id = '+id).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/screenshots/');
    //             console.log(tempname.data[0]);
    //             //t_original
    //             temp.screenList.push(<Image key={ tempname.data[0].image_id } src={ "https:" + tempname.data[0].url.replace("t_thumb", "t_cover_big")} fluid/>);
    //             if(temp.screenList.length === temp.screenshots.length || temp.screenList.length === 3) {
    //                 // this.setState({
    //                 //     currentGameDetails: temp
    //                 // });
    //                 if(temp.videos) {
    //                     var tempvid = await this.client.fields('*').where('id = '+temp.videos[0]).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/game_videos/');
    //                     console.log(tempvid.data[0]);
    //                     //t_original
    //                     temp.screenList.push(<iframe key={ tempvid.data[0].name } title={ tempvid.data[0].name } src={ "https://www.youtube.com/embed/" + tempvid.data[0].video_id }/>);
    //                 }
    //                 this.setState({
    //                     currentGameDetails: temp
    //                 });
    //                 break;
    //             }
    //         }

    //         temp.company_name = [];
    //         if(temp.involved_companies) {
    //             for(var id1 of temp.involved_companies) {
    //                 var tempname1 = await this.client.fields('*').where('id = '+id1).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/involved_companies/');
    //                 //console.log(tempname.data[0]);
    //                 if(tempname1.data[0].company) {
    //                     var compname = await this.client.fields('*').where('id = '+tempname1.data[0].company).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/companies/');
    //                     console.log(compname.data[0].name);
    //                     temp.company_name.push(<Button key={ compname.data[0].name } variant="primary" size="sm">{ compname.data[0].name }</Button>);
    //                 }
    //             }
    //             this.setState({
    //                 currentGameDetails: temp
    //             });
    //         }

    //         temp.plat_names = []
    //         if(temp.platforms) {
    //             for(var id2 of temp.platforms) {
    //                 var tempname2 = await this.client.fields('*').where('id = '+id2).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/platforms/');
    //                 console.log(tempname2.data[0].name);
    //                 temp.plat_names.push(<Button key={ tempname2.data[0].name } variant="primary" size="sm">{ tempname2.data[0].name }</Button>);
    //             }
    //             this.setState({
    //                 currentGameDetails: temp
    //             });
    //         }

    //         temp.similar = []
    //         if(temp.similar_games) {
    //             for(var id3 of temp.similar_games) {
    //                 var tempname3 = await this.client.fields("*").where('id = ' + id3).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/');
    //                 console.log(tempname3);
    //                 // if(tempname3.data[0].cover) {
    //                 //     tempname3.data[0].img_path = await client.fields('*').where('id = '+tempname3.data[0].cover).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/covers/');
                        
    //                 // }
    //                 temp.similar.push(<Button key={ tempname3.data[0].name } variant="primary" size="sm">{ tempname3.data[0].name }</Button>);
    //                 if(temp.similar.length > 4) {
    //                     this.setState({
    //                         currentGameDetails: temp
    //                     });
    //                     break;
    //                 }
    //             }
    //         }
            
    //         temp.web_list = [];
    //         if(temp.websites) {
    //             for(var id4 of temp.websites) {
    //                 var tempname4 = await this.client.fields("*").where('id = ' + id4).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/wesbites/');
    //                 console.log(tempname4);
    //             }
    //         }
            
    //     }
    //     console.log(this.state.currentGameDetails);
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
                    <Card id="1" bg="dark" text="white">
                        {/* <Card.Img src="holder.js/100px270" alt="Card image" /> */}
                        <Card.Body>
                            <Card.Header><h4>{ this.state.currentGameDetails.name }</h4></Card.Header>
                            <Row>
                                <Col sm={3}>
                                    <center>
                                        <Image src={ this.state.currentGameDetails.image.small_url?this.state.currentGameDetails.image.small_url:null } style={{ height: "352px", width: "264px" }} rounded />
                                    </center>
                                </Col>
                                <Col sm={9} style={{textAlign:"start"}}>
                                    <br/>
                                    <Card.Title>{ this.state.currentGameDetails.expected_release_year?this.state.currentGameDetails.expected_release_year:"NA" }</Card.Title>
                                    <Card.Text>{ this.state.currentGameDetails.deck }</Card.Text>
                                    <br />
                                    <Card.Text>
                                        <ButtonToolbar>
                                            { 
                                                this.state.seen ? 
                                                <Button variant="primary" style={{ marginRight: '1rem' }} disabled>
                                                    <FontAwesomeIcon icon="list" />
                                                </Button> :
                                                <Button variant="outline-primary" style={{ marginRight: '1rem' }} onClick={ this.addList }>
                                                    <FontAwesomeIcon icon="list" />
                                                </Button>
                                            }
                                            {
                                                this.state.watchlist ?
                                                <Button variant="primary" style={{ marginRight: '1rem' }} disabled>
                                                    <FontAwesomeIcon icon="bookmark" />
                                                </Button> :
                                                this.state.seen ?
                                                <Button variant="outline-primary" style={{ marginRight: '1rem' }} disabled>
                                                    <FontAwesomeIcon icon="bookmark" />
                                                </Button> :
                                                <Button variant="outline-primary" style={{ marginRight: '1rem' }} onClick={ this.addMark }>
                                                    <FontAwesomeIcon icon="bookmark" />
                                                </Button>
                                            }
                                            <Button variant="outline-primary"><FontAwesomeIcon icon="heart" /></Button>
                                        </ButtonToolbar>
                                        <Modal show={this.state.show} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>{ this.state.currentGameDetails.name }</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>{ this.state.msg }</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="primary" onClick={this.handleClose}>
                                                    Cool!
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Card.Text>
                                    <br />
                                    <Card.Text>
                                        <ButtonGroup aria-label="Basic example">
                                            { this.state.currentGameDetails.genreList }
                                        </ButtonGroup>
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br/>
                    {/* <Card bg="dark" text="white">
                        <Card.Body>
                            { this.state.currentGameDetails.screenList }
                        </Card.Body>
                    </Card> */}
                    <Card id="3" bg="dark" text="white">
                        <Card.Body>
                            <Card.Text>
                                <b>Platforms: </b>
                                { this.state.currentGameDetails.platformList }
                                <br /><br />
                                <b>Developers: </b>
                                { this.state.currentGameDetails.developersList }
                                <br /><br />
                                <b>Publishers: </b>
                                { this.state.currentGameDetails.productionList }
                                <br /><br />
                                <b>Similar Games: </b>
                                <ul>
                                    { this.state.currentGameDetails.similarList }
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card id="4" bg="dark" text="white">
                        <Card.Body>
                        <b>Screenshots: </b>
                            <Carousel>
                                { this.state.currentGameDetails.screen }
                            </Carousel>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card bg="dark" text="white">
                        <Card.Body>
                            <Card.Text>
                                { this.state.currentGameDetails.description? 
                                <div dangerouslySetInnerHTML={{ __html: this.state.currentGameDetails.description
                                    .replace(/<a\b[^>]*>/gi,"").replace(/<\/a>/gi, "")
                                    .replace(/<figure.*?>.*?<\/figure>/ig, "") }} /> :
                                "YEET TO BE RELEASED" }
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            );
        }
        else
        {
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

export default connect(mapStatetoProps)(GameDetails);