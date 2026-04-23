import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { Form } from "react-bootstrap";
import { useRef } from "react";
import { useState } from "react";


export default function CheckedOutCampaignCard(props) {

    
    return (
        <Card style={{ width: '18rem' }}>

            <Card.Body>
                <Card.Title>Campaign Scheduled under {props.email}:</Card.Title>
                <Card.Text>
                    Specify what you would like out of this AD CAMPAIGN!
                </Card.Text>

                <Button variant="danger" onClick={() => {props.cancel(props.index)}}>CANCEL</Button>

                <Card.Text>COST: {props.cost}</Card.Text>
            </Card.Body>
        </Card>
    );
}