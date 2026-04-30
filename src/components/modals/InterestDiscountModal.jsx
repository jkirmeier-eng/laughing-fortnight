import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { saveDiscount, shouldAskInterest } from "../../api/fakeBackend";

export default function InterestDiscountModal() {
    const [show, setShow] = useState(false);
    const [interest, setInterest] = useState(5);
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        shouldAskInterest().then(setShow);
    }, []);

    const calculateOffer = async () => {
        const discount = Math.max(0, Math.round((10 - Number(interest)) * 4));
        await saveDiscount(discount);
        setOffer(discount);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Before you keep browsing...</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {offer === null ? (
                    <>
                        <p className="text-muted">
                            How interested are you in running a campaign with Ajay-Media?
                        </p>

                        <Form.Range
                            min={1}
                            max={10}
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                        />

                        <div className="d-flex justify-content-between">
                            <span>Low interest</span>
                            <strong>{interest}/10</strong>
                            <span>High interest</span>
                        </div>
                    </>
                ) : (
                    <p>
                        Since your interest is not fully there yet, we can offer{" "}
                        <strong>{offer}% off</strong> your first campaign.
                    </p>
                )}
            </Modal.Body>

            <Modal.Footer>
                {offer === null ? (
                    <Button variant="dark" onClick={calculateOffer}>
                        See offer
                    </Button>
                ) : (
                    <Button variant="dark" onClick={() => setShow(false)}>
                        Continue
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}