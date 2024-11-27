const HighlightCard = ({url}) => {
  return (
    <div className="border rounded ">
        <p className="text-center">Titel</p>
      <button className="overflow-hidden h-36 w-screen">
        <img
          className="object-cover object-center w-full h-full rounded"
          src={url}
          alt=""
        />
      </button>
      <p className="text-center" >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eius
        
      </p>
    </div>
  );
};

export default HighlightCard;
