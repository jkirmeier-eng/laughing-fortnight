import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";


export default function SentCard(props) {

    return (
        <Card style={{ width: '18rem' }}>

            <Card.Body>
                <Card.Title>YOUR SENT CONTACT:</Card.Title>
                <Card.Text>
                    NAME: {props.name}
                </Card.Text>
                <Card.Text>EMAIL: {props.email}</Card.Text>
                <Card.Text>MSG: {props.message}</Card.Text>

            </Card.Body>
        </Card>
    );
}