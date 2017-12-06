import React, { Component } from 'react';
import ContactInput from './ContactInput';
import moment from 'moment';
import ReactModal from 'react-modal';
// import axios from 'axios';
import './App.css';
import logo from './magnetic_logo_white.png';

var contacts = [
  {
    name: 'Devin Chaves',
    phone: '(316) 516-2346',
    birthday: '2017-08-13'
  },
  {
    name: 'Kim Kretchmar',
    phone: '(316) 990-2443',
    birthday: '2017-08-14'
  },
  {
    name: 'Jeff Chaves',
    phone: '(316) 641-2449',
    birthday: '2017-08-15'
  }
];

ReactModal.setAppElement('#root');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts
      // showModal: false
    };

    this.handleAddContact = this.handleAddContact.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  // // the api request function
  // fetchApi(url) {
  //   axios
  //     .get(url)
  //     .then(res => res.json())
  //     .then(data => {
  //       // update state with API data
  //       this.setState({
  //         contacts: data
  //       });
  //     })
  //     .catch(err => console.log('oh no!'));
  // }
  //
  // componentDidMount() {
  //   let url = `http://localhost:5000/contacts`;
  //   this.fetchApi(url);
  // }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleAddContact(contact) {
    this.setState({ contacts: [...this.state.contacts, contact] });
  }

  handleRemoveContact(index) {
    this.setState({
      contacts: this.state.contacts.filter(function(e, i) {
        return i !== index;
      })
    });
  }

  render() {
    return (
      <div className="">
        <header className="header">
          <div className="header__logo">
            <img src={logo} alt="" />
          </div>
        </header>
        <div className="container">
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick={true}
            className="Modal"
            overlayClassName="Overlay"
          >
            <div className="ContactInput__header">
              <h4 className="ContactInput__title">Client Info</h4>
              <div
                className="ContactInput__close"
                onClick={this.handleCloseModal}
              />
            </div>
            <hr className="ContactInput__hr" />
            <ContactInput
              onAddContact={this.handleAddContact}
              onCloseModal={this.handleCloseModal}
            />
          </ReactModal>
          <div className="ContactTable__header">
            <h2>Clients</h2>
            <button
              className="ContactTable__add"
              onClick={this.handleOpenModal}
            >
              Add Client
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Birthday</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              {this.state.contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{moment(contact.birthday).format('MM-DD-YYYY')}</td>
                  <td>
                    <span
                      className="ContactTable__delete"
                      onClick={this.handleRemoveContact.bind(this, index)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
