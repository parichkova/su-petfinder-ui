import React from 'react';
import pf, { ANIMALS } from 'petfinder-client';

const API_KEY = '5dbb83b455be2053cfa2d4330f8bb614';
const API_SECRET = '5e7ea4f63794cfd012491a0e0e8ee901';

const petfinder = pf({
  key: API_KEY,
  secret: API_SECRET
});

// const petfinder = pf({
//   key: process.env.API_KEY,
//   secret: process.env.API_SECRET,
// })

class SearchParams extends React.Component {

  state = {
    location: 'Seattle, WA',
    animal: '',
    breed: '',
    breeds: []
  }

  handleAnimalChange = (event) => {
    this.setState({
      animal: event.target.value,
      breed: '',
    }, this.getBreed);
  }

  handleBreedChange  = (event) => {
    this.setState({
      breed: event.target.value
    })
  }

  handleLocationChange = (event) => {
    this.setState({
      location: event.target.value
    });
  }

  getBreed() {
    if (this.state.animal) {
      
      petfinder.breed.list({animal: this.state.animal}).then((data) => {
        const pt = data.petfinder;
        const { breeds} = pt;


        if (pt && breeds && Array.isArray(breeds.breed)) {
          this.setState({
            breeds: breeds.breed,
          })
        } else {
          this.setState({breeds: []});
        }

      }).catch(() => {

      })
      return;
    }

    this.setState({
      breeds: []
    });
  }

  render() {
    return(
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input 
            id="location"
            type="text"
            value={this.state.location}
            placeholder="location"
            onChange={this.handleLocationChange}/>
        </label>
        <label htmlFor="animal">
        Animal
        <select 
            id="animal" 
            value={this.state.animal} 
            onChange={this.handleAnimalChange}
            onBlur={this.handleAnimalChange}>
            (
              {
                ANIMALS.map(animal => (
                  <option key={animal}
                  value={animal}>
                    {animal}
                  </option>
                ))
              }
            )
        </select>
        </label>
          <label htmlFor="breed">
            Breed
            <select 
              id="breed"
              value={this.state.breed}
              onChange={this.handleBreedChange}
              onBlur={this.handleAnimalChange}
              disabled={!this.state.breeds.length}
              >
              (
                {
                  this.state.breeds.map(breed => (
                    <option key={breed}
                    value={breed}>
                      {breed}
                    </option>
                  ))
                }
              )
            </select>
        </label>
        <button> Submit </button>
      </div>
    )
  }
}

export { SearchParams};