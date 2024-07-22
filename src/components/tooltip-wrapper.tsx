import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  tooltip: string;
}

export default function TooltipWrapper({ children, tooltip }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p className="text-sm text-primary opacity-50">{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
