import { useNavigate } from "@tanstack/react-router";

const ButtonCircle: React.FC = () => {
const navigate = useNavigate();

return (
<button
    onClick={() => navigate({ to: "/dashboard/create" })}
    className="btn btn-circle fixed bottom-5"
>
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    >
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4v16m8-8H4"
    />
    </svg>
</button>
);
};

export default ButtonCircle;
