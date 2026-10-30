export const cabsData = [
  {
    id: "sedan",
    name: "Sedan (Swift Dzire / Etios)",
    category: "Sedan",
    seating: "4 Passengers + 1 Driver",
    luggage: "2 Big Bags + 2 Small Handbags",
    ratePerKm: "₹12 / km",
    acType: "Air Conditioned (Plain & Hill)",
    idealFor: "Couples, Solo Travelers, Small Families",
    features: ["Clean sanitized interior", "Hill-experienced driver", "Music system with Bluetooth", "Boot space for luggage"],
    baseFareDelhiToManali: 11500,
    baseFareDelhiToShimla: 7800,
    baseFareDelhiToRishikesh: 5200,
    baseFareDelhiToNainital: 6400
  },
  {
    id: "ertiga",
    name: "Maruti Ertiga / Triber",
    category: "Mid SUV",
    seating: "6 Passengers + 1 Driver",
    luggage: "3 Big Bags + Handbags (Roof Carrier available)",
    ratePerKm: "₹15 / km",
    acType: "Dual AC Blower",
    idealFor: "Families with kids, 4-5 Adults with Luggage",
    features: ["Roof luggage rack", "Extra legroom", "Smooth hill suspension", "GPS enabled with SOS"],
    baseFareDelhiToManali: 14500,
    baseFareDelhiToShimla: 9800,
    baseFareDelhiToRishikesh: 6800,
    baseFareDelhiToNainital: 8200
  },
  {
    id: "innova",
    name: "Toyota Innova Crysta",
    category: "Premium SUV",
    seating: "6 or 7 Captain Seats + 1 Driver",
    luggage: "4 Large Suitcases + Roof Carrier",
    ratePerKm: "₹19 / km",
    acType: "Tri-Zone Climate Control",
    idealFor: "Luxury Family Trips, Honeymooners, High Himalayan Circuits",
    features: ["Superior hill safety & ABS", "Reclining captain seats", "Powerful hill climbing engine", "Senior citizen friendly"],
    baseFareDelhiToManali: 18500,
    baseFareDelhiToShimla: 12500,
    baseFareDelhiToRishikesh: 8900,
    baseFareDelhiToNainital: 10800
  },
  {
    id: "tempo",
    name: "Luxury Force Tempo Traveller",
    category: "Minibus",
    seating: "12 / 17 / 26 Pushback Seats",
    luggage: "Dedicated luggage boot + Roof carrier",
    ratePerKm: "₹26 / km",
    acType: "High-capacity Ducted AC",
    idealFor: "College Groups, Corporate Retreats, Extended Joint Families",
    features: ["Pushback ergonomic seats", "High-power music & LED TV", "Ample aisle room", "Experienced multi-day tour captain"],
    baseFareDelhiToManali: 29500,
    baseFareDelhiToShimla: 19500,
    baseFareDelhiToRishikesh: 14200,
    baseFareDelhiToNainital: 17500
  }
];

export const popularCabRoutes = [
  { from: "Delhi NCR", to: "Manali", distance: "540 km", duration: "10-12 hrs via Highway & Atal Tunnel" },
  { from: "Delhi NCR", to: "Shimla", distance: "345 km", duration: "7-8 hrs via Himalayan Expressway" },
  { from: "Delhi NCR", to: "Rishikesh", distance: "245 km", duration: "5-6 hrs via Meerut Expressway" },
  { from: "Delhi NCR", to: "Nainital", distance: "315 km", duration: "6-7 hrs via Moradabad Highway" },
  { from: "Chandigarh", to: "Manali", distance: "280 km", duration: "6-7 hrs via Kiratpur-Nerchowk 4-lane" },
  { from: "Chandigarh", to: "Dharamshala", distance: "240 km", duration: "5-6 hrs" },
  { from: "Haridwar", to: "Guptkashi / Kedarnath", distance: "210 km", duration: "7-8 hrs scenic river route" }
];
