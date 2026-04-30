import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CampaignCard from "../cards/CampaignCard";
import CheckedOutCampaignCard from "../cards/CheckedOutCampaignCard";
import { cancelCampaign, getCampaigns, getDiscount, saveCampaign } from "../../api/fakeBackend";

export default function CheckoutPage() {
    const [numCampaigns, setNumCampaigns] = useState(0);
    const [checkedOutCampaigns, setCheckedOutCampaigns] = useState([]);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        getCampaigns().then(setCheckedOutCampaigns);
        getDiscount().then(setDiscount);
    }, []);

    const checkout = async (startDate, endDate, cost) => {
        const email = prompt("Enter your email:");
        if (!email) return;

        const finalCost = Math.round(cost * (1 - discount / 100));

        const updated = await saveCampaign({
            startDate,
            endDate,
            cost: finalCost,
            originalCost: cost,
            discount,
            email,
            id: crypto.randomUUID?.() ?? String(Date.now()),
        });

        setCheckedOutCampaigns(updated);
    };

    const cancel = async (index) => {
        const confirmed = confirm("Are you sure you would like to unschedule this Campaign?");
        if (!confirmed) return;

        const updated = await cancelCampaign(index);
        setCheckedOutCampaigns(updated);
    };

    return (
        <Container className="py-5">
            <p className="text-uppercase text-muted fw-bold small">Checkout</p>
            <h1 className="display-5 fw-bold">Schedule an ad campaign.</h1>

            {discount > 0 && (
                <p className="text-success fw-bold">
                    Current saved discount: {discount}% off
                </p>
            )}

            <div className="d-flex justify-content-between align-items-center mt-4">
                <h3 className="fw-bold">Unscheduled campaigns</h3>
                <Button variant="dark" onClick={() => setNumCampaigns((n) => n + 1)}>
                    + Add Campaign
                </Button>
            </div>

            <Row className="g-3 mt-2">
                {Array.from({ length: numCampaigns }).map((_, i) => (
                    <Col md={6} lg={4} key={i}>
                        <CampaignCard index={i} checkout={checkout} />
                    </Col>
                ))}
            </Row>

            <hr className="my-5" />

            <h3 className="fw-bold">Scheduled campaigns</h3>

            <Row className="g-3 mt-2">
                {checkedOutCampaigns.map((campaign, index) => (
                    <Col md={6} lg={4} key={campaign.id ?? index}>
                        <CheckedOutCampaignCard
                            email={campaign.email}
                            cost={campaign.cost}
                            start={campaign.startDate}
                            end={campaign.endDate}
                            index={index}
                            cancel={cancel}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}