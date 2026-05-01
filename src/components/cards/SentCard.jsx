import { Button, Card } from "react-bootstrap";

export default function SentCard(props) {
    return (
        <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
                <p className="text-uppercase text-secondary fw-bold small mb-1">
                    Prior contact
                </p>

                <h3 className="fw-bold h5">{props.name}</h3>
                <p className="text-secondary mb-3">{props.email}</p>

                <p>{props.message}</p>

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