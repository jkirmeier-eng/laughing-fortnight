import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import {
    clearSessionToken,
    getSessionToken,
    saveSessionToken,
} from "../../api/fakeAuth";
import {
    getActiveUser,
    loginWithEmail,
    logoutUser,
} from "../../api/fakeBackend";

export default function LoginPage() {
    const [activeUser, setActiveUser] = useState(null);
    const [email, setEmail] = useState("");

    const reloadUser = async () => {
        const token = getSessionToken();
        const user = token ? await getActiveUser(token) : null;
        setActiveUser(user);
    };

    useEffect(() => {
        reloadUser();
    }, []);

    const handleChangeLogin = async () => {
        if (!email.includes("@")) {
            alert("Enter a valid email.");
            return;
        }

        const result = await loginWithEmail(email);
        saveSessionToken(result.token);
        setEmail("");
        await reloadUser();
    };

    const handleLogout = async () => {
        const token = getSessionToken();

        if (token) await logoutUser(token);

        clearSessionToken();
        await reloadUser();
    };

    return (
        <Container className="py-5">
            <p className="text-uppercase text-secondary fw-bold small">Login</p>
            <h1 className="display-5 fw-bold">Change active login.</h1>

            <Card className="border-0 shadow-sm rounded-4 mt-4">
                <Card.Body className="p-4">
                    <h2 className="h4 fw-bold">Current session</h2>

                    <p>
                        Current login:{" "}
                        <strong>{activeUser ? activeUser.email : "No active login"}</strong>
                    </p>

                    <Form>
                        <Form.Group className="mb-3" controlId="login-page-email">
                            <Form.Label>Email login</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                placeholder="you@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="login-page-password">
                            <Form.Label>
                                <s>Password would go here</s>
                            </Form.Label>
                            <Form.Control
                                disabled
                                type="password"
                                placeholder="Password disabled for demo"
                                aria-describedby="login-page-password-help"
                            />
                            <Form.Text id="login-page-password-help">
                                This demo uses email-only login.
                            </Form.Text>
                        </Form.Group>
                    </Form>

                    <Button variant="dark" onClick={handleChangeLogin}>
                        Change login
                    </Button>{" "}
                    <Button variant="outline-danger" onClick={handleLogout}>
                        Clear login
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}