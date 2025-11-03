import type { PageResponse as ManzilResponse } from "@/components/redux/api/quranSectionsApi";

interface ManzilViewProps {
  data: ManzilResponse;
}

const ManzilView = ({ data }: ManzilViewProps) => {
  console.log("Manzil data:", data);
  return <div></div>;
};

export default ManzilView;
