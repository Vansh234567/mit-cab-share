"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface VerifyPinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  correctPin: string;
  title: string;
  onVerified: () => void;
}

export function VerifyPinDialog({
  open,
  onOpenChange,
  correctPin,
  title,
  onVerified,
}: VerifyPinDialogProps) {
  const [pin, setPin] = useState("");

  const verify = () => {
    if (pin !== correctPin) {
      toast.error("Incorrect PIN");
      return;
    }

    onVerified();
    setPin("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="password"
            maxLength={4}
            placeholder="Enter 4-digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button onClick={verify}>
              Verify
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}