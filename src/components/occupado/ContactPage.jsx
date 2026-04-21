import { useState } from "react";
import { useRef } from "react";

import { Form, Button } from "react-bootstrap";
import DiscountCard from "../cards/DiscountCard"
import SentCard from "../cards/SentCard";

export default function ContactPage(props) {
    const nameRef = useRef();
    const emailRef = useRef();

    const messageRef = useRef();

    const [interestLevel, setInterestLevel] = useState("");

    const [showInterest, setShowInterest] = useState(((sessionStorage.getItem("showInterest") || "true") === "true"))

    const [showDiscount, setShowDiscount] = useState(true)

    const [sentContactInfo, setSentContactInfo] = useState(() => {
        const saved = sessionStorage.getItem("sentInfo");
        return saved ? saved.split(",") : [];
    });


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

    const handleSubmit = () => {

        //if interest level > 5, 

        setSentContactInfo([nameRef.current.value, emailRef.current.value, messageRef.current.value])
        sessionStorage.setItem("sentInfo", nameRef.current.value + "," + emailRef.current.value + "," + messageRef.current.value)

    };

    return (
        <>

            {(sentContactInfo.length < 1) &&

                <>

                    <Form.Control type="text" ref={nameRef} placeholder="Name..." />
                    <Form.Control type="text" ref={emailRef} placeholder="Email..." />
                    <Form.Control type="text" ref={messageRef} placeholder="Message..." as="textarea" rows={4} style={{ width: "300px" }} />

                    <Button onClick={handleSubmit}>Submit Contact</Button>

                    {
                        (showInterest) &&

                        <>
                            <Form.Control
                                type="text"
                                placeholder="How interested are you from 1-10?"
                                value={interestLevel}
                                onChange={(e) => setInterestLevel(e.target.value)}
                            />

                            <Button onClick={handleInterestShown}>Submit Interest</Button >
                        </>
                    }

                    {
                        ((getInterest() <= 5) && !showInterest && showDiscount)

                        &&

                        <DiscountCard potency={((5 - interestLevel) / 5)} discontinue={() => setShowDiscount(false)} />
                    }
                </>
            }

            {
                sentContactInfo.length == 3 && 

                <SentCard name={sentContactInfo[0]} email={sentContactInfo[1]} message={sentContactInfo[2]}  />
            }
        </>
    );
}