import { useEffect, useState } from "react";
import { Button, Container, Image, Pagination } from "react-bootstrap";
import {
    getSystemSlideImages,
    getSystemSlides,
} from "../../api/fakeBackend";
import SlidePage from "./SlidePage";

export default function SystemPage() {
    const [pageNumber, setPageNumber] = useState(0);
    const [data, setData] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function loadSystemData() {
            const slides = await getSystemSlides();
            const slideImages = await getSystemSlideImages();

            setData(slides);
            setImages(slideImages);
        }

        loadSystemData();
    }, []);

    const currentSlide = data[pageNumber];
    const currentImage = images.length > 0 ? images[pageNumber % images.length] : null;

    return (
        <Container className="py-5">
            <p className="text-uppercase text-secondary fw-bold small">System</p>
            <h1 className="display-5 fw-bold">KAAS system overview.</h1>

            <p className="lead">
                This page explains the fake internal system behind Ajay-Media. The page
                asks the backend for slide content and images, then displays the result.
            </p>

            <section className="p-4 bg-light rounded-4 shadow-sm my-4">
                {currentImage && (
                    <Image
                        src={currentImage}
                        alt={`Illustration for KAAS system slide ${pageNumber + 1}`}
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
            </section>

            <nav
                className="d-flex gap-3 align-items-center flex-wrap"
                aria-label="System slide pagination"
            >
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
                            active={pageNumber === i}
                            onClick={() => setPageNumber(i)}
                            aria-label={`Go to system slide ${i + 1}`}
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
            </nav>
        </Container>
    );
}