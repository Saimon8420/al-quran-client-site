import { useNavigate } from "react-router";

const useHanldeNavigate = () => {
  const navigate = useNavigate();

  const handleNavigate = (surah?: number, path?: string, ayah?: number) => {
    if (!surah) return;

    if (path === "sajda" || path === "ruku") {
      navigate(`/${path}/${surah}/${ayah}`);
    } else {
      navigate(`/${path}/${surah}`);
    }
  };

  return handleNavigate;
};

export default useHanldeNavigate;
