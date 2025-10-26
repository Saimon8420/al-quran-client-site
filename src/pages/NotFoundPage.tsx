import { Home } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center my-30">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-8">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="flex items-center justify-center gap-2">
        <Home />
        Go back to
      </Link>
    </div>
  );
};

export default NotFoundPage;
