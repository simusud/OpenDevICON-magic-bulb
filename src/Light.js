import React from 'react';
import Bulb from 'react-bulb';
 
export default (props) => (
  <Bulb
    size={60}
    color={props.color}
  />
);