import 'react-papaparse';
import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import * as jsonFileSchema from '../../../schemas/TripFile';
import { Place } from '../Places/Places';
import {getFileExtension, isValidJson} from '../../utils/files';
import { readString } from 'react-papaparse';



const LoadTripModal = ({clearPlaces, setEarthRadius, setUnits, updatePlaces}) => {
  const DEFAULT_RADIUS = 6371;
  const DEFAULT_UNITS = 'km';
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState([]);

  const toggle = () => setModal(!modal);

  const handleChange = (event) => {
    setFiles(event.target.files);
  }

  const setData = (places, radius=DEFAULT_RADIUS, units=DEFAULT_UNITS) => {
    clearPlaces();
    setEarthRadius(radius);
    setUnits(units);
    updatePlaces(places);
    setFiles([]);
  }

  const loadFromCsv = (data) => {
    try {
      const loadedData = readString(data, {dynamicTyping: true});
      const newPlaces = buildPlaceArr(loadedData.data);
      const radius = loadedData.data[1][loadedData[0]?.indexOf('earthRadius')] || DEFAULT_RADIUS;
      const units = loadedData.data[1][loadedData[0]?.indexOf('units')] || DEFAULT_UNITS;
      setData(newPlaces, radius, units);
    } catch (err) {
      alert("Error occurred while loading csv file")
    }
  }

  const loadFromJson = (data) => {
    try {
      const loadedData = JSON.parse(data);
      if (isValidJson(jsonFileSchema, loadedData)) {
          let index = 0;
          const newPlaces = loadedData.places.map((place) => {
            const p = new Place(index, {lat: place.latitude, lng: place.longitude}, place.name || '');
            index++;
            return p;
          });          
          const radius = loadedData.earthRadius || DEFAULT_RADIUS;
          const units = loadedData.units || DEFAULT_UNITS; 
          setData(newPlaces, radius, units);
      } else {
          alert("File does not conform to json schema");
      } 
    } catch (err) {
      alert("Error occurred while loading json file");
    } 
  }

  return (
    <div>
      
      <Button id="load" onClick={() => toggle()}>
        Load
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Select File to Load </ModalHeader>
        <ModalBody>
          Load a previously saved trip in JSON or CSV format!
          <InputGroup>
            <Input type='file' onChange={handleChange} />
            <InputGroupAddon addonType="append">
              <Button
                onClick={() => {
                  if (files.length === 0) {
                    alert("No file selected.");
                  }
                  else {
                    const file = files[0];
                    const reader = new FileReader();
                    reader.onload = ((event) => {
                      const extension = getFileExtension(file.name);
                      if (/json/i.test(extension)) {
                        loadFromJson(event.target.result);
                      } else if (/csv/i.test(extension)) {
                        loadFromCsv(event.target.result);
                      } else {
                        alert("Unknown file extension. Must be csv or json")
                      }
                    }); 
                    reader.readAsText(file);
                    toggle();
                  }
                }}
              >
                Load Trip
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </ModalBody>
        <ModalFooter />
      </Modal>
    </div>
  );
};

const buildPlaceArr = (data) => {
  const places = [];
  if (data.length > 1) {
    const nameIndex = data[0].indexOf("name");
    const latIndex = data[0].indexOf("latitude");
    const lngIndex = data[0].indexOf("longitude");
    for (let i = 1; i < data.length && data[i][0] != null; i++) {
      let name = '';
      if (nameIndex >= 0) {
        name = data[i][nameIndex];
      }
      let lat = data[i][latIndex];
      let lng = data[i][lngIndex];
      places.push(new Place(i - 1, {lat: lat, lng: lng}, name));
    }
    return places;
  }
  
};

export default LoadTripModal;
