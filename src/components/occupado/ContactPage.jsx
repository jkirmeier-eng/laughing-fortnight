import { useState } from "react";
import { useRef } from "react";

import { Form, Button } from "react-bootstrap";
import DiscountCard from "../cards/DiscountCard"
import SentCard from "../cards/SentCard";

import { Modal } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

export default function ContactPage(props) {
    const nameRef = useRef();
    const emailRef = useRef();

    const messageRef = useRef();

    const [interestLevel, setInterestLevel] = useState("");

    const [showInterest, setShowInterest] = useState(((sessionStorage.getItem("showInterest") || "true") === "true"))

    const [showDiscount, setShowDiscount] = useState(true)

    const [sentContactInfo, setSentContactInfo] = useState(() => {
        const saved = sessionStorage.getItem("sentInfo");
        return saved ? JSON.parse(saved) : [];
    });

    const sendFollowUp = (name, email) => {
        nameRef.current.value = name
        emailRef.current.value = email
    }

    function resetMessage() {
        nameRef.current.value = ""
        emailRef.current.value = ""
        messageRef.current.value = ""
    }

    function getInterest() {
        const parsedInterest = parseInt(interestLevel)

        if (Number.isNaN(parsedInterest)) {
            return 999
        } else {
            return parsedInterest
        }
    }

    

    const handleInterestShown = () => {
        setShowInterest(false)
        sessionStorage.setItem("showInterest", "false")
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSubmit = () => {

        if (!emailRegex.test(emailRef.current.value)) {
            alert("Email appears to be invalid! Please try again!")
            return;
        }



        //if interest level > 5, 

        const newInfo = [...sentContactInfo, [nameRef.current.value, emailRef.current.value, messageRef.current.value]]

        setSentContactInfo(newInfo)
        sessionStorage.setItem("sentInfo", JSON.stringify(newInfo))

        resetMessage()

    };

    return (
        <>

            

                <>

                    <Form.Control type="text" ref={nameRef} placeholder="Name..." />
                    <Form.Control type="text" ref={emailRef} placeholder="Email..." />
                    <Form.Control type="text" ref={messageRef} placeholder="Message..." as="textarea" rows={4} style={{ width: "300px" }} />

                    <Button onClick={handleSubmit}>Submit Contact</Button>

                    {
                        <Modal show={showInterest} onHide={handleInterestShown}>
                            <Modal.Header closeButton>
                                <Modal.Title>Interest Level</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form.Control
                                type="text"
                                placeholder="How interested are you from 1-10?"
                                value={interestLevel}
                                onChange={(e) => setInterestLevel(e.target.value)}
                                />
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={handleInterestShown}>
                                Submit Interest
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    }

                    {
                        <Modal
                        show={(getInterest() <= 5) && !showInterest && showDiscount}
                        onHide={() => setShowDiscount(false)}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Discount Offer</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <DiscountCard
                            potency={(5 - interestLevel) / 5}
                            discontinue={() => setShowDiscount(false)}
                            />
                        </Modal.Body>
                        </Modal>
                    }
                </>

                

                <Button variant="secondary" onClick={() => {resetMessage()}}>New Message</Button>
            



            {
                sentContactInfo.length > 0 && 

                (
                    <Row>
                        {sentContactInfo.map((info, i) => (
                        <Col key={i} xs={12} sm={6} md={4} lg={3}>
                            <SentCard
                            sendFollowUp={sendFollowUp}
                            name={info[0]}
                            email={info[1]}
                            message={info[2]}
                            />
                        </Col>
                        ))}
                    </Row>
                    )
                
            }
        </>
    );
}