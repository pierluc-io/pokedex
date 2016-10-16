import React, { Component, PropTypes } from 'react';
import './Pin.css';

class Pin extends Component {
  render() {
    return (
      <div className="Pin">
        <div className="PinContent">
          <h3 className="PinName">{this.props.item.name}</h3>
        </div>
      </div>
    );
  }
}

Pin.propTypes = {
  item: PropTypes.object.isRequired
}

export default Pin;
