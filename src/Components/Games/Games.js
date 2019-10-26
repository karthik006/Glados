import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarLinks from '../Navbar'
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import Template from './ViewTemplate'
//import $ from 'jquery'
import igdb from 'igdb-api-node';

class Games extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    async getGamelist(client, game) {
        const temp = await client.fields('*').where('id = '+game.id).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/');
        if(temp.data[0].cover)
            temp.data[0].img_path = await client.fields('*').where('id = '+temp.data[0].cover).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/covers/');
        return temp;
    }

    async performSearch(searchText) {
        const response = await client.search(searchText).request('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/');
        console.log(response);
        var gameRows = []

        response.data.forEach(async (game) => {
            this.getGamelist(client, game).then(result => {
                const gameRow = <Template key={result.data[0].id} game={result.data[0]} />
                gameRows.push(gameRow)
                if(gameRows.length === response.data.length)
                    this.setState({rows: gameRows})
            })
        })

    }

    handleChange = (e) => {
        this.setState({
            s: e.target.value
        })
    }

    handleSubmit = (e) => {
        this.performSearch(this.state.s)
        e.preventDefault();
      }

    render(){
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to= '/' />;

        return (
            <div className="container">
                <NavbarLinks />
                <Form onSubmit={this.handleSubmit}>
                    {/* <Form.Row>
                        <Col>
                            <FormControl type="text" placeholder="Search for a game" className="mr-sm-2" onChange={ this.handleChange }/>
                        </Col>
                        <Col>
                            <Button type="submit" variant="primary">Search</Button>
                        </Col>                        
                    </Form.Row> */}
                    <InputGroup className="mb-3">
                        <FormControl placeholder="Search for a game" aria-label="Search" aria-describedby="basic-addon2" onChange={ this.handleChange }/>
                        <InputGroup.Append>
                            <Button type="submit" variant="primary">Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                <br/>
                { this.state.rows }
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        auth: state.firebase.auth        
    }
}

export default connect(mapStatetoProps)(Games);