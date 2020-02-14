import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

export default class Recipe extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            ingredients: [],
            ingredient: "",
            quantity: 0,
            measurement: ""
        }
    }

    handleIngredientChange = (event) => {
        this.setState({ ingredient: event.target.value })
    }

    handleQuantityChange = (event) => {
        if (event.target.value <= 0) {
            return;
        }
        this.setState({ quantity: event.target.value })
    }

    handleMeasurementChange = (event) => {
        this.setState({ measurement: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let newIngredient = {
            ingredient: this.state.ingredient,
            quantity: this.state.quantity,
            measurement: this.state.measurement,
            recipeId: this.props.match.params.id
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(newIngredient),
            headers: {"Content-Type": "application/json"}
        }

        fetch("https://recipetracker-test.new-labs.co/recipetracker/ingredient", requestOptions)
            .then(res => {
                return res.json()
            })
            .then(response => {
                this.setState({ ingredients: [...this.state.ingredients, response ]})
            })
    }

    goBack = () => {
        this.props.history.push("/");
    }

    componentDidMount() {
        let { id } = this.props.match.params;
        fetch("https://recipetracker-test.new-labs.co/recipetracker/ingredient/" + id)
            .then(res => {
                return res.json()
            })
            .then(response => {
                this.setState({ ingredients: response, loading: false});
            })
    }

   render() {
       let { id } = this.props.match.params;
       let recipe = this.props.recipes.find(r => r.id == id);
       return(
           <div>
               {recipe && recipe.name}
               <br />
               {this.state.ingredients.map(i => (
                   <div style={{fontSize: 14}}>
                       {i.ingredient}
                       <br />
                       <div style={{fontSize: 10}}>
                            {i.quantity} {i.measurement}
                       </div>
                    </div>
               ))}
               <br />
               <Form onSubmit={this.handleSubmit}>
                   <Form.Label>Name:</Form.Label>
                   <Form.Control
                        type="text"
                        placeholder="Ingredient"
                        value={this.state.ingredient}
                        onChange={this.handleIngredientChange}
                    />
                    <br />
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="1"
                        value={this.state.quantity}
                        onChange={this.handleQuantityChange}
                    />
                    <br />
                    <Form.Label>Measurement</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="each"
                        value={this.state.measurement}
                        onChange={this.handleMeasurementChange}
                    />
                    <br />
                    <Button type="submit" variant="outline-success" size="sm">Add</Button>
               </Form>
               <br />
               <Button onClick={this.goBack} variant="outline-primary" size="sm">Go Back</Button>
           </div>
       )
   } 
}