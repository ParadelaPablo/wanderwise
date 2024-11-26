



const Contact: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center p-6">
        <main className="text-center mb-4">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Contact Us</h2>
            <p className="text-base mb-6 text-gray-600">
            Have any questions? We'd love to hear from you! Fill out the form
            below or reach us at{" "}
            <a
                href="mailto:support@collabtask.com"
                className="text-blue-500 font-semibold hover:underline"
            >
                support@wanderwise.com
            </a>
            .
            </p>
            <form className="bg-white max-w-md w-full p-4 rounded-md shadow-md mx-auto flex flex-col gap-4">
            <div className="flex flex-col items-start">
                <label
                htmlFor="name"
                className="text-sm font-bold text-gray-800 mb-1"
                >
                Your Name
                </label>
                <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="flex flex-col items-start">
                <label
                htmlFor="email"
                className="text-sm font-bold text-gray-800 mb-1"
                >
                Your Email
                </label>
                <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="flex flex-col items-start">
                <label
                htmlFor="message"
                className="text-sm font-bold text-gray-800 mb-1"
                >
                Your Message
                </label>
                <textarea
                id="message"
                rows={4}
                placeholder="Write your message"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white rounded-md py-2 px-4 font-semibold w-full hover:bg-blue-600 transition duration-300"
            >
                Send Message
            </button>
            </form>
        </main>
        </div>
    );
    };
    
    export default Contact;
    