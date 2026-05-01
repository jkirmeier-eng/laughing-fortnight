import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getSessionToken } from "../../api/fakeAuth";
import {
    createContactMessage,
    getContactMessages,
} from "../../api/fakeBackend";
import ContactFormPsuedoCard from "../cards/ContactFormPsuedoCard";
import SentCard from "../cards/SentCard";

export default function ContactPage() {
    const nameRef = useRef();
    const messageRef = useRef();

    const [sentContactInfo, setSentContactInfo] = useState([]);

    const loadContacts = async () => {
        const token = getSessionToken();

        if (!token) {
            setSentContactInfo([]);
            return;
        }

        const contacts = await getContactMessages(token);
        setSentContactInfo(contacts);
    };

    useEffect(() => {
        loadContacts();
    }, []);

    const resetMessage = () => {
        nameRef.current.value = "";
        messageRef.current.value = "";
    };

    const sendFollowUp = (name) => {
        nameRef.current.value = name;
        messageRef.current.value = `Following up with ${name}...`;
    };

    const handleSubmit = async () => {
        const token = getSessionToken();

        if (!token) {
            alert("Please login first.");
            return;
        }

        const result = await createContactMessage(token, {
            name: nameRef.current.value,
            message: messageRef.current.value,
        });

        if (!result.ok) {
            alert(result.message);
            return;
        }

        await loadContacts();
        resetMessage();
    };

    return (
        <Container className="py-5">
            <Row className="g-4">
                <Col lg={5}>
                    <p className="text-uppercase text-muted fw-bold small">Contact</p>
                    <h1 className="display-5 fw-bold">Start a campaign conversation.</h1>
                    <p className="lead text-muted">
                        Submit contact info using your current session, save prior messages,
                        and send follow-ups.
                    </p>
                </Col>

                <Col lg={7}>
                    <ContactFormPsuedoCard
                        nameRef={nameRef}
                        messageRef={messageRef}
                        handleSubmit={handleSubmit}
                        resetMessage={resetMessage}
                    />
                </Col>
            </Row>

            <h2 className="fw-bold mt-5">Prior contacts</h2>

            <Row className="g-3 mt-2">
                {sentContactInfo.map((info) => (
                    <Col md={6} lg={4} key={info.id}>
                        <SentCard
                            name={info.name}
                            email={info.email}
                            message={info.message}
                            sendFollowUp={sendFollowUp}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}