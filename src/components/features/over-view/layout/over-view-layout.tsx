import { type ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OverViewLayoutProps {
  children: ReactNode;
}

const OverViewLayout = ({ children }: OverViewLayoutProps) => {
  return (
    <ScrollArea className="rounded-md border xl:h-[75vh] h-[70vh] p-2">
      {children}
    </ScrollArea>
  );
};

export default OverViewLayout;
