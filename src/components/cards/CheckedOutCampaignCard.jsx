import { Button, Card } from "react-bootstrap";

export default function CheckedOutCampaignCard(props) {
    return (
        <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
                <p className="text-uppercase text-muted fw-bold small mb-1">
                    Purchased campaign
                </p>

                <h4 className="fw-bold">${props.cost}</h4>

                <p className="text-muted mb-3">
                    Scheduled for <strong>{props.email}</strong> from <strong>{props.start}</strong> to <strong>{props.end}</strong>
                </p>

                <Button
                    variant="outline-danger"
                    className="rounded-pill"
                    onClick={() => props.cancel(props.index)}
                >
                    Cancel campaign
                </Button>
            </Card.Body>
        </Card>
    );
}