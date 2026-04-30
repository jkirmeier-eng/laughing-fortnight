import { Container, Nav, Navbar } from "react-bootstrap";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import CheckoutPage from "../occupado/CheckoutPage";
import ContactPage from "../occupado/ContactPage";
import GalleryPage from "../occupado/GalleryPage";
import InterestDiscountModal from "../modals/InterestDiscountModal";
import MediaHome from "../occupado/MediaHome";
import SystemPage from "../occupado/SystemPage";

import { useLocation } from "react-router-dom";
import PageHelpButton from "../help/PageHelpButton";

function GlobalHelp() {
  const location = useLocation();

  const contentMap = {
    "/": {
      title: "Home",
      body: "Overview of Ajay-Media, what it does, and entry points into the site.",
    },
    "/gallery": {
      title: "Gallery",
      body: "Example campaign visuals pulled from the fake backend.",
    },
    "/system": {
      title: "System",
      body: "Explains the KAAS system. Slides + images simulate internal tooling.",
    },
    "/contact": {
      title: "Contact",
      body: "Submit contact info, reuse previous contacts, and trigger discounts based on interest.",
    },
    "/checkout": {
      title: "Checkout",
      body: "Build campaigns, apply discounts, and simulate purchasing and canceling.",
    },
  };

  const current = contentMap[location.pathname] ?? {
    title: "Page",
    body: "Information about this page.",
  };

  return (
    <div style={{ position: "fixed", top: 80, right: 20, zIndex: 1050 }}>
      <PageHelpButton title={current.title}>
        <p className="mb-0">{current.body}</p>
      </PageHelpButton>
    </div>
  );
}

export default function MediaApp() {
  return (
    <HashRouter>
      <InterestDiscountModal />

      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Ajay-Media
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/system">System</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
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
      </Routes>
    </HashRouter>
  );
}