import { Container, Nav, Navbar } from "react-bootstrap";
import { HashRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import CheckoutPage from "../occupado/CheckoutPage";
import ContactPage from "../occupado/ContactPage";
import GalleryPage from "../occupado/GalleryPage";
import LoginPage from "../occupado/LoginPage";
import MediaHome from "../occupado/MediaHome";
import SystemPage from "../occupado/SystemPage";
import LoginModal from "../modals/LoginModal";
import PageHelpButton from "../help/PageHelpButton";

function GlobalHelp() {
  const location = useLocation();

  const contentMap = {
    "/": {
      title: "Home",
      body: "Overview of Ajay-Media and the main entry points into the site.",
    },
    "/gallery": {
      title: "Gallery",
      body: "Example campaign visuals pulled from the fake backend.",
    },
    "/system": {
      title: "System",
      body: "Explains the KAAS system. Slides and images simulate internal tooling.",
    },
    "/contact": {
      title: "Contact",
      body: "Submit contact messages using the current session login.",
    },
    "/checkout": {
      title: "Checkout",
      body: "Build campaigns, apply discounts, edit scheduled campaigns, and cancel campaigns.",
    },
    "/login": {
      title: "Login",
      body: "Change the current frontend session email. No password is used in this demo.",
    },
  };

  const current = contentMap[location.pathname] ?? {
    title: "Page",
    body: "Information about this page.",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1050,
      }}
    >
      <PageHelpButton title={current.title}>
        <p className="mb-0">{current.body}</p>
      </PageHelpButton>
    </div>
  );
}

export default function MediaApp() {
  return (
    <HashRouter>
      <LoginModal />

      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Ajay-Media
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link className="text-white" as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link className="text-white" as={Link} to="/gallery">
                Gallery
              </Nav.Link>
              <Nav.Link className="text-white" as={Link} to="/system">
                System
              </Nav.Link>
              <Nav.Link className="text-white" as={Link} to="/contact">
                Contact
              </Nav.Link>
              <Nav.Link className="text-white" as={Link} to="/checkout">
                Checkout
              </Nav.Link>
              <Nav.Link className="text-white" as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <GlobalHelp />

      <Routes>
        <Route path="/" element={<MediaHome />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/system" element={<SystemPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
}