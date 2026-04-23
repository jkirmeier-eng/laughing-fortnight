
import { Router, Routes, Route } from "react-router";
import { BrowserRouter } from "react-router";
import { Link } from "react-router";
import { useMemo } from "react";

import MediaHome from "../occupado/MediaHome";
import MediaPage from "../occupado/MediaPage";

import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import ContactPage from "../occupado/ContactPage";
import CheckoutPage from "../occupado/CheckoutPage";
import GalleryPage from "../occupado/GalleryPage";
import SystemPage from "../occupado/SystemPage";

export default function MediaApp() {

  

  const stuff = useMemo(() => {
    const list = []

    for (let i = 0; i < 0; i++) {
      list.push("Page " + i)
    }

    return list
  })

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ overflowX: "auto" }}>
        <Nav className="flex-nowrap overflow-auto" style={{ whiteSpace: "nowrap" }}>
          <Nav.Link as={Link} to="/" style={{ color: "white" }} className="px-4 fs-4">Home</Nav.Link>
          <Nav.Link as={Link} to="/gallery" style={{ color: "white" }} className="px-4 fs-4">Gallery</Nav.Link>
          <Nav.Link as={Link} to="/contact" style={{ color: "white" }} className="px-4 fs-4">Contact</Nav.Link>
          <Nav.Link as={Link} to="/system" style={{ color: "white" }} className="px-4 fs-4">My System</Nav.Link>
          <Nav.Link as={Link} to="/checkout_page" style={{ color: "white" }} className="px-4 fs-4">Checkout</Nav.Link>
            {stuff.map((x) => (
              <Nav.Link as={Link} to={`/${x}`} key={x} style={{ color: "white" }} className="px-4 fs-4">
                {x}
              </Nav.Link>
            ))}
        </Nav>
      </Navbar>

      <div>

        <Routes>
          <Route path="/" element={<MediaHome />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/home" element={<MediaHome />} />
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="/system" element={<SystemPage />}/>
          <Route path="/checkout_page" element={<CheckoutPage />} />
          
          {
            stuff.map((x) => {
              return <Route path={"/" + x} element={<MediaPage name={x}/>} />
            })
          }
          
        </Routes>
      </div>

    </>
  );
}