import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const CardMember = (props) => {
  return (
    <div>
      <Card className="text-center">
        <CardImg top width="250px" height="340px" src={props.image} alt="member image" />
        <CardBody>
          <CardTitle tag="h5">{props.name}</CardTitle>
          <CardText>{props.bio}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardMember;