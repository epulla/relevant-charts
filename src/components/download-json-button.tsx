"use client";
import { downloadFile } from "@/lib/utils";
import { Button } from "./ui/button";
import { IoDownload } from "react-icons/io5";
import TooltipWrapper from "./tooltip-wrapper";

interface Props {
  tooltip: string;
  filename: string;
  data: any;
}
export default function DownloadJsonButton({ tooltip, filename, data }: Props) {
  return (
    <TooltipWrapper tooltip={tooltip}>
      <Button
        variant="outline"
        size="sm"
        className="rounded bg-white text-black"
        onClick={() => {
          const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
          });
          downloadFile(filename, blob);
        }}
      >
        <IoDownload />
      </Button>
    </TooltipWrapper>
  );
}
