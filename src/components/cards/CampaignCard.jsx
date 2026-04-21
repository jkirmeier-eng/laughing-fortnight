import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { Form } from "react-bootstrap";
import { useRef } from "react";
import { useState } from "react";


export default function CampaignCard(props) {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    function getDays() {

        if (!startDate || !endDate) return 1;

        const diff = new Date(endDate) - new Date(startDate);
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        return days > 0 ? days : 1;
    };


    return (
        <Card style={{ width: '18rem' }}>

            <Card.Body>
                <Card.Title>AD CAMPAIGN {props.index}:</Card.Title>
                <Card.Text>
                    Specify what you would like out of this AD CAMPAIGN!
                </Card.Text>
                <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <Card.Text>COST: {(1-(props.index==0?(sessionStorage.getItem("discount")||0):0)) * 50 * getDays()}</Card.Text>
            </Card.Body>
        </Card>
    );
}