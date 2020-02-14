import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    navigate = (id) => {
        this.props.history.push("/recipe/" + id);
    }

    render() {
        return (
            <div>
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
    recipes: state.recipes
})

const mapDispatchToProps = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)