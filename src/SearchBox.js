import React from 'react';
import { ANIMALS } from 'petfinder-client';
import { Consumer } from './SearchContext';

class SearchBox extends React.Component {
  handleFormSubmit = (ev) => {
    ev.preventDefault();
    this.props.search();
  }

  render() {
    return (
      <Consumer>
        {context => (
          <div className="search-params">
            <form onSubmit={ this.handleFormSubmit}>
            
              <label htmlFor="location">
                location
                <input
                  onChange={context.handleLocationChange}
                  id="location"
                  value={context.location}
                  placeholder="Location"
                />
              </label>
              <label htmlFor="animal">
                Animal
                <select
                  onChange={context.handleAnimalChange}
                  onBlur={context.handleAnimalChange}
                  id="animal"
                  value={context.animal}
                  placeholder="Animal"
                >
                  {ANIMALS.map(animal => (
                    <option key={animal} value={animal}>
                      {animal}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="breed">
                Breed
                <select
                  id="breed"
                  value={context.breed}
                  onChange={context.handleBreedChange}
                  onBlur={context.handleBreedChange}
                  disabled={!context.breeds.length}
                >
                  <option key="Not set" value="Not set">
                    Not set
                  </option>
                  {context.breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>
              <button>Search</button>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;
	