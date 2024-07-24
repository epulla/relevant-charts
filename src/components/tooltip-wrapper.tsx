import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  tooltip: string;
  align?: "start" | "center" | "end";
}

export default function TooltipWrapper({
  tooltip,
  align = "center",
  children,
}: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent align={align}>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
