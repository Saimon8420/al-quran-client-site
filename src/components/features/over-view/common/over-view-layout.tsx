import { type ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OverViewLayoutProps {
  children: ReactNode;
}

const OverViewLayout = ({ children }: OverViewLayoutProps) => {
  return (
    <ScrollArea className="rounded-md border 2xl:h-[64vh] lg:h-[60vh] md:h-[53vh] sm:h-[50vh] h-[55vh] p-2">
      {children}
    </ScrollArea>
  );
};

export default OverViewLayout;
