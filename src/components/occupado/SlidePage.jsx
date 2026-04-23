
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-router";

export default function SlidePage(props) {

    return (
        <div>
            <p className="fs-1">{props.title}</p>

            <p> {props.description}</p>

            <img src={props.img} alt={"No image available!..."} />
        </div>
    );
}