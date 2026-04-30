import { Button, Card } from "react-bootstrap";
import { saveDiscount } from "../../api/fakeBackend";

export default function DiscountCard(props) {
    const potency = Number(props.potency ?? props.interest ?? 5);
    const discount = Math.max(0, Math.round((10 - potency) * 4));

    const claim = async () => {
        await saveDiscount(discount);

        if (props.discontinue) props.discontinue();
        if (props.onClaim) props.onClaim(discount);
    };

    return (
        <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
                <p className="text-uppercase text-muted fw-bold small mb-1">
                    Retention offer
                </p>

                <h3 className="fw-bold">{discount}% off</h3>

                <p className="text-muted">
                    We would like to offer you a discount!
                </p>

                <Button variant="dark" className="rounded-pill px-4" onClick={claim}>
                    Claim discount
                </Button>
            </Card.Body>
        </Card>
    );
}