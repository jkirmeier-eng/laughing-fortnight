import { useEffect, useState } from "react";
import { Button, Container, Image, Pagination } from "react-bootstrap";
import PageHelpButton from "../help/PageHelpButton";
import SlidePage from "./SlidePage";
import { getSystemSlideImages, getSystemSlides } from "../../api/fakeBackend";

export default function SystemPage() {
    const [pageNumber, setPageNumber] = useState(0);
    const [data, setData] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        getSystemSlides().then(setData);
        getSystemSlideImages().then(setImages);
    }, []);

    const currentSlide = data[pageNumber];
    const currentImage = images[pageNumber % images.length];

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                    <p className="text-uppercase text-muted fw-bold small">System</p>
                    <h1 className="display-5 fw-bold">KAAS system overview.</h1>
                    <p className="lead text-muted">
                        This page explains the fake internal system behind Ajay-Media: how
                        campaigns are structured, varied, and prepared for checkout.
                    </p>
                </div>

                
            </div>

            <div className="p-4 bg-light rounded-4 shadow-sm my-4">
                {currentImage && (
                    <Image
                        src={currentImage}
                        alt={`Visual for KAAS system slide ${pageNumber + 1}`}
                        fluid
                        rounded
                        className="mb-4"
                    />
                )}

                {currentSlide ? (
                    <SlidePage
                        title={currentSlide.title}
                        description={currentSlide.description}
                    />
                ) : (
                    <p>Loading system slides...</p>
                )}
            </div>

            <div className="d-flex gap-3 align-items-center flex-wrap">
                <Button
                    variant="outline-dark"
                    disabled={pageNumber === 0}
                    onClick={() => setPageNumber((p) => Math.max(0, p - 1))}
                >
                    Previous
                </Button>

                <Pagination className="mb-0">
                    {data.map((_, i) => (
                        <Pagination.Item
                            key={i}
                            active={i === pageNumber}
                            onClick={() => setPageNumber(i)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>

                <Button
                    variant="dark"
                    disabled={pageNumber >= data.length - 1}
                    onClick={() => setPageNumber((p) => Math.min(data.length - 1, p + 1))}
                >
                    Next
                </Button>
            </div>
        </Container>
    );
}