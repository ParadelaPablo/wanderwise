import { UserProfile } from "@clerk/clerk-react";

const SettingsPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pr-25">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
                <UserProfile />
            </div>
        </div>
    );
};

export default SettingsPage;
