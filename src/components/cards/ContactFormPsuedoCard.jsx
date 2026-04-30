import { Button, Form } from "react-bootstrap";

export default function ContactFormPsuedoCard({
    nameRef,
    emailRef,
    messageRef,
    handleSubmit,
    resetMessage,
}) {
    return (
        <div className="p-4 bg-light rounded-4 shadow-sm">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameRef} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control ref={emailRef} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={5} ref={messageRef} />
                </Form.Group>

                <Button variant="dark" onClick={handleSubmit}>
                    Submit
                </Button>{" "}
                <Button variant="outline-dark" onClick={resetMessage}>
                    New message
                </Button>
            </Form>
        </div>
    );
}