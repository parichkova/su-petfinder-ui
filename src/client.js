import React from 'react';
import Modal from './Modal';

class WS extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      petName: 'nada'
    };
    this.socket = new WebSocket('ws://localhost:8081/');
    this.init();
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    let modal = null;

    if (this.state.showModal) {
      modal = (
        <div>
          <Modal>
            <h1>
              Woohoo {this.props.name.toUpperCase()} adopted{' '}
              {this.state.petName} (party)
            </h1>
            <div className="buttons">
              <button onClick={this._toggleModal}>Yes</button>
              <button onClick={this._toggleModal}>No</button>
            </div>
          </Modal>
        </div>
      );
    } else {
      modal = null;
    }

    return modal;
  }

  init() {
    this.socket.onopen = event => {
      this.log('Opened connection 🎉');
    };

    this.socket.onerror = event => {
      this.log('Error: ' + JSON.stringify(event));
    };

    this.socket.onmessage = event => {
      const message = JSON.parse(event.data);

      this.setState({ petName: message.message });
      this._toggleModal();
      this.log('Received: ' + event.data);
    };

    this.socket.onclose = event => {
      this.log('Closed connection 😱');
    };
  }

  _toggleModal = param => {
    console.log('toggled');
    this.setState({ showModal: !this.state.showModal });
  };

  log(text) {
    console.log(text);
  }
}

export default WS;
