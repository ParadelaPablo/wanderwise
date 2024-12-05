import { useRouter } from "@tanstack/react-router";
import Logo from "../../assets/landingPage/logo/logofinalmaybe.png";

const HomeBeforeLogin: React.FC = () => {
const router = useRouter();

return (
<main className="flex flex-col items-center justify-center bg-white mt-16 md:mt-24 lg:mt-32 xl:mt-40">
    <div className="bg-white rounded-lg p-8 max-w-md text-center md:max-w-lg lg:max-w-2xl xl:max-w-7xl">
    <h1 className="text-3xl font-extrabold mb-4 text-gray-800 md:text-4xl lg:text-5xl xl:text-6xl">
        WanderWise
    </h1>

    <img
        src={Logo}
        alt="Wander Wise Logo"
        className="mx-auto my-6 w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40"
    />

    <h2 className="m-2 font-bold mt-9 md:text-2xl lg:text-3xl xl:text-4xl">
        Plan your perfect journey effortlessly.
    </h2>
    <h3 className="mt-7 mb-5 text-sm md:text-base lg:text-lg xl:text-xl">
        Organize detailed travel itineraries, discover curated guides from
        fellow travelers, and keep all your bookings in one convenient hub.
    </h3>
    <button
        className="px-6 py-2 bg-blue-900 text-white font-semibold rounded-xl hover:bg-blue-600 md:px-8 md:py-3 lg:px-10 lg:py-4 xl:px-12 xl:py-5"
        onClick={() => router.navigate({ to: "/signin" })}
    >
        Let´s Go
    </button>
    </div>
</main>
);
};

export default HomeBeforeLogin;
