import React from 'react';
import pf from 'petfinder-client';
import { navigate } from '@reach/router';
import { Carousel } from './Carousel';
import Modal from './Modal';

const API_KEY = '5dbb83b455be2053cfa2d4330f8bb614';
const API_SECRET = '5e7ea4f63794cfd012491a0e0e8ee901';

const petfinder = pf({
  key: API_KEY,
  secret: API_SECRET
});

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showModal: true,
    };
  }

  componentDidMount() {
    petfinder.pet
      .get({
        output: 'full',
        id: this.props.id
      })
      .then(data => {
        let breed;
        let dataPet = data.petfinder.pet;

        if (Array.isArray(dataPet.breeds.breed)) {
          breed = dataPet.breeds.breed.join(', ');
        } else {
          breed = dataPet.breeds.breed;
        }

        this.setState({
          loading: false,
          name: dataPet.name,
          animal: dataPet.animal,
          media: dataPet.media,
          description: dataPet.description,
          location: `${dataPet.contact.city}, ${dataPet.contact.state}`,
          breed
        });
      })
      .catch(() => {
        navigate('/');
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    const { 
      animal,
      name,
      breed,
      location,
      description,
      media,
      showModal } = this.state;
    let modal;

    if (showModal) {
      modal = <Modal>
            <h1>
              Would you like to adopt { name }?
            </h1>
            <div className="buttons">
              <button onClick={this._toggleModal}>Yes</button>
              <button onClick={this._toggleModal}>No</button>
            </div>
          </Modal>
    } else {
      modal = null;
    }
  
    return (
      <div className="details">
      <Carousel media={media}/>
        <div>
          <h1 ref={el => (this.myH1 = el)}>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <button onClick={this._toggleModal}>Adopt { name }</button>
          <p>{description}</p>
            {modal}
        </div>
      </div>
    );
  }

  _toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }
}

export default Details;
