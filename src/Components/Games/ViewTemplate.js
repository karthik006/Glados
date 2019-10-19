import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Card, Button, Row, Col, Image } from 'react-bootstrap';

class Template extends Component {
    render(){
        return (
            <Card>
                <Card.Body>
                    <Row>
                        <Col sm={2}>
                            <center>
                                <Image src={ this.props.game.img_path?"https:" + this.props.game.img_path.data[0].url:null } rounded/>
                                </center>
                        </Col>
                        <Col sm={10}>
                            <Card.Title>{ this.props.game.name }</Card.Title>
                            {/* { console.log(this.props.game) } */}
                            <Card.Subtitle className="mb-2 text-muted">
                                { this.props.game.first_release_date?new Date(this.props.game.first_release_date*1000).getFullYear():"NA" }
                            </Card.Subtitle>
                            {/* <Card.Text>
                                { this.props.game.summary }
                            </Card.Text> */}
                            <NavLink to={{ pathname: '/Game/' + this.props.game.id, aboutProps:{game: this.props.game} }}><Button variant="dark">View</Button></NavLink>
                        </Col>
                    </Row>
                </Card.Body>    
            </Card>
        );
    }
}

export default Template;