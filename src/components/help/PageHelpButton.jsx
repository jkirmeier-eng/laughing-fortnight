import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function PageHelpButton({ title, children }) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button
                onClick={() => setShow(true)}
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                }}
                className="bg-dark text-white border-0 d-flex align-items-center justify-content-center"
                aria-label={`Help: ${title}`}
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
                        Got it
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}