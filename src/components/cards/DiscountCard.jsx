import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";


export default function DiscountCard(props) {

    const applyDiscount = () => {
        sessionStorage.setItem("discount", String(props.potency))
    }

    const handleApply = () => {
        applyDiscount()

        props.discontinue()
    }
    return (
        <Card style={{ width: '18rem' }}>
            
            <Card.Body>
                <Card.Title>DISCOUNT FOUND: FIRST AD CAMPAIGN {50 + (props.potency*50)}% OFF</Card.Title>
                <Card.Text>
                    A random discount code has been found, you now have {50 + (props.potency*50)}% off your next Ad Campaign!
                </Card.Text>
                <Button variant="primary" onClick={handleApply}>Apply</Button>
            </Card.Body>
        </Card>
    );
}