import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'dGpQ5OmGP2SgfvZimlpCUoF4iOag9qzZ';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

// Code SearchableMovieReviewsContainer Here

class SearchableMovieReviewsContainer extends Component {
    state = {
        searchTerm: "",
        reviews: []
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        
        fetch(URL + `&query=` + this.state.searchTerm)
        .then(res => res.json())
        .then(data => {
            this.setState({ reviews: data.results })
        })
    }

    render(){
        return(
            <div className="searchable-movie-reviews">
                <form onSubmit={ this.handleFormSubmit }>
                    <input type="text" onChange={ this.handleInputChange } name="search" />
                    <input type="submit" value="Search Movie Reviews" />
                </form>
                <h1>Search: { this.state.searchTerm }</h1>
                <MovieReviews reviews={ this.state.reviews } />
            </div>
        )
    }
}

export default SearchableMovieReviewsContainer