import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class Create extends Component {
    constructor() {
        super();

        this.state = {
            name: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const newRecipe = {
            name: this.state.name,
            userId: this.props.user.id
        }

        const httpRequest = {
            method: "POST",
            body: JSON.stringify(newRecipe),
            headers: {"Content-Type": "application/json"}
        };

        fetch("https://recipetracker-test.new-labs.co/recipetracker/recipe", httpRequest)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(response => {
                this.props.history.push("/");
            })
            .catch(err => {
                console.log(err);
            })

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

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create)