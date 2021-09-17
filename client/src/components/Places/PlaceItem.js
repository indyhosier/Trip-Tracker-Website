import React from 'react';
import {ListGroupItem, Container, Row, Col, Button, ButtonGroup} from 'reactstrap';

export const PlaceItem = ({places, location, onClick, isActive, distances, units, remove, swap}) => {

    return (
        <ListGroupItem onClick={onClick} active={isActive(location.id)}>
                    <Container>
                        <Row>
                            <Col xs={8} s={6} md={9}>
                                {`${places.indexOf(location) + 1})  `}
                                {`${location.addressLabel || location.placeName + " | " + location.latLng.lat + ", " + location.latLng.lng || ''}`}
                            </Col>
                            <Col sm="1">
                                <ButtonGroup>
                                    {/* <DynamicButtonDropdown dropdownLabel="Actions" dropdownToggleSize="sm" dropdownToggleColor="secondary" buttonPropsArr={buttonProps}/> */}
                                    <Button onClick={() => swap(places.indexOf(location), places.indexOf(location) + 1)} disabled={places.indexOf(location) === places.length - 1}>{"\u25bc"}</Button>
                                    <Button onClick={() => swap(places.indexOf(location), places.indexOf(location) - 1)} disabled={places.indexOf(location) === 0}>{"\u25b2"}</Button>
                                    <Button onClick={() => remove(location)} size="md" color="danger">{"\u2715"}</Button>
                                </ButtonGroup>   
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8} md={10}>
                                {places.indexOf(location) != places.length - 1 ? `Distance to next place: ${distances[places.indexOf(location)]}${units}` : `Distance to start: ${distances[places.indexOf(location)]}${units}`}
                            </Col>                            
                        </Row>                        
                    </Container> 
            </ListGroupItem>
    )
}