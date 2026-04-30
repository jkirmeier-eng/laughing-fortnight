import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import DiscountCard from "../cards/DiscountCard";
import SentCard from "../cards/SentCard";
import { getContacts, saveContact, read, write } from "../../api/fakeBackend";

import ContactFormPsuedoCard from "../cards/ContactFormPsuedoCard";

export default function ContactPage() {
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    const [sentContactInfo, setSentContactInfo] = useState([]);
    const [showDiscount, setShowDiscount] = useState(false);
    const [interestLevel, setInterestLevel] = useState("");

    const [interestResolved, setInterestResolved] = useState(read("interestResolved", false));

    useEffect(() => {
        getContacts().then(setSentContactInfo);
    }, []);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const resetMessage = () => {
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
    };

    const sendFollowUp = (name, email) => {
        nameRef.current.value = name;
        emailRef.current.value = email;
        messageRef.current.value = `Following up with ${name}...`;
    };

    const handleSubmit = async () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const message = messageRef.current.value;

        if (!emailRegex.test(email)) {
            alert("Email appears to be invalid! Please try again!");
            return;
        }

        const updated = await saveContact([name, email, message]);
        setSentContactInfo(updated);

        resetMessage();
    };

    const checkInterest = () => {
        const parsed = Number(interestLevel);

        if (!Number.isNaN(parsed) && parsed <= 5) {
            setInterestResolved(true);
            write("interestResolved", true)
            setShowDiscount(true);
        }
    };

    return (
        <Container className="py-5">
            <Row className="g-4">
                <Col lg={5}>
                    <p className="text-uppercase text-muted fw-bold small">Contact</p>
                    <h1 className="display-5 fw-bold">Start a campaign conversation.</h1>
                    <p className="lead text-muted">
                        Submit contact info, save prior messages, send follow-ups, and
                        trigger a discount when interest is low.
                    </p>

                    { !interestResolved && (
                        <Form.Group className="mt-4">
                            <Form.Label>Interest level, 1-10</Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Control
                                    value={interestLevel}
                                    onChange={(e) => setInterestLevel(e.target.value)}
                                    placeholder="Example: 4"
                                />
                                <Button variant="dark" onClick={checkInterest}>
                                    Check
                                </Button>
                            </div>
                        </Form.Group>)
                    }
                </Col>

                <Col lg={7}>
                    <ContactFormPsuedoCard
                        nameRef={nameRef}
                        emailRef={emailRef}
                        messageRef={messageRef}
                        handleSubmit={handleSubmit}
                        resetMessage={resetMessage}
                    />
                </Col>
            </Row>

            <h3 className="fw-bold mt-5">Prior contacts</h3>

            <Row className="g-3 mt-2">
                {sentContactInfo.map((info, i) => (
                    <Col md={6} lg={4} key={i}>
                        <SentCard
                            name={info[0]}
                            email={info[1]}
                            message={info[2]}
                            sendFollowUp={sendFollowUp}
                        />
                    </Col>
                ))}
            </Row>

            <Modal show={showDiscount} onHide={() => setShowDiscount(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Low-interest offer</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <DiscountCard
                        potency={Number(interestLevel)}
                        discontinue={() => setShowDiscount(false)}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
}