
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-router";
import CampaignCard from "../cards/CampaignCard";

export default function CheckoutPage() {
    const [numCampaigns, setNumCampaigns] = useState(0)


    return (
        <div>
            {

                Array.from({ length: numCampaigns }).map((_, i) => (
                    <CampaignCard key={i} index={i}/>
                ))
            }

            <Button variant="secondary" onClick={() => setNumCampaigns(prev => prev + 1)}>+ Add Campaign</Button>


            { (numCampaigns > 0) &&
                <Button variant="primary" onClick={() => setNumCampaigns(prev => 0)}>CHECKOUT</Button>
            }
        </div>
    );
}