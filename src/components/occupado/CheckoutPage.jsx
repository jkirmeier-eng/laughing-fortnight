import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getSessionToken } from "../../api/fakeAuth";
import {
    createCampaignOrder,
    deleteCampaignOrder,
    getCampaignOrders,
    getCurrentDiscount,
} from "../../api/fakeBackend";
import CampaignCard from "../cards/CampaignCard";
import CheckedOutCampaignCard from "../cards/CheckedOutCampaignCard";
import InterestDiscountModal from "../modals/InterestDiscountModal";

export default function CheckoutPage() {
    const [draftCampaigns, setDraftCampaigns] = useState([]);
    const [checkedOutCampaigns, setCheckedOutCampaigns] = useState([]);
    const [discount, setDiscount] = useState(0);

    const reloadCheckoutData = async () => {
        const token = getSessionToken();

        if (!token) {
            setCheckedOutCampaigns([]);
            setDiscount(0);
            return;
        }

        const campaigns = await getCampaignOrders(token);
        const currentDiscount = await getCurrentDiscount(token);

        setCheckedOutCampaigns(campaigns);
        setDiscount(currentDiscount);
    };

    useEffect(() => {
        reloadCheckoutData();
    }, []);

    const addDraftCampaign = (initialStartDate = "", initialEndDate = "") => {
        setDraftCampaigns((drafts) => [
            ...drafts,
            {
                id: crypto.randomUUID?.() ?? String(Date.now()),
                initialStartDate,
                initialEndDate,
            },
        ]);
    };

    const checkout = async (startDate, endDate, cost, discountUsed) => {
        const token = getSessionToken();

        if (!token) {
            alert("Please login first.");
            return;
        }

        const result = await createCampaignOrder(token, {
            startDate,
            endDate,
            cost,
            discountUsed,
        });

        if (!result.ok) {
            alert(result.message);
            return;
        }

        setDraftCampaigns((drafts) => drafts.slice(1));
        await reloadCheckoutData();
    };

    const cancel = async (id) => {
        const token = getSessionToken();

        if (!token) {
            alert("Please login first.");
            return;
        }

        const confirmed = confirm("Are you sure you would like to unschedule this campaign?");
        if (!confirmed) return;

        const result = await deleteCampaignOrder(token, id);

        if (result.returnedDiscount > 0) {
            alert(`Your ${result.returnedDiscount}% discount has been returned.`);
        }

        await reloadCheckoutData();
    };

    const edit = async (id) => {
        const token = getSessionToken();

        if (!token) {
            alert("Please login first.");
            return;
        }

        const result = await deleteCampaignOrder(token, id);

        if (!result.ok) {
            alert(result.message);
            return;
        }

        if (result.returnedDiscount > 0) {
            alert(`Your ${result.returnedDiscount}% discount has been returned.`);
        }

        addDraftCampaign(result.campaign.startDate, result.campaign.endDate);
        await reloadCheckoutData();
    };

    return (
        <Container className="py-5">
            <InterestDiscountModal onDiscountChanged={reloadCheckoutData} />

            <p className="text-uppercase text-muted fw-bold small">Checkout</p>
            <h1 className="display-5 fw-bold">Schedule an ad campaign.</h1>

            {discount > 0 && (
                <p className="text-success fw-bold">
                    Current saved discount: {discount}% off first unscheduled campaign
                </p>
            )}

            <div className="d-flex justify-content-between align-items-center mt-4">
                <h2 className="fw-bold">Unscheduled campaigns</h2>
                <Button variant="dark" onClick={() => addDraftCampaign()}>
                    + Add Campaign
                </Button>
            </div>

            <Row className="g-3 mt-2">
                {draftCampaigns.map((draft, i) => (
                    <Col md={6} lg={4} key={draft.id}>
                        <CampaignCard
                            index={i}
                            initialStartDate={draft.initialStartDate}
                            initialEndDate={draft.initialEndDate}
                            checkout={checkout}
                        />
                    </Col>
                ))}
            </Row>

            <hr className="my-5" />

            <h2 className="fw-bold">Scheduled campaigns</h2>

            <Row className="g-3 mt-2">
                {checkedOutCampaigns.map((campaign) => (
                    <Col md={6} lg={4} key={campaign.id}>
                        <CheckedOutCampaignCard
                            email={campaign.email}
                            cost={campaign.cost}
                            startDate={campaign.startDate}
                            endDate={campaign.endDate}
                            discountUsed={campaign.discountUsed}
                            id={campaign.id}
                            cancel={cancel}
                            edit={edit}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}