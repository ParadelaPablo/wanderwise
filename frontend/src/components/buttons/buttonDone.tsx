import { useNavigate } from 'react-router-dom';

const ButtonDone = () => {
    const navigate = useNavigate();

    return (
	    <button
	        onClick={() => navigate("/dashboard/trips/$tripId")}
	        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
	    >
	    Done
	    </button>
    );
};

export default ButtonDone;