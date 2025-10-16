import mecca from "@/assets/images/mecca.png";
import madinah from "@/assets/images/madinah.png";

interface RevelationImage {
  revelationType: string;
}

const RenderRevelationImage = ({ revelationType }: RevelationImage) => {
  return (
    <img
      src={revelationType === "Meccan" ? mecca : madinah}
      alt={revelationType === "Meccan" ? "mecca" : "madinah"}
      className="w-12 h-12 dark:invert"
    />
  );
};

export default RenderRevelationImage;
