import React from 'react';
import { Media } from 'reactstrap';

const Paragraph = (props) => {
    return (
      <Media>
        <Media body>
          <Media heading>
            {props.heading}
          </Media>
          {props.body}
        </Media>
      </Media>
    );
  };

export default Paragraph;