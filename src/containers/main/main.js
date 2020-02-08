import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Main extends Component {
    constructor() {
        super();
    }

    navigate = (id) => {
        this.props.history.push("/recipe/" + id);
    }

    render() {
        return (
            <div>
                {this.props.recipes.map(r => (
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