import { useMemo, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

export default function CampaignCard(props) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [packageType, setPackageType] = useState("starter");

    const cost = useMemo(() => {
        if (packageType === "growth") return 1200;
        if (packageType === "takeover") return 2600;
        return 450;
    }, [packageType]);

    const checkout = () => {
        props.checkout(startDate, endDate, cost);
    };

    return (
        <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
                <p className="text-uppercase text-muted fw-bold small mb-1">
                    Campaign #{Number(props.index) + 1}
                </p>

                <h4 className="fw-bold">Build campaign</h4>

                <Form.Group className="mb-3">
                    <Form.Label>Start date</Form.Label>
                    <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>End date</Form.Label>
                    <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Package</Form.Label>
                    <Form.Select
                        value={packageType}
                        onChange={(e) => setPackageType(e.target.value)}
                    >
                        <option value="starter">Starter — $450</option>
                        <option value="growth">Growth — $1200</option>
                        <option value="takeover">Takeover — $2600</option>
                    </Form.Select>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mt-4">
                    <strong>${cost}</strong>
                    <Button variant="dark" className="rounded-pill" onClick={checkout}>
                        Checkout
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}