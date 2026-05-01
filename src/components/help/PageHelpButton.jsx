import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function PageHelpButton({ title, children }) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button
                variant="dark"
                onClick={() => setShow(true)}
                aria-label={`Open help information for ${title}`}
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    fontSize: 22,
                    fontWeight: "bold",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                }}
            >
                ?
            </Button>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>{children}</Modal.Body>

                <Modal.Footer>
                    <Button variant="dark" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}