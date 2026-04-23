
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-router";

import { Carousel } from "react-bootstrap";

import { useEffect } from "react";

export default function MediaHome() {

    const [data, setData] = useState([]);
    
        useEffect(() => {
            fetch("/laughing-fortnight/testimonies.json")
            .then(res => res.json())
            .then(data => {
                setData(data)
            });
        }, []);

    return (
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 20px" }}>
            <h1 style={{ textAlign: "center", color: "red", fontFamily: "Georgia, serif" }}>
                Hello! Welcome to Ajay-Media!
            </h1>

            <hr />

            <h2 style={{ textAlign: "center", color: "red", fontFamily: "Georgia, serif" }}>
                Mission Statement
            </h2>

            <h5>Marketing that actually

            generates customers.

            Unlike most agencies, Ajay-media does everything in-house. We use KAAS, our proprietary scripting system, to film once and generate numerous ad variations. One shoot, multiple winning ads.

            Book a free strategy call

            </h5>

            <hr />

            <h2 style={{ textAlign: "center", color: "red", fontFamily: "Georgia, serif" }}>
                Testimonies
            </h2>

            <div style={{ 
                border: "2px solid red", 
                padding: "10px", 
                borderRadius: "8px" 
                }}>
                <Carousel>

                    {
                        data.map((testimony) => {
                            return <Carousel.Item>
                                <div style={{ 
                                    height: "200px", 
                                    display: "flex", 
                                    flexDirection: "column", 
                                    alignItems: "center", 
                                    justifyContent: "center",
                                    textAlign: "center"
                                    }}>
                                    <h5>{testimony.testimony}</h5>
                                    <h3>{testimony.author}</h3>
                                </div>
                            </Carousel.Item>
                        })
                    }
                    
                </Carousel>
            </div>
        </div>
    );
}