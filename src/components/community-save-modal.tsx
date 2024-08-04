"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WarningCard from "@/components/warning-card";
import { useState } from "react";
import { IoReload } from "react-icons/io5";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import Link from "next/link";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coverImageUrl: string;
  data: any;
}

export default function CommunitySaveModal({
  open,
  onOpenChange,
  coverImageUrl,
  data,
}: Props) {
  const [keepAnonymous, setKeepAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Guardar y compartir con la comunidad</DialogTitle>
          <DialogDescription>
            <WarningCard
              variant="warning"
              description="Solo tus datos procesados se guardarán en una base de datos para compartirlos con la comunidad. Tu dataset NO será compartido."
            ></WarningCard>
          </DialogDescription>
        </DialogHeader>
        {coverImageUrl ? (
          <img src={coverImageUrl} alt="Cover" className="w-full rounded-md" />
        ) : (
          <div className="flex w-full justify-center">
            <IoReload className="animate-spin text-3xl text-primary" />
          </div>
        )}
        <form
          action={async (formData: FormData) => {
            formData.set("isAnonymous", keepAnonymous.toString());
            formData.set("coverImageUrl", coverImageUrl);
            // await saveUserData(formData, data);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const id = Math.random().toString(36).slice(2, 10);
            toast({
              title: "Éxito!",
              description: "Ocurrió un error al recibir la respuesta de la IA",
              action: (
                <Link href={`/examples/community/${id}`}>
                  <ToastAction altText="Ver">Ver</ToastAction>
                </Link>
              ),
              duration: 5000,
            });
            setIsLoading(false);
            onOpenChange(false);
          }}
          className="grid gap-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="El Dashboard de Erick"
              className="col-span-3"
              type="text"
              required
              min={10}
              max={100}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              Autor
            </Label>
            <Input
              id="author"
              name="author"
              placeholder={keepAnonymous ? "Anónimo" : "epulla"}
              className="col-span-3"
              type="text"
              required={!keepAnonymous}
              disabled={keepAnonymous}
              max={50}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Checkbox
              checked={keepAnonymous}
              onClick={() => setKeepAnonymous(!keepAnonymous)}
              className="justify-self-end"
            />
            <Label htmlFor="keepAnonymous" className="col-span-3">
              Anónimo?
            </Label>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="flex gap-2 md:w-24"
              onClick={() => setIsLoading(true)}
            >
              {!isLoading ? (
                <>Guardar</>
              ) : (
                <IoReload className="animate-spin text-3xl w-4 h-4" />
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
