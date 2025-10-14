import './Cards.scss';

export default function Cards() {
  return (
    <div className="cards">
      <div className="card">
        <div className="hero-image hero-image-1">
          <div className="hero-text">
            <h3>UX Research</h3>
            <p>This design is gonna be good. This design is gonna be good. This design is gonna be good.</p>
          </div>
          <div>
            <button className="card-button">LEARN MORE</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="hero-image hero-image-2">
          <div className="hero-text">
            <h3>Bootcamp</h3>
            <p>This design is gonna be good. This design is gonna be good. This design is gonna be good.</p>
          </div>
          <div>
            <button className="card-button">LEARN MORE</button>
          </div>
        </div>
      </div>

      <div className="card review-card">
        <div className="review-header">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="User" className="avatar" />
          <div className="reviewer-info">
            <h3 className="name name-primary">Bobby Jennings</h3>
            <p className="role role-primary">Founder & CEO, <span className="company company-primary">Sketch App</span></p>
          </div>
          <div className="stars stars_primary">
            ★★★★☆
          </div>
        </div>
        <div className="review-body review-primary">
          <p>
            All users on MySpace are good.
          </p>
        </div>
      </div>


      <div className="card review-card hero-image-3">
        <div className="review-header">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="User" className="avatar" />
          <div className="reviewer-info">
            <h3 className="name name-secondary">Donald Bridges</h3>
            <p className="role role-secondary">Founder & CEO, <span className="company company-secondary">Adobe</span></p>
          </div>
          <div className="stars stars_secondary">
            ★★★★☆
          </div>
        </div>
        <div className="review-body review-secondary">
          <p>
            All users on MySpace are good.
          </p>
        </div>
      </div>

    </div >
  )
}