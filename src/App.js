import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Main from './containers/main/main';
import Create from './containers/create/create';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Recipe from './containers/recipe/recipe';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      createSuccess: false,
      recipes: [
        {
          id: 0,
          name: "Cheesecake",
          ingredients: [
            {
              ingredient: "Cream Cheese",
              quantity: 8,
              measurement: "ounces"
            },
            {
              ingredient: "Eggs",
              quantity: 2,
              measurement: "each"
            }
          ]
        },
        {
          id: 1,
          name: "French Toast",
          ingredients: [
            {
              ingredient: "Eggs",
              quantity: 2,
              measurement: "each"
            },
            {
              ingredient: "Bread",
              quantity: 1,
              measurement: "each"
            }
          ]
        }
      ]
    }
  }

  createRecipe = (name) => {
    let newRecipe = {
      id: this.state.recipes.length,
      name: name
    }

    this.setState({ recipes: [...this.state.recipes, newRecipe], createSuccess: true })
  }

  addIngredient = (id, newIngredient) => {
    let recipe = this.state.recipes.find(r => r.id == id);
    recipe.ingredients = [...recipe.ingredients, newIngredient];

    this.setState({ recipes: this.state.recipes });
  }

  render() {
    return (
    <div className="App container">
      <h2>Recipe Tracker</h2>
      {this.state.createSuccess ?
      <Alert onClick={() => this.setState({ createSuccess: false})} variant="success">New Recipe Added</Alert> : ""}
      <Link to="/create">Create New Recipe</Link>

      <Switch>
        <Route
        path="/" exact
        render={(props) => <Main {...props} recipes={this.state.recipes} />}
        />
        <Route
        path="/create"
        render={(props) => <Create {...props} createRecipe={this.createRecipe} />}
        />
        <Route
        path="/recipe/:id"
        render={(props) => <Recipe {...props} recipes={this.state.recipes} addIngredient={this.addIngredient} />}
        />
      </Switch>
    </div>
    );
  }
}
