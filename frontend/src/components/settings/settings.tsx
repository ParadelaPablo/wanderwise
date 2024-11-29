import { UserProfile } from "@clerk/clerk-react";

const SettingsPage = () => {
    return (
        <div className="flex pt-4 justify-center items-center min-h-screen bg-gray-100 pr-25">
           <UserProfile />
        </div>
    );
};

export default SettingsPage;
