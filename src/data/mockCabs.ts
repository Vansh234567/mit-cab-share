import { CabListing, Route } from "@/types";

const routes: Route[] = ["MIT_TO_AIRPORT", "AIRPORT_TO_MIT"];

const contactNumbers = [
  "9845012345",
  "9741023456",
  "8951234567",
  "9901122334",
  "7899012345",
  "9611234567",
  "8867890123",
  "9986543210",
  "7411223344",
  "9008765432",
];

interface Seed {
  daysFromNow: number;
  time: string;
  peopleAlreadyTraveling: number;
  needMorePeople: number;
  totalFare: number;
}

const seeds: Seed[] = [
  { daysFromNow: 0, time: "05:30", peopleAlreadyTraveling: 1, needMorePeople: 3, totalFare: 2400 },
  { daysFromNow: 0, time: "14:00", peopleAlreadyTraveling: 2, needMorePeople: 2, totalFare: 2200 },
  { daysFromNow: 1, time: "07:45", peopleAlreadyTraveling: 1, needMorePeople: 2, totalFare: 2000 },
  { daysFromNow: 1, time: "20:15", peopleAlreadyTraveling: 3, needMorePeople: 1, totalFare: 2500 },
  { daysFromNow: 2, time: "10:30", peopleAlreadyTraveling: 1, needMorePeople: 3, totalFare: 2300 },
  { daysFromNow: 2, time: "23:00", peopleAlreadyTraveling: 2, needMorePeople: 2, totalFare: 2600 },
  { daysFromNow: 3, time: "04:15", peopleAlreadyTraveling: 1, needMorePeople: 3, totalFare: 2400 },
  { daysFromNow: 3, time: "16:45", peopleAlreadyTraveling: 2, needMorePeople: 1, totalFare: 1900 },
  { daysFromNow: 4, time: "09:00", peopleAlreadyTraveling: 1, needMorePeople: 2, totalFare: 2100 },
  { daysFromNow: 4, time: "18:30", peopleAlreadyTraveling: 3, needMorePeople: 1, totalFare: 2500 },
  { daysFromNow: 5, time: "06:00", peopleAlreadyTraveling: 1, needMorePeople: 3, totalFare: 2350 },
  { daysFromNow: 5, time: "13:15", peopleAlreadyTraveling: 2, needMorePeople: 2, totalFare: 2200 },
  { daysFromNow: 6, time: "21:45", peopleAlreadyTraveling: 1, needMorePeople: 3, totalFare: 2600 },
  { daysFromNow: 6, time: "11:00", peopleAlreadyTraveling: 2, needMorePeople: 1, totalFare: 1950 },
  { daysFromNow: 7, time: "03:30", peopleAlreadyTraveling: 1, needMorePeople: 2, totalFare: 2450 },
  { daysFromNow: 7, time: "15:30", peopleAlreadyTraveling: 3, needMorePeople: 1, totalFare: 2050 },
  { daysFromNow: 8, time: "08:15", peopleAlreadyTraveling: 1, needMorePeople: 3, totalFare: 2150 },
  { daysFromNow: 8, time: "19:00", peopleAlreadyTraveling: 2, needMorePeople: 2, totalFare: 2400 },
  { daysFromNow: 9, time: "12:45", peopleAlreadyTraveling: 1, needMorePeople: 3, totalFare: 2300 },
  { daysFromNow: 10, time: "22:30", peopleAlreadyTraveling: 2, needMorePeople: 1, totalFare: 2550 },
];

function dateFromToday(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export const mockCabs: CabListing[] = seeds.map((seed, index) => ({
  id: `cab-${index + 1}`,
  route: routes[index % routes.length],
  travelDate: dateFromToday(seed.daysFromNow),
  time: seed.time,
  peopleAlreadyTraveling: seed.peopleAlreadyTraveling,
  needMorePeople: seed.needMorePeople,
  contactNumber: contactNumbers[index % contactNumbers.length],
  totalFare: seed.totalFare,
  createdAt: new Date().toISOString(),
}));
