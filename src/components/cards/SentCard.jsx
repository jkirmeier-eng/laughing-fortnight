import { Button, Card } from "react-bootstrap";

export default function SentCard(props) {
    return (
        <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
                <p className="text-uppercase text-muted fw-bold small mb-1">
                    Prior contact
                </p>

                <Card.Title className="fw-bold">{props.name}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">{props.email}</Card.Subtitle>

                <Card.Text>{props.message}</Card.Text>

                <Button
                    variant="outline-dark"
                    className="rounded-pill"
                    onClick={() => props.sendFollowUp(props.name, props.email)}
                >
                    Send follow-up
                </Button>
            </Card.Body>
        </Card>
    );
}