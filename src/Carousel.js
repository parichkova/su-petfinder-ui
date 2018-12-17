import React from 'react';
import ReactDOM from 'react-dom';
import { router } from '@reach/router';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

  //  this.handleIndexClick = this.handleIndexClick.bind(this)
  }

  state = {
    photos: [],
    active: 0
  };

  static getDerivedStateFromProps({media}) {
    let photos = [];
  
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo['@size'] === 'pn');
    }

    return { photos };
  }

  handleIndexClick = (event) => {

    this.setState({
      active: parseInt(event.target.dataset.index, 10),
    })
  }


  render() {
    const {photos, active } = this.state;
    return(
      <div className="carousel">
        <img src={photos[active].value} alt="3"/>
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /* eslint-disable-next-line */
            <img
              onClick={this.handleIndexClick}
              key={photo.value}
              src={photo.value}
              alt={index}
              data-index={index}
              className={index === active ? 'active': ''}
              />
          ))}
        </div>
      </div>
    )
  }
}

export { Carousel };
