import React, { Component } from 'react';

import { Container, Row, Col, Button } from 'reactstrap';

import { CLIENT_TEAM_NAME } from "../../utils/constants";

import CardMember from '../TeamMember/CardMember';
import TeamImage from '../TeamImage/TeamImage';

import Paragraph from "../Paragraph/Paragraph";

import TeamPic from "../../static/images/GitMeme.jpg"

import CristhianImage from "../../static/images/cristhiancarcamo.jpg"

import JesseImage from "../../static/images/JessePic.jpg"

import AlecImage from "../../static/images/alecwatkins.jpg"

import IndyImage from "../../static/images/indy-team-pic.jpg"

import LukeImage from "../../static/images/luke.jpg"



export default class About extends Component {

    jesse_bio = "I am 21 years old and in my third year studying Computer Science and Business Administration. I love to hike, fish, and nap." 

    alec_bio = "I am 22 years old, and from Aurora Colorado. I am a Computer Science Major with a Mathematics "+ 
    "Minor at Colorado State University."+
    " I love to go camping and fishing on my free time. When I am not outside fishing or camping, I am usually"+
    " at home playing videogames. I am excited for this project to give me more experience that will be applicable" +
    " to industry."
    
    indy_bio = "My name is Indiana, or Indy for short. I am currently in my third year, earning a bachelor's degree"+
    " in Computer Sciece at Colorado State University. During my offtime I love to play basketball, workout, and play video games." 

    luke_bio = "Senior computer science student at CSU. Former wildland firefighter. I like hiking, biking, climbing and gaming."

    render() {
        return (
            <Container>

                <Row>
                    <Col sm="11">
                        <h2>{CLIENT_TEAM_NAME}</h2>
                        <TeamImage image={TeamPic} />
                        <Paragraph heading={"Mission Statement"} body={"To connect brews to bros"} />
                    </Col>

                    <Col sm="1">
                        <Button color="primary" onClick={this.props.closePage} xs={1}>
                            Close
                        </Button>
                    </Col>
                </Row>
                <Row>

                    <Col sm="4">
                        <CardMember image={JesseImage} name="Jesse Jason" bio={this.jesse_bio} />
                    </Col>
                    <Col sm="4" >
                        <CardMember image={AlecImage} name="Alec Watkins" bio={this.alec_bio} />
                    </Col>
                    <Col sm="4">
                        <CardMember image={IndyImage} name="Indy Hosier" bio={this.indy_bio} />
                    </Col>
                    <Col sm="4">
                        <CardMember image={LukeImage} name="Luke Johnson" bio={this.luke_bio} />
                    </Col>
               </Row>
            </Container>
        );
    }
}
