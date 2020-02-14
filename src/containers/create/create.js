import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class Create extends Component {
    constructor() {
        super();

        this.state = {
            name: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const httpRequest = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {"Content-Type": "application/json"}
        };

        fetch("https://recipetracker-test.new-labs.co/recipetracker/recipe", httpRequest)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(response => {
                this.props.createRecipe(response);
            })
            .catch(err => {
                console.log(err);
            })

        this.props.history.push("/");
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="recipe">
                        <Form.Label>Recipe Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Recipe Name"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                        />
                        <br />
                        <Button
                            type="submit"
                            variant="outline-success"
                        >Create</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}