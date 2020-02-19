import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { appLoad } from '../../recipes/recipeActions';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    navigate = (id) => {
        this.props.history.push("/recipe/" + id);
    }

    componentDidMount() {
        fetch("https://recipetracker-test.new-labs.co/recipetracker/recipe/" + this.props.user.id + "/all")
            .then(res => {
                if (res.status != 200) {
                    throw new Error();
                }
                return res.json()
            })
            .then(response => {
                this.props.appLoad(response);
            })
            .catch(err => {
                this.setState({ hasError: true });
                console.error(err);
            })
    }

    render() {
        console.log(this.props.recipes);
        return (
            <div>
                <Link to="/create">Create New Recipe</Link>
                {this.props.recipes.recipes.map(r => (
                    <div key={r.id}>
                        <div onClick={() => this.navigate(r.id)}>
                            {r.name}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    recipes: state.recipes,
    user: state.user
})

const mapDispatchToProps = {
    appLoad
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)