export default function SlidePage(props) {
    return (
        <section>
            <h2 className="fw-bold">{props.title}</h2>
            <p className="lead text-muted mb-0">{props.description}</p>
        </section>
    );
}