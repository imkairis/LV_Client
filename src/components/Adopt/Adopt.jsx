import { Link } from "react-router-dom";

export const Adopt = ({ id, image, age, name, description, status }) => {
  return (
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
      <img alt="" src={image} className="h-56 w-full object-cover" />
      <div className="bg-white p-4 sm:p-6">
        <h3 className="block text-xs text-gray-500">Tuổi: {age}</h3>
        <Link to={`/adopt/${id}`}>
          <h3 className="mt-0.5 text-lg text-gray-900">{name}</h3>
        </Link>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {description}
        </p>
        <p className="text-xs mt-2 text-gray-400">Trạng thái: {status}</p>
      </div>
    </article>
  );
};

export default Adopt;
