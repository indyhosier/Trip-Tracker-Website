import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Button, ButtonGroup } from 'reactstrap';

import LatLon from "./LatLon";
import LoadTripModal from '../Modals/LoadTripModal';
import SaveTripModal from '../Modals/SaveTripModal';


const TopBar = ({ latLonProps, getCurrentLocation, clearPlaces, setEarthRadius, setUnits, updatePlaces, serverSettings }) => {

  return (
    <Container>
      <Row>
        <Col
          xs={{ offset: 0, size: 6 }}
          sm={{ offset: 1, size: 4 }}
          md={{ offset: 1, size: 2 }}
        >
          <ButtonGroup>
            <Button id="findme" onClick={getCurrentLocation} color="secondary" block>{"\u2316"}</Button>
            {/* <SaveTripModal saveAsFile={() => console.log('Needs to be implemented')}></SaveTripModal> */}
            <LoadTripModal
              setEarthRadius={setEarthRadius} 
              clearPlaces={clearPlaces}
              setUnits={setUnits}
              updatePlaces={updatePlaces}
            />
          </ButtonGroup>
        </Col>
        <Col
          xs={{ offset: 0, size: 11 }}
          sm={{ offset: 0, size: 6 }}
          md={{ offset: 0, size: 8 }}
        >
          <LatLon
            id={latLonProps.id}
            moveMarker={latLonProps.moveMarker}
            onChange={latLonProps.onChange}
            onClick={latLonProps.onClick}
            serverSettings={serverSettings}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TopBar;
