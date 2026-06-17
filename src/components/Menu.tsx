// Unidirectional Data Flow: Props passed down from parent to child
// Component-driven thinking: Isolating the reusable item structure
type MenuItemProps = {
    title: string;
    price: string;
    description: string;
};

const MenuItem = ({ title, price, description }: MenuItemProps) => {
    return (
        <div className="menu-item">
            <div className="menu-item-header">
                <h4>{title}</h4>
                <span className="price">{price}</span>
            </div>
            <p>{description}</p>
        </div>
    );
};

export const Menu = () => {
    // Immutable data structure defining our content
    const coffeeMenu = [
        { id: 1, title: 'Espresso', price: '₹160', description: 'Rich, full-bodied double shot of our house blend.' },
        { id: 2, title: 'Cortado', price: '₹190', description: 'Equal parts espresso and steamed milk.' },
        { id: 3, title: 'Latte', price: '₹220', description: 'Smooth espresso with perfectly micro-foamed milk.' },
        { id: 4, title: 'Pour Over', price: '₹260', description: 'Single-origin, hand-poured for ultimate clarity.' }
    ];

    const pastryMenu = [
        { id: 5, title: 'Butter Croissant', price: '₹180', description: 'Classic French style, golden and flaky.' },
        { id: 6, title: 'Almond Croissant', price: '₹230', description: 'Twice-baked with almond frangipane.' },
        { id: 7, title: 'Masala Bun', price: '₹170', description: 'Soft bun with warm spices and orange zest.' },
        { id: 8, title: 'Avocado Toast', price: '₹320', description: 'Sourdough, smashed avocado, chili flakes, sea salt.' }
    ];

    return (
        <section className="menu" id="menu">
            <div className="container">
                <div className="section-header center">
                    <span className="section-subtitle">Tasting Menu</span>
                    <h2>Sip & Savor</h2>
                </div>
                
                <div className="menu-grid">
                    {/* Coffee Items */}
                    <div className="menu-category">
                        <h3>Espresso Bar</h3>
                        {/* Declarative rendering: mapping over data instead of imperative DOM creation */}
                        {coffeeMenu.map(item => (
                            <MenuItem 
                                key={item.id} 
                                title={item.title} 
                                price={item.price} 
                                description={item.description} 
                            />
                        ))}
                    </div>

                    {/* Featured Menu Image */}
                    <div className="menu-featured">
                        <div className="featured-card">
                            <img src="/images/latte_art.png" alt="Beautiful Latte Art" />
                            <div className="featured-overlay">
                                <span>Signature Latte</span>
                            </div>
                        </div>
                    </div>

                    {/* Pastry Items */}
                    <div className="menu-category">
                        <h3>Fresh Pastries</h3>
                        {pastryMenu.map(item => (
                            <MenuItem 
                                key={item.id} 
                                title={item.title} 
                                price={item.price} 
                                description={item.description} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
