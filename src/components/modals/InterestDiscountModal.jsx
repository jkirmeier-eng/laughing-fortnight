import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getSessionToken } from "../../api/fakeAuth";
import {
    resolveInterestLevel,
    shouldShowCheckoutInterestModal,
} from "../../api/fakeBackend";
import DiscountCard from "../cards/DiscountCard";

export default function InterestDiscountModal({ onDiscountChanged }) {
    const [show, setShow] = useState(false);
    const [interest, setInterest] = useState(5);
    const [showDiscountCard, setShowDiscountCard] = useState(false);

    useEffect(() => {
        async function loadModalState() {
            const token = getSessionToken();
            if (!token) {
                setShow(false);
                return;
            }

            const shouldShow = await shouldShowCheckoutInterestModal(token);
            setShow(shouldShow);
        }

        loadModalState();
    }, []);

    const calculateOffer = async () => {
        const token = getSessionToken();

        if (!token) {
            alert("Please login first.");
            setShow(false);
            return;
        }

        const result = await resolveInterestLevel(token, interest);

        if (!result.ok) {
            alert(result.message);
            return;
        }

        if (onDiscountChanged) onDiscountChanged();

        if (result.discountTriggered) {
            setShowDiscountCard(true);
        } else {
            setShow(false);
        }
    };

    const close = () => {
        setShow(false);
        if (onDiscountChanged) onDiscountChanged();
    };

    return (
        <Modal show={show} onHide={close} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {showDiscountCard ? "Low-interest offer" : "Before checkout"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {!showDiscountCard ? (
                    <Form>
                        <Form.Group controlId="interest-discount-range">
                            <Form.Label>
                                How interested are you in running a campaign with Ajay-Media?
                            </Form.Label>

                            <Form.Range
                                min={1}
                                max={10}
                                value={interest}
                                onChange={(e) => setInterest(e.target.value)}
                                aria-describedby="interest-discount-value"
                            />

                            <div
                                id="interest-discount-value"
                                className="d-flex justify-content-between"
                            >
                                <span>Low interest</span>
                                <strong>{interest}/10</strong>
                                <span>High interest</span>
                            </div>
                        </Form.Group>
                    </Form>
                ) : (
                    <DiscountCard discontinue={close} />
                )}
            </Modal.Body>

            {!showDiscountCard && (
                <Modal.Footer>
                    <Button variant="dark" onClick={calculateOffer}>
                        See offer
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
}