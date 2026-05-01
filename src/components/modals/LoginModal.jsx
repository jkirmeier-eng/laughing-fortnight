import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getSessionToken, saveSessionToken } from "../../api/fakeAuth";
import { getActiveUser, loginWithEmail } from "../../api/fakeBackend";

export default function LoginModal() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        async function checkLogin() {
            const token = getSessionToken();
            const user = token ? await getActiveUser(token) : null;
            if (!user) setShow(true);
        }

        checkLogin();
    }, []);

    const handleLogin = async () => {
        if (!email.includes("@")) {
            alert("Enter a valid email.");
            return;
        }

        const result = await loginWithEmail(email);
        if (!result.ok) {
            alert("Login failed.");
            return;
        }

        saveSessionToken(result.token);
        setShow(false);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="login-modal-email">
                        <Form.Label>Email login</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="you@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </Form.Group>

                    <Form.Group controlId="login-modal-password">
                        <Form.Label>
                            <s>Password would go here</s>
                        </Form.Label>
                        <Form.Control
                            disabled
                            type="password"
                            placeholder="Password disabled for demo"
                            aria-describedby="login-modal-password-help"
                        />
                        <Form.Text id="login-modal-password-help">
                            This demo uses email-only login.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="dark" onClick={handleLogin}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    );
}