
const Contact = () => {
    return (
        <div className="contact">
            <main className="main-content">
                <h2 className="section-title">Contact Us</h2>
                <p className="section-description">
                    Have any questions? We'd love to hear from you! Fill out the form
                    below or reach us at{" "}
                    <a href="mailto:support@company.com" className="active-link">
                        support@collabtask.com
                    </a>
                    .
                </p>
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message" className="form-label">Your Message</label>
                        <textarea
                            id="message"
                            rows={4}
                            placeholder="Write your message"
                            className="textarea"
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-primary">
                        Send Message
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Contact;
