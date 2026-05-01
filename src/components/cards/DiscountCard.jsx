import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { getSessionToken } from "../../api/fakeAuth";
import { getCurrentDiscount } from "../../api/fakeBackend";

export default function DiscountCard(props) {
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        async function loadDiscount() {
            const token = getSessionToken();

            if (!token) {
                setDiscount(0);
                return;
            }

            const currentDiscount = await getCurrentDiscount(token);
            setDiscount(currentDiscount);
        }

        loadDiscount();
    }, []);

    const handleApply = () => {
        if (props.discontinue) props.discontinue();
    };

    return (
        <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
                <p className="text-uppercase text-secondary fw-bold small mb-1">
                    Discount found
                </p>

                <h3 className="fw-bold">First ad campaign {discount}% off</h3>

                <p className="text-secondary">
                    A discount has been generated based on your interest level.
                </p>

                <Button variant="dark" className="rounded-pill px-4" onClick={handleApply}>
                    Apply
                </Button>
            </Card.Body>
        </Card>
    );
}