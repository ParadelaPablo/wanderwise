import { useRouter } from "@tanstack/react-router";

const HomeBeforeLogin: React.FC = () => {
    const router = useRouter();

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Hi, this is Wander Wise
        </h1>
        <button
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            onClick={() => router.navigate({ to: "/signin" })}
            >
            Let´s Go
        </button>
        </div>
    </main>
);
};

export default HomeBeforeLogin;
