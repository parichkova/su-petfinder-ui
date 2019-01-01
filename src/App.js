import { Link, Router } from '@reach/router';
import pf from 'petfinder-client';
import React from 'react';
import { render } from 'react-dom';
import Details from './Details';
import  ResultsWithContext  from './Results';
import SearchParams from './SearchParams';
import { Provider } from './SearchContext';
import Intercom from 'react-intercom';

const API_KEY = '5dbb83b455be2053cfa2d4330f8bb614';
const API_SECRET = '5e7ea4f63794cfd012491a0e0e8ee901';

const petfinder = pf({
  key: API_KEY,
  secret: API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);
      
    this.state = {
      location: 'Seattle, WA',
      animal: 'dog',
      breed: '',
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }

  render() {    
    const user = {
      user_id: 2,
      email: "tyhomira@abv.bg",
      name: "tish"
    };

    return (
      <div>
        <header>
          <Link to="/">Get a Friend</Link>
          <Link to="/search-params">
            <span aria-label="search" role="img">🔍</span>
          </Link>
        </header>
        <Provider value={this.state}>
          <Router>
            <ResultsWithContext path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
        <div className="app">
          <Intercom appID="az33rewf" {...user}/>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getBreeds();
  }

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
        breed: ''
      },
      this.getBreeds
    );
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        } else {
          this.setState({ breeds: [] });
        }
      });
    } else {
      this.setState({ breeds: [] });
    }
  }
}

render(<App />, document.getElementById('root'));