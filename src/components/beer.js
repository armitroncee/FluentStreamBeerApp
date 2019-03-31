import React, { Component } from "react";
import axios from "axios";
import Beers from "./beers"


class Beer extends Component {

    state = {
        names: [],
        new: ""
    };

    componentDidMount() {
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://beer.fluentcloud.com/v1/beer`)
            .then(res => res.data.map(result => (
                {
                    name: result.name,
                    id: result.id,
                    likes: result.likes
                })))
            .then(newData => this.setState({ names: newData }))
            .catch(error => alert(error))
    }

    handleInputChange = event => {

        let value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        const name = this.state.new
        const likes = 0

        const data = {
            name,
            likes
        }

        axios.post(`${'https://cors-anywhere.herokuapp.com/'}https://beer.fluentcloud.com/v1/beer`, data)
            .then(res => axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://beer.fluentcloud.com/v1/beer`)
                .then(res => res.data.map(result => (
                    {
                        name: result.name,
                        id: result.id,
                        likes: result.likes
                    })))
                .then(newData => this.setState({ names: newData }))
                .catch(error => alert(error)))

        this.setState({
            new: ""
        })


    }

    updateLikes = id => {

        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://beer.fluentcloud.com/v1/beer/` + id)
            .then(res => axios.put(`${'https://cors-anywhere.herokuapp.com/'}https://beer.fluentcloud.com/v1/beer/` + id, { likes: res.data[0].likes + 1 })
                .then(res => console.log("updated")))
            .then(res => axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://beer.fluentcloud.com/v1/beer`)
                .then(res => res.data.map(result => (
                    {
                        name: result.name,
                        id: result.id,
                        likes: result.likes
                    })))
                .then(newData => this.setState({ names: newData }))
                .catch(error => alert(error)))

    }

    updateDislikes = id => {

        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://beer.fluentcloud.com/v1/beer/` + id)
            .then(res => axios.put(`${'https://cors-anywhere.herokuapp.com/'}https://beer.fluentcloud.com/v1/beer/` + id, { likes: res.data[0].likes - 1 })
                .then(res => console.log("updated")))
            .then(res => axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://beer.fluentcloud.com/v1/beer`)
                .then(res => res.data.map(result => (
                    {
                        name: result.name,
                        id: result.id,
                        likes: result.likes
                    })))
                .then(newData => this.setState({ names: newData }))
                .catch(error => alert(error)))

    }


    render() {
        return (
            <div>
            <h1 className="text-center">My Cooler</h1>
                <form>
                <div className="form-group">
                    <input
                        value={this.state.new}
                        name="new"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Add New Beer"
                        className="form-control form-control-lg mt-5"
                    />
                    </div>
                    <button className="btn btn-success btn-lg btn-block mb-3 mt-2" onClick={this.handleFormSubmit}>Add Beer</button>
                    
                </form>

                <Beers
                    names={this.state.names}
                    updateLikes={this.updateLikes}
                    updateDislikes={this.updateDislikes}
                />
            </div>
        )
    }
}

export default Beer;