
import React, {useEffect, useState} from 'react';
import { Button, ListGroup, ListGroupItem, Container, Row, Col, ButtonGroup} from 'reactstrap';
import {PlaceItem} from './PlaceItem';
import {sendServerRequest} from '../../utils/restfulAPI';


export const Places = ({places, markerLocation, earthRadius, clearOrCloseLabel, remove, clearOrClose, goTo, units, serverSettings, reverse, swap}) => {
    const [selected, setSelected] = useState(null);
    const [distances, setDistances] = useState([]);
    const isActive = (id) => {
        return id === selected;
    }

    useEffect( () => {
        //Get LatLng(s) into a map
        let placeList = places.map((location) => {
            return {latitude: `${location.latLng.lat}`,longitude: `${location.latLng.lng}` };
        });
        async function getDistances() {
            try {
                await distancesRequest(placeList, earthRadius);
            } catch (err) {
                console.log(err);
            }
        }
        getDistances();
        // effect sets active place in list to wherever the marker currently is
        for (let place in places) {
            if (places[place].latLng === markerLocation) {
                setSelected(places[place].id);
            }
        }
    }, [places])

    function sendDistancesRequest(places,earthRadius) {
        sendServerRequest({requestType: "distances", places:places, earthRadius:earthRadius}, serverSettings.serverPort)
        .then(distancesResponse => {
            if (distancesResponse) {
                setDistances(distancesResponse.distances);
                
            } else {
                console.log("The Distances Request To The Server Failed. Please Try Again Later.", "error");
            }
        }).catch(() => alert("Error calculating trip distances"));
    }
    async function distancesRequest(places, radius) {
        
        try {
            sendDistancesRequest(places,radius);
        }
        catch(err) {
            console.log('Distances request unsuccessful', err);
        }
    }

    const items = places.map((location) => {
        return (
            <PlaceItem 
                key={location.id} 
                onClick={() => {goTo(location.latLng, false); setSelected(location.id)}} 
                isActive={isActive} 
                location={location} 
                places={places} 
                distances={distances}
                units={units}
                remove={remove}
                swap={swap}
            />
        )
    })

    return (
        <ListGroup>
            <ListGroupItem color="secondary">
                <Container>
                    <Row>
                        <Col xs={8} lg={10}>
                            {`Total Trip Distance: ${distances.reduce(getSum,0)}${units}`}
                        </Col>
                        <Col xs={0} md={0} lg={1}>
                            <ButtonGroup>
                                <Button id='reverse' size="xs" color="primary" onClick={reverse}>
                                    Reverse
                                </Button>
                                <Button id='clearOrCloseBtn' size="xs" color="danger" onClick={clearOrClose}>
                                    {clearOrCloseLabel}
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
            </ListGroupItem>             
            {items}
        </ListGroup>
      );
};

function getSum(total, num) {
        return total + Math.round(num);
    }

export function Place(id, latLng, placeName='', type='', address='', city='', subregion='', country='', addressLabel='') {
    this.id = id;
    this.placeName = placeName;
    this.type = type;
    // latlLng should be an object like {lat: <lat coordinates>, lng: <long coordinates>}
    this.latLng = latLng;
    this.city = city;
    this.address = address;
    this.subregion = subregion;
    this.country = country;
    this.addressLabel = addressLabel;
}
