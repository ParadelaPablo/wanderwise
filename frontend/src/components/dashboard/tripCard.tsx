import { useRouter } from "@tanstack/react-router";

type TripCardProps = {
  id: number;
  title: string;
};

const TripCard = ({ id, title }: TripCardProps) => {
  const router = useRouter();

  return (
    <div>
      <div className="w-full relative">
        <button className="btn m-2 absolute top-0 right-0 z-10">X</button>
        <button
          className="btn glass p-0 w-80 h-40 relative"
          onClick={() => router.navigate({ to: `/dashboard/trips/${id}` })}
        >
          <img
            className="w-full h-full rounded-2xl object-cover"
            src="https://t3.ftcdn.net/jpg/03/04/88/18/360_F_304881889_yJ1S3butl9gVs0kMptYTU2N1EVmEJbz8.jpg"
            alt=""
          />
          <p className="absolute top-0 left-0 w-full flex gap-2 bg-black bg-opacity-40 text-white px-4 py-2 rounded shadow-md rounded-t-2xl">
            {title}
          </p>
        </button>
      </div>
    </div>
  );
};

export default TripCard;
