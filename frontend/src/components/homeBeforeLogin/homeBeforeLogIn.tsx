import { useRouter } from "@tanstack/react-router";

const HomeBeforeLogin: React.FC = () => {
const router = useRouter();

return (
<main className="flex flex-col items-center justify-center bg-gray-100 mt-16"> {/* Ajuste aquí */}
    <div className="bg-white rounded-lg p-8 max-w-md text-center">
    <h1 className="text-3xl font-extrabold mb-4 text-gray-800">Wander Wise</h1>
    <h2 className="m-2 font-bold mt-9">
        Plan your perfect journey effortlessly.
    </h2>
    <h3 className="mt-7 mb-5">
        Organize detailed travel itineraries, discover curated guides from
        fellow travelers, and keep all your bookings in one convenient hub.
    </h3>
    <button
        className="px-6 py-2 bg-blue-900 text-white font-semibold rounded-xl hover:bg-blue-600"
        onClick={() => router.navigate({ to: "/signin" })}
    >
        Let´s Go
    </button>
    </div>
</main>
);
};

export default HomeBeforeLogin;
