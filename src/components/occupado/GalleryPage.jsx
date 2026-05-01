import { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { getGalleryItems } from "../../api/fakeBackend";

export default function GalleryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getGalleryItems().then(setItems);
  }, []);

  return (
    <Container className="py-5">
      <p className="text-uppercase text-secondary fw-bold small">Gallery</p>
      <h1 className="display-5 fw-bold">Campaign examples.</h1>
      <p className="lead">
        Dummy media resources pulled through the fake backend.
      </p>

      <Row className="g-4 mt-2">
        {items.map((item) => (
          <Col md={6} lg={4} key={item.id}>
            <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <Card.Img
                variant="top"
                src={item.image}
                alt={`${item.title}: ${item.description}`}
              />
              <Card.Body className="p-4">
                <Badge bg="dark" className="mb-2">
                  {item.type}
                </Badge>

                <h2 className="fw-bold h4">{item.title}</h2>
                <p className="text-secondary">{item.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}