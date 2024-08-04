"use client";

import TooltipWrapper from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { downloadFile, jsonToCsv } from "@/lib/utils";
import { ReactNode } from "react";
import { IoDownload } from "react-icons/io5";

interface Props {
  title: string;
  description?: string;
  processedData?: any[];
  children: ReactNode;
}

export function ShadcnChartTemplate({
  title,
  description = "",
  processedData,
  children,
}: Props) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex w-full justify-between items-center">
          <CardTitle>{title}</CardTitle>
          {processedData && (
            <TooltipWrapper tooltip="Descargar datos procesados en .csv">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // download csv
                  const blob = new Blob([jsonToCsv(processedData)], {
                    type: "text/csv",
                  });
                  downloadFile(`${title}.csv`, blob);
                }}
              >
                <IoDownload />
              </Button>
            </TooltipWrapper>
          )}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
