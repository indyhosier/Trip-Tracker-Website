import React from 'react'
import { Container, Media, Row, Col } from 'reactstrap';

const TeamImage = (props) => {
    return (
    <Container>
        <Row>
            <Col sm={12} md={{size:6,offset:3}}>
                <Media>
                    <Media width='100%' src={props.image} alt = "team image" />
                </Media>   
            </Col>
        </Row>
    </Container>
    )
}
export default TeamImage;