
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-router";
import CampaignCard from "../cards/CampaignCard";

import { Row, Col } from "react-bootstrap"

import CheckedOutCampaignCard from "../cards/CheckedOutCampaignCard";

export default function CheckoutPage() {
    const [numCampaigns, setNumCampaigns] = useState(0)
    const [checkedOutCampaigns, setCheckedOutCampaigns] = useState(() => {
        const saved = sessionStorage.getItem("checkedOutCampaigns");
        return saved ? JSON.parse(saved) : [];
    });

    const checkout = (startDate, endDate, cost) => {

        const email = prompt("Enter your email:");


        const newCamps = [...checkedOutCampaigns, {"start": startDate, "end": endDate, "cost": cost, "email": email, "id": Math.random() * 5000}]
        setCheckedOutCampaigns(newCamps)

        sessionStorage.setItem("checkedOutCampaigns", JSON.stringify(newCamps))

    }

    const cancel = (index) => {
        const confirmed = confirm("Are you sure you would like to unschedule this Campaign?");

        if (confirmed) {

            const newCamps = checkedOutCampaigns.filter((_, i) => i !== index)
            setCheckedOutCampaigns(newCamps)
            sessionStorage.setItem("checkedOutCampaigns", JSON.stringify(newCamps))
        }
    }

    return (

        <div>

            <Row style={{ height: "100%" }}>
                <Col style={{ borderRight: "1px solid black" }}>
                    <h4>Unpurchased</h4>
                    {

                        Array.from({ length: numCampaigns }).map((_, i) => (
                            <CampaignCard checkout={checkout} key={i} index={i} />
                        ))
                    }

                    { numCampaigns < 1 &&
                    <Button variant="secondary" onClick={() => setNumCampaigns(prev => prev + 1)}>+ Add Campaign</Button>
                    
}

                </Col>

                <Col>
                    <h4>Purchased</h4>
                    {
                        checkedOutCampaigns.map((c, index) => {
                            return <CheckedOutCampaignCard cancel={cancel} key={c.id} index={index} {...c}/>
                        })
                    }
                </Col>
            </Row>
            
        </div>
    );
}