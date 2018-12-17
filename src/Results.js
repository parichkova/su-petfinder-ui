import React from 'react';
import pf from 'petfinder-client';
import { Pet } from './Pet';

const API_KEY = '5dbb83b455be2053cfa2d4330f8bb614';
const API_SECRET = '5e7ea4f63794cfd012491a0e0e8ee901';

const petfinder = pf({
  key: API_KEY,
  secret: API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    petfinder.pet
      .find({ output: 'full', location: 'Seattle, WA' })
      .then(data => {
        console.log(data);
        let pets;

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({ pets });
      });
  }

  render() {
    return (
      <div className="search">
        {this.state.pets.map(pet => {
          let breed;

          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(', ');
          } else {
            breed = pet.breeds.breed;
          }

          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={pet.contact}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

export { Results };
