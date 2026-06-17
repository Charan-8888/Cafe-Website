export const Hero = () => {
    return (
        <header className="hero" id="home">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="fade-up">Crafted for the Senses.</h1>
                <p className="fade-up delay-1">Artisanal coffee, freshly baked pastries, and an atmosphere designed to inspire.</p>
                <div className="hero-buttons fade-up delay-2">
                    <a href="#action-section" className="btn btn-primary">Book a Table</a>
                    <a href="#action-section" className="btn btn-secondary">Order Pickup</a>
                </div>
            </div>
        </header>
    );
};

export const About = () => {
    return (
        <section className="about" id="about">
            <div className="container about-grid">
                <div className="about-text">
                    <span className="section-subtitle">Our Philosophy</span>
                    <h2>More than just coffee. A daily ritual.</h2>
                    <p>At Aura Coffee Roasters, we believe in the transformative power of a perfect cup. We source our beans ethically from single-origin farms and roast them meticulously in-house to bring out their unique tasting notes.</p>
                    <p>Paired with our daily baked pastries and a warm, inviting space, we're not just serving coffee—we're creating moments.</p>
                    <a href="#visit" className="btn btn-outline">Find Our Cafe</a>
                </div>
                <div className="about-image-wrapper">
                    <div className="about-image-card">
                        <img src="/images/cafe_vibes.png" alt="Cozy cafe seating area" className="about-img" />
                    </div>
                    <div className="decorative-square"></div>
                </div>
            </div>
        </section>
    );
};
