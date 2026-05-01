import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { getSessionToken } from "../../api/fakeAuth";
import { quoteCampaign } from "../../api/fakeBackend";

export default function CampaignCard(props) {
    const [startDate, setStartDate] = useState(props.initialStartDate ?? "");
    const [endDate, setEndDate] = useState(props.initialEndDate ?? "");
    const [quote, setQuote] = useState({
        ok: true,
        days: 1,
        baseCost: 50,
        discount: 0,
        estimatedCost: 50,
    });

    useEffect(() => {
        async function loadQuote() {
            const token = getSessionToken();

            const result = await quoteCampaign(token, {
                startDate,
                endDate,
                index: props.index,
            });

            setQuote(result);
        }

        loadQuote();
    }, [startDate, endDate, props.index]);

    const handleCheckout = () => {
        if (!quote.ok) {
            alert(quote.message);
            return;
        }

        props.checkout(startDate, endDate, quote.estimatedCost, quote.discount);
        setStartDate("");
        setEndDate("");
    };

    const cardNumber = props.index + 1;

    return (
        <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
                <p className="text-uppercase text-secondary fw-bold small mb-1">
                    Ad campaign {cardNumber}
                </p>

                <h3 className="fw-bold">Schedule campaign</h3>

                <p className="text-secondary">Specify the dates for this ad campaign.</p>

                <Form>
                    <Form.Group className="mb-3" controlId={`campaign-${cardNumber}-start`}>
                        <Form.Label>Start date</Form.Label>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId={`campaign-${cardNumber}-end`}>
                        <Form.Label>End date</Form.Label>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            isInvalid={!quote.ok}
                        />
                        <Form.Control.Feedback type="invalid">
                            {quote.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>

                {quote.discount > 0 && props.index === 0 && (
                    <p className="text-success fw-bold mb-2">
                        Discount applied: {quote.discount}% off
                    </p>
                )}

                <p className="fw-bold">Estimated cost: ${quote.estimatedCost}</p>

                <Button variant="dark" className="rounded-pill" onClick={handleCheckout}>
                    Schedule campaign
                </Button>
            </Card.Body>
        </Card>
    );
}