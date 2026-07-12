import { Route } from "@/types";

export function formatRoute(route: Route): string {
  return route === "MIT_TO_AIRPORT" ? "MIT → Airport" : "Airport → MIT";
}

export function routeTimeLabel(route: Route): string {
  return route === "MIT_TO_AIRPORT" ? "Flight Departure Time" : "Flight Arrival Time";
}

export function formatFare(fare: number): string {
  return `₹${fare.toLocaleString("en-IN")}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatTime(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = minuteStr ?? "00";
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minute} ${period}`;
}

export function getTimeSlotBounds(hour: number): "00-06" | "06-12" | "12-18" | "18-24" {
  if (hour < 6) return "00-06";
  if (hour < 12) return "06-12";
  if (hour < 18) return "12-18";
  return "18-24";
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}
