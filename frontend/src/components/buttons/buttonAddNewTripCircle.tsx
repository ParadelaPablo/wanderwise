import { useNavigate } from "@tanstack/react-router";

const ButtonCircle: React.FC = () => {
const navigate = useNavigate();

return (
<button
    onClick={() => navigate({ to: "/dashboard/create" })}
    className="btn btn-circle bg-teal-500 text-white hover:bg-teal-600 shadow-lg sticky bottom-5 mx-auto block flex items-center justify-center"
>
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    >
    <path d="M12 5v14M5 12h14" />
    </svg>
</button>
);
};

export default ButtonCircle;
