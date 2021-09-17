import React, {useState, } from 'react';
import {Button, ButtonGroup, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter,ListGroup, ListGroupItem} from 'reactstrap';
import {sendServerRequest} from '../../utils/restfulAPI'


const LatLon =(props) =>{
    const [foundPlaces, setFoundPlaces] = useState([]);
    const [modal, setModal] = useState(false);
    const toggle = () => {findRequest()};
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [inputValue, setInputValue] = useState("")
    
  function sendFindRequest(match, limit){
    sendServerRequest({requestType: "find", match:match, limit:limit}, props.serverSettings.serverPort)
    .then(findResponse => {
        if (findResponse) {
          setFoundPlaces(findResponse.places)
        }
    }).catch(err => console.log(err));
}

    async function findRequest(){
      if(inputValue == ""){
        window.alert("Nothing entered!");
      }
      else if(!(/^[a-zA-Z0-9_ ]*$/.test(inputValue))){
        window.alert("Invalid Characters!");
      }
      else{
        setModal(!modal)
        try {
              sendFindRequest(inputValue, 30)
        }
        catch(err) {
            console.log('Find Request Error', err)
        }
      }

    }
    function handleSubmitPressed() {
      const selectionData = foundPlaces[selectedIndex];
      resetModal();
      const latLng = {lat: parseFloat(selectionData.latitude), lng: parseFloat(selectionData.longitude)};
      props.moveMarker(latLng, true)
      
    }
    function handleListItemSelected(index) {
      setSelectedIndex(index)
    }

    function resetModal() {
      setModal(!modal);
      setSelectedIndex(-1);
    }
    function handleChange(event) {
      setInputValue(event.target.value);
      props.onChange(event.target.value)
    }

    const renderFoundPlaces = () => {
        return foundPlaces?.map((data, index) => (
        <ListGroupItem
          key={index}
          tag="button"
          color="secondary"
          active = {selectedIndex === index}
          onClick={() => handleListItemSelected(index)}
        > 
        {[data.name + ", " + data.municipality + ", " + data.region + ", " + data.country + (data.iataCode ? ", " + data.iataCode : "")]}
        </ListGroupItem>
        )) 
    }

    const onKeyUp = (event) => {
      if (event.key === 'Enter') {
        toggle();
      }
    }

  return (
  <div>
      <InputGroup>
          <Input onChange={handleChange} onKeyUp={onKeyUp} placeholder="Enter a Coordinate Or Name Of Location" />
          <ButtonGroup>
              <Button id='takeMe' onClick={() => props.onClick()}>Coordinates</Button>
              <Button id='showMe' onClick={toggle}>Place</Button>
          </ButtonGroup>
      </InputGroup>
    <Modal isOpen={modal} toggle={toggle} scrollable={true}>
      <ModalHeader toggle={toggle}>Found Items!</ModalHeader>
      <ModalBody>
      <ListGroup>
        {renderFoundPlaces()}
      </ListGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          disabled={selectedIndex === -1}
          onClick={handleSubmitPressed}
        >
          Add to trip!
        </Button>
      </ModalFooter>
    </Modal>
  </div>
  )
}

export default LatLon;


