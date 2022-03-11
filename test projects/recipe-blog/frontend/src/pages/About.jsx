import {Container, Col, Row} from 'react-bootstrap'

const About = () => {
  return (
    <Container className='pb-3'>
        <Col>
            <Row>
                <h1 className='pb-3'>This Project was made by:</h1>
            </Row>
            <Row className="py-5 text-center">
                <h2>Antonis Zaravelas</h2>
                <h2>Michelle Midori</h2>
                 <h2>Naomi Ninnig</h2>
            </Row>
            <Row>
                <h5>Final Backend Project for DCI</h5>
            </Row>
        </Col>


       

    </Container>
  )
}

export default About