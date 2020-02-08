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

        this.props.createRecipe(this.state.name);
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