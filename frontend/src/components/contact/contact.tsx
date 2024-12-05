const Contact: React.FC = () => {
  return (
    <div className=" flex flex-col justify-center items-center p-6">
      <main className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2 mt-10">Contact Us</h2>
        <p className="text-base mb-6 mt-10">
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

        <form className="max-w-md w-full mt-20 p-4 rounded-md shadow-2xl mx-auto flex flex-col gap-4">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            <input type="text" className="grow" placeholder="Subject" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Username" />
          </label>
          <textarea
            className="textarea textarea-bordered resize-none"
            placeholder="Text..."
          ></textarea>
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