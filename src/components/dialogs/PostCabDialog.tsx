"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cabFormSchema, type CabFormInput, type CabFormOutput } from "@/lib/validation";
import { CabFormValues, Route } from "@/types";
import { routeTimeLabel } from "@/utils/format";

interface PostCabDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitCab: (values: CabFormValues) => void;
}

const defaultValues: CabFormInput = {
  route: "MIT_TO_AIRPORT",
  travelDate: "",
  time: "",
  peopleAlreadyTraveling: "1",
  needMorePeople: "1",
  contactNumber: "",
  managePin: "",
  totalFare: "",
};

export function PostCabDialog({ open, onOpenChange, onSubmitCab }: PostCabDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CabFormInput, unknown, CabFormOutput>({
    resolver: zodResolver(cabFormSchema),
    defaultValues,
  });

  const route = watch("route") as Route;

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
    }
  }, [open, reset]);

  const onSubmit = (values: CabFormOutput) => {
    onSubmitCab(values);
    toast.success("Your cab has been posted!", {
      description: "Other students can now see and contact you.",
    });
    onOpenChange(false);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post a Cab</DialogTitle>
          <DialogDescription>
            Share your ride details so fellow students can join and split the fare.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="route">Route</Label>
            <Controller
              control={control}
              name="route"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="route">
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MIT_TO_AIRPORT">MIT → Airport</SelectItem>
                    <SelectItem value="AIRPORT_TO_MIT">Airport → MIT</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.route && (
              <p className="text-xs text-red-500">{errors.route.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="travelDate">Travel Date</Label>
              <Input
                id="travelDate"
                type="date"
                min={todayStr}
                {...register("travelDate")}
              />
              {errors.travelDate && (
                <p className="text-xs text-red-500">{errors.travelDate.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="time">{routeTimeLabel(route)}</Label>
              <Input id="time" type="time" {...register("time")} />
              {errors.time && (
                <p className="text-xs text-red-500">{errors.time.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="peopleAlreadyTraveling">People Already Traveling</Label>
              <Input
                id="peopleAlreadyTraveling"
                type="number"
                min={1}
                {...register("peopleAlreadyTraveling")}
              />
              {errors.peopleAlreadyTraveling && (
                <p className="text-xs text-red-500">
                  {errors.peopleAlreadyTraveling.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="needMorePeople">Need More People</Label>
              <Input
                id="needMorePeople"
                type="number"
                min={1}
                {...register("needMorePeople")}
              />
              {errors.needMorePeople && (
                <p className="text-xs text-red-500">{errors.needMorePeople.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="9876543210"
              {...register("contactNumber")}
            />
            {errors.contactNumber && (
              <p className="text-xs text-red-500">{errors.contactNumber.message}</p>
            )}
          </div>
<div className="flex flex-col gap-1.5">
  <Label htmlFor="managePin">Manage Listing PIN</Label>

  <Input
    id="managePin"
    type="password"
    maxLength={4}
    placeholder="Enter 4-digit PIN"
    {...register("managePin")}
  />

  <p className="text-xs text-muted-foreground">
    You'll need this PIN to edit or delete your listing later.
  </p>

  {errors.managePin && (
    <p className="text-xs text-red-500">
      {errors.managePin.message}
    </p>
  )}
</div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="totalFare">Total Fare (₹)</Label>
            <Input
              id="totalFare"
              type="number"
              min={1}
              placeholder="2000"
              {...register("totalFare")}
            />
            {errors.totalFare && (
              <p className="text-xs text-red-500">{errors.totalFare.message}</p>
            )}
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Posting..." : "Post Cab"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
