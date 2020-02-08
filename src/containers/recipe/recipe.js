import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

export default class Recipe extends Component {
    constructor() {
        super();

        this.state = {
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
            measurement: this.state.measurement
        }

        let { id } = this.props.match.params;
        this.props.addIngredient(id, newIngredient);
    }

    goBack = () => {
        this.props.history.push("/");
    }

   render() {
       let { id } = this.props.match.params;
       let recipe = this.props.recipes.find(r => r.id == id);
       return(
           <div>
               {recipe.name}
               <br />
               {recipe.ingredients.map(i => (
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