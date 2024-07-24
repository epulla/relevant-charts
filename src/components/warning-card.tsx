import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { IoBulbOutline, IoWarningOutline } from "react-icons/io5";

const variants = {
  warning: {
    title: "Advertencia",
    bgClasses: "bg-red-600",
    icon: <IoWarningOutline />,
  },
  reminder: {
    title: "Recordatorio",
    bgClasses: "bg-yellow-600",
    icon: <IoBulbOutline />,
  },
};

interface Props {
  description: string;
  variant: "reminder" | "warning";
}

export default function WarningCard({ description, variant }: Props) {
  return (
    <Card
      className={`w-full bg-opacity-25 ${clsx(variants[variant].bgClasses)}`}
    >
      <CardHeader>
        <CardTitle className="flex gap-2">
          {variants[variant].icon}
          {variants[variant].title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
