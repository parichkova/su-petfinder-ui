import React from 'react';
import { Link } from '@reach/router';

class Pet extends React.Component {
  render() {
    const { name, animal, breed, media, location, id } = this.props;

    let photos = [];
    let locationJoined = `${location.city}, ${location.state}`;

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo['@size'] === 'pn');
    }

    const hero = photos[0] ? photos[0].value : '';

    return (

        <Link to={`details/${id}`} className="pet">
              <div className="image-container">
              <img src={hero} alt={name} />
            </div>
            <div className="info">
              <h3>{name}</h3>
              <h4>
                {animal} - {breed} - {locationJoined}
              </h4>
            </div>
        </Link>
    );
  }
}

export { Pet };
