import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Main from './containers/main/main';
import Create from './containers/create/create';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Recipe from './containers/recipe/recipe';
import { appLoad } from './recipes/recipeActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      createSuccess: false
    }
  }

  createRecipe = (newRecipe) => {
    this.setState({ recipes: [...this.state.recipes, newRecipe], createSuccess: true })
  }

  addIngredient = (id, newIngredient) => {
    let recipe = this.state.recipes.find(r => r.id == id);
    if (!recipe.ingredients) {
      recipe.ingredients = [newIngredient];
    } else {
      recipe.ingredients = [...recipe.ingredients, newIngredient];
    }

    this.setState({ recipes: this.state.recipes });
  }

  componentDidMount() {
    fetch("https://recipetracker-test.new-labs.co/recipetracker/recipe/all")
      .then(res => {
        return res.json();
      })
      .then(response => {
        // this.setState({ recipes: response, hasError: false })
        this.props.appLoad(response);
        this.setState({ hasError: false })
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasError: true });
      })
  }

  render() {
    return (
      <div className="App container">
        <h2>Recipe Tracker</h2>
        {this.state.hasError ?
          <Alert onClick={() => this.setState({ hasError: false })} variant="danger">Oops</Alert> : ""}
        {this.state.createSuccess ?
          <Alert onClick={() => this.setState({ createSuccess: false })} variant="success">New Recipe Added</Alert> : ""}
        <Link to="/create">Create New Recipe</Link>

        <Switch>
          <Route
            path="/" exact
            render={(props) => <Main {...props} />}
          />
          <Route
            path="/create"
            render={(props) => <Create {...props} createRecipe={this.createRecipe} />}
          />
          <Route
            path="/recipe/:id"
            render={(props) => <Recipe {...props} recipes={this.props.recipes.recipes} addIngredient={this.addIngredient} />}
          />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = {
  appLoad
};

const mapStateToProps = (state) => ({
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App))
