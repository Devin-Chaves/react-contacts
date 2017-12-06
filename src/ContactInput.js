import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import MaskedInput from 'react-text-mask';

import 'react-datepicker/dist/react-datepicker.css';
import './ContactInput.css';

class ContactInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      birthday: null
    };

    this.highlightWithRanges = [
      {
        'react-datepicker__day--highlighted-override': [
          moment().add(11, 'days')
        ]
      }
    ];

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleDateChange(date) {
    this.setState({
      birthday: date
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddContact(this.state);
    this.props.onCloseModal();
    this.setState({
      name: '',
      phone: ''
    });
  }

  render() {
    return (
      <div className="ContactInput">
        <form className="" onSubmit={this.handleSubmit}>
          <label htmlFor="inputContactName" className="">
            Name *
          </label>

          <input
            name="name"
            type="text"
            className="ContactInput__input"
            id="inputContactName"
            value={this.state.name}
            onChange={this.handleInputChange}
            placeholder="Ex. Devin Chaves"
          />

          <label htmlFor="inputContactPhone" className="">
            Phone Number *
          </label>

          <MaskedInput
            mask={[
              '(',
              /[1-9]/,
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
              /\d/
            ]}
            name="phone"
            type="text"
            className="ContactInput__input"
            id="inputContactPhone"
            value={this.state.phone}
            onChange={this.handleInputChange}
            placeholder="Ex. (555)-555-5555"
          />

          <label htmlFor="inputContactBirthday" className="">
            Birthday *
          </label>
          <DatePicker
            className="ContactInput__input"
            selected={this.state.birthday}
            onChange={this.handleDateChange}
            highlightDates={this.highlightWithRanges}
            placeholderText="Select Date"
          />

          <button type="submit" className="ContactInput__submit">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default ContactInput;
