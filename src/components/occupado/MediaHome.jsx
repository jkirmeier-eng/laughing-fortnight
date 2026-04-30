import { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getTestimonials } from "../../api/fakeBackend";

export default function MediaHome() {
    const [testimonies, setTestimonies] = useState([]);

    useEffect(() => {
        getTestimonials().then(setTestimonies);
    }, []);

    return (
        <Container className="py-5">
            <Row className="align-items-center g-4">
                <Col lg={7}>
                    <p className="text-uppercase text-muted fw-bold small">Ajay-Media</p>
                    <h1 className="display-4 fw-bold">
                        Campaigns built to turn attention into customers.
                    </h1>
                    <p className="lead text-muted">
                        Ajay-Media uses KAAS to turn one creative direction into multiple
                        testable campaign variations.
                    </p>

                    <div className="d-flex gap-2 mt-4">
                        <Button as={Link} to="/contact" variant="dark">
                            Contact us
                        </Button>
                        <Button as={Link} to="/gallery" variant="outline-dark">
                            View gallery
                        </Button>
                    </div>
                </Col>

                <Col lg={5}>
                    <Card className="border-0 shadow-sm rounded-4">
                        <Card.Body className="p-4">
                            <h4 className="fw-bold">One shoot. Many angles.</h4>
                            <p className="text-muted mb-0">
                                The site now behaves like a frontend wired to a backend, while
                                still using local/session storage.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <hr className="my-5" />

            <h2 className="fw-bold mb-3">Testimonies</h2>

            {testimonies.length > 0 ? (
                <Carousel>
                    {testimonies.map((t, i) => (
                        <Carousel.Item key={i}>
                            <Card className="border-0 bg-light rounded-4">
                                <Card.Body className="p-5">
                                    <h4>“{t.testimony}”</h4>
                                    <p className="text-muted fw-bold mb-0 mt-3">— {t.author}</p>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <p className="text-muted">Loading testimonies...</p>
            )}
        </Container>
    );
}