import { Button, Card } from "react-bootstrap";

export default function CheckedOutCampaignCard(props) {
    return (
        <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
                <p className="text-uppercase text-secondary fw-bold small mb-1">
                    Campaign scheduled
                </p>

                <h3 className="fw-bold">Campaign under {props.email}</h3>

                <p className="text-secondary mb-1">
                    {props.startDate} → {props.endDate}
                </p>

                {props.discountUsed > 0 && (
                    <p className="text-success fw-bold mb-2">
                        Used discount: {props.discountUsed}% off
                    </p>
                )}

                <p className="fw-bold">Estimated cost: ${props.cost}</p>

                <div className="d-flex gap-2">
                    <Button
                        variant="outline-dark"
                        className="rounded-pill"
                        onClick={() => props.edit(props.id)}
                    >
                        Edit
                    </Button>

                    <Button
                        variant="outline-danger"
                        className="rounded-pill"
                        onClick={() => props.cancel(props.id)}
                    >
                        Cancel
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}