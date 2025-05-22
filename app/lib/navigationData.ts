export interface NavigationCategory {
  name: string;
  href: string;
  subcategories?: NavigationCategory[];
  featured?: {
    name: string;
    href: string;
    imageUrl: string;
  }[];
}

export const mainNavigation: NavigationCategory[] = [
  {
    name: "Performance Parts",
    href: "/performance-parts",
    subcategories: [
      {
        name: "Engine",
        href: "/performance-parts/engine",
        subcategories: [
          { name: "Air Intake Systems", href: "/performance-parts/engine/air-intake" },
          { name: "Exhaust Systems", href: "/performance-parts/engine/exhaust" },
          { name: "Turbochargers & Superchargers", href: "/performance-parts/engine/forced-induction" },
          { name: "Engine Management", href: "/performance-parts/engine/management" },
          { name: "Fuel Systems", href: "/performance-parts/engine/fuel-systems" },
          { name: "Cooling Systems", href: "/performance-parts/engine/cooling" },
        ]
      },
      {
        name: "Drivetrain",
        href: "/performance-parts/drivetrain",
        subcategories: [
          { name: "Clutches & Flywheels", href: "/performance-parts/drivetrain/clutches" },
          { name: "Differentials", href: "/performance-parts/drivetrain/differentials" },
          { name: "Transmission Upgrades", href: "/performance-parts/drivetrain/transmission" },
          { name: "Driveshafts", href: "/performance-parts/drivetrain/driveshafts" },
        ]
      },
      {
        name: "Suspension & Steering",
        href: "/performance-parts/suspension",
        subcategories: [
          { name: "Coilovers", href: "/performance-parts/suspension/coilovers" },
          { name: "Springs", href: "/performance-parts/suspension/springs" },
          { name: "Shocks & Struts", href: "/performance-parts/suspension/shocks" },
          { name: "Sway Bars", href: "/performance-parts/suspension/sway-bars" },
          { name: "Control Arms", href: "/performance-parts/suspension/control-arms" },
          { name: "Bushings", href: "/performance-parts/suspension/bushings" },
        ]
      },
      {
        name: "Brakes",
        href: "/performance-parts/brakes",
        subcategories: [
          { name: "Brake Kits", href: "/performance-parts/brakes/kits" },
          { name: "Calipers", href: "/performance-parts/brakes/calipers" },
          { name: "Rotors", href: "/performance-parts/brakes/rotors" },
          { name: "Pads", href: "/performance-parts/brakes/pads" },
          { name: "Lines & Fittings", href: "/performance-parts/brakes/lines" },
        ]
      },
      {
        name: "Exterior",
        href: "/performance-parts/exterior",
        subcategories: [
          { name: "Body Kits", href: "/performance-parts/exterior/body-kits" },
          { name: "Spoilers & Wings", href: "/performance-parts/exterior/spoilers" },
          { name: "Hoods & Vents", href: "/performance-parts/exterior/hoods" },
          { name: "Splitters & Diffusers", href: "/performance-parts/exterior/splitters" },
        ]
      },
      {
        name: "Wheels & Tires",
        href: "/performance-parts/wheels-tires",
        subcategories: [
          { name: "Wheels", href: "/performance-parts/wheels-tires/wheels" },
          { name: "Tires", href: "/performance-parts/wheels-tires/tires" },
          { name: "Wheel Spacers", href: "/performance-parts/wheels-tires/spacers" },
          { name: "Lug Nuts & Bolts", href: "/performance-parts/wheels-tires/lugs" },
        ]
      },
      {
        name: "Electronics & Gauges",
        href: "/performance-parts/electronics",
        subcategories: [
          { name: "Performance Monitors", href: "/performance-parts/electronics/monitors" },
          { name: "Gauge Pods & Mounts", href: "/performance-parts/electronics/gauge-pods" },
          { name: "Boost Controllers", href: "/performance-parts/electronics/boost-controllers" },
          { name: "Wideband O2 Sensors", href: "/performance-parts/electronics/o2-sensors" },
          { name: "Data Loggers", href: "/performance-parts/electronics/data-loggers" },
        ]
      },
      {
        name: "Aerodynamics",
        href: "/performance-parts/aerodynamics",
        subcategories: [
          { name: "Front Splitters", href: "/performance-parts/aerodynamics/front-splitters" },
          { name: "Rear Diffusers", href: "/performance-parts/aerodynamics/rear-diffusers" },
          { name: "Side Skirts", href: "/performance-parts/aerodynamics/side-skirts" },
          { name: "Canards & Winglets", href: "/performance-parts/aerodynamics/canards" },
          { name: "Underbody Panels", href: "/performance-parts/aerodynamics/underbody" },
        ]
      },
      {
        name: "Interior Performance",
        href: "/performance-parts/interior",
        subcategories: [
          { name: "Racing Seats", href: "/performance-parts/interior/racing-seats" },
          { name: "Steering Wheels", href: "/performance-parts/interior/steering-wheels" },
          { name: "Shift Knobs", href: "/performance-parts/interior/shift-knobs" },
          { name: "Pedal Sets", href: "/performance-parts/interior/pedal-sets" },
          { name: "Roll Cages & Bars", href: "/performance-parts/interior/roll-cages" },
        ]
      },
      {
        name: "Forced Induction",
        href: "/performance-parts/forced-induction",
        subcategories: [
          { name: "Turbocharger Kits", href: "/performance-parts/forced-induction/turbo-kits" },
          { name: "Supercharger Kits", href: "/performance-parts/forced-induction/supercharger-kits" },
          { name: "Intercoolers", href: "/performance-parts/forced-induction/intercoolers" },
          { name: "Blow-Off Valves", href: "/performance-parts/forced-induction/blow-off-valves" },
          { name: "Wastegates", href: "/performance-parts/forced-induction/wastegates" },
        ]
      },
      {
        name: "Nitrous Systems",
        href: "/performance-parts/nitrous",
        subcategories: [
          { name: "Nitrous Kits", href: "/performance-parts/nitrous/kits" },
          { name: "Nitrous Bottles", href: "/performance-parts/nitrous/bottles" },
          { name: "Nitrous Controllers", href: "/performance-parts/nitrous/controllers" },
          { name: "Nitrous Solenoids", href: "/performance-parts/nitrous/solenoids" },
          { name: "Nitrous Accessories", href: "/performance-parts/nitrous/accessories" },
        ]
      },
      {
        name: "Engine Internals",
        href: "/performance-parts/engine-internals",
        subcategories: [
          { name: "Pistons & Rings", href: "/performance-parts/engine-internals/pistons" },
          { name: "Connecting Rods", href: "/performance-parts/engine-internals/connecting-rods" },
          { name: "Crankshafts", href: "/performance-parts/engine-internals/crankshafts" },
          { name: "Camshafts", href: "/performance-parts/engine-internals/camshafts" },
          { name: "Valvetrain Components", href: "/performance-parts/engine-internals/valvetrain" },
        ]
      },
    ],
    featured: [
      {
        name: "New Arrivals",
        href: "/performance-parts/new-arrivals",
        imageUrl: "https://images.unsplash.com/photo-1600661653561-629509216228",
      },
      {
        name: "Best Sellers",
        href: "/performance-parts/best-sellers",
        imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
      },
    ],
  },
  {
    name: "Aftermarket Parts",
    href: "/aftermarket-parts",
    subcategories: [
      {
        name: "Engine Components",
        href: "/aftermarket-parts/engine",
        subcategories: [
          { name: "Filters", href: "/aftermarket-parts/engine/filters" },
          { name: "Belts & Hoses", href: "/aftermarket-parts/engine/belts-hoses" },
          { name: "Spark Plugs", href: "/aftermarket-parts/engine/spark-plugs" },
          { name: "Sensors", href: "/aftermarket-parts/engine/sensors" },
          { name: "Gaskets & Seals", href: "/aftermarket-parts/engine/gaskets" },
        ]
      },
      {
        name: "Electrical",
        href: "/aftermarket-parts/electrical",
        subcategories: [
          { name: "Batteries", href: "/aftermarket-parts/electrical/batteries" },
          { name: "Alternators", href: "/aftermarket-parts/electrical/alternators" },
          { name: "Starters", href: "/aftermarket-parts/electrical/starters" },
          { name: "Lighting", href: "/aftermarket-parts/electrical/lighting" },
          { name: "Wiring", href: "/aftermarket-parts/electrical/wiring" },
        ]
      },
      {
        name: "Brake System",
        href: "/aftermarket-parts/brakes",
        subcategories: [
          { name: "Brake Pads", href: "/aftermarket-parts/brakes/pads" },
          { name: "Brake Rotors", href: "/aftermarket-parts/brakes/rotors" },
          { name: "Calipers", href: "/aftermarket-parts/brakes/calipers" },
          { name: "Brake Lines", href: "/aftermarket-parts/brakes/lines" },
          { name: "Master Cylinders", href: "/aftermarket-parts/brakes/master-cylinders" },
        ]
      },
      {
        name: "Suspension & Steering",
        href: "/aftermarket-parts/suspension",
        subcategories: [
          { name: "Shocks & Struts", href: "/aftermarket-parts/suspension/shocks" },
          { name: "Control Arms", href: "/aftermarket-parts/suspension/control-arms" },
          { name: "Tie Rods", href: "/aftermarket-parts/suspension/tie-rods" },
          { name: "Ball Joints", href: "/aftermarket-parts/suspension/ball-joints" },
          { name: "Bushings", href: "/aftermarket-parts/suspension/bushings" },
        ]
      },
      {
        name: "Cooling System",
        href: "/aftermarket-parts/cooling",
        subcategories: [
          { name: "Radiators", href: "/aftermarket-parts/cooling/radiators" },
          { name: "Water Pumps", href: "/aftermarket-parts/cooling/water-pumps" },
          { name: "Thermostats", href: "/aftermarket-parts/cooling/thermostats" },
          { name: "Fans & Components", href: "/aftermarket-parts/cooling/fans" },
          { name: "Coolant", href: "/aftermarket-parts/cooling/coolant" },
        ]
      },
      {
        name: "Exterior",
        href: "/aftermarket-parts/exterior",
        subcategories: [
          { name: "Body Panels", href: "/aftermarket-parts/exterior/body-panels" },
          { name: "Mirrors", href: "/aftermarket-parts/exterior/mirrors" },
          { name: "Grilles", href: "/aftermarket-parts/exterior/grilles" },
          { name: "Bumpers", href: "/aftermarket-parts/exterior/bumpers" },
          { name: "Lighting", href: "/aftermarket-parts/exterior/lighting" },
        ]
      },
    ],
    featured: [
      {
        name: "Seasonal Maintenance",
        href: "/aftermarket-parts/seasonal",
        imageUrl: "https://images.unsplash.com/photo-1563136060-eed9c802c8e9",
      },
      {
        name: "OEM Replacements",
        href: "/aftermarket-parts/oem",
        imageUrl: "https://images.unsplash.com/photo-1600661653350-f06f7f01c9c5",
      },
    ],
  },
  {
    name: "Service Booking",
    href: "/service-booking",
    subcategories: [
      { name: "Maintenance Services", href: "/service-booking/maintenance" },
      { name: "Performance Upgrades", href: "/service-booking/performance" },
      { name: "Diagnostics & Repair", href: "/service-booking/diagnostics" },
      { name: "Wheel Alignment & Balancing", href: "/service-booking/wheel-services" },
      { name: "Custom Tuning", href: "/service-booking/tuning" },
    ],
  },
  {
    name: "Brands",
    href: "/brands",
    subcategories: [
      { name: "AEM", href: "/brands/aem" },
      { name: "Bilstein", href: "/brands/bilstein" },
      { name: "Borla", href: "/brands/borla" },
      { name: "Brembo", href: "/brands/brembo" },
      { name: "Eibach", href: "/brands/eibach" },
      { name: "K&N", href: "/brands/kn" },
      { name: "KW", href: "/brands/kw" },
      { name: "Magnaflow", href: "/brands/magnaflow" },
      { name: "NGK", href: "/brands/ngk" },
      { name: "Sparco", href: "/brands/sparco" },
      { name: "View All Brands", href: "/brands/all" },
    ],
  },
  {
    name: "Vehicle Specific",
    href: "/vehicles",
    subcategories: [
      {
        name: "European",
        href: "/vehicles/european",
        subcategories: [
          { name: "Audi", href: "/vehicles/european/audi" },
          { name: "BMW", href: "/vehicles/european/bmw" },
          { name: "Mercedes-Benz", href: "/vehicles/european/mercedes" },
          { name: "Porsche", href: "/vehicles/european/porsche" },
          { name: "Volkswagen", href: "/vehicles/european/volkswagen" },
          { name: "Volvo", href: "/vehicles/european/volvo" },
        ]
      },
      {
        name: "Japanese",
        href: "/vehicles/japanese",
        subcategories: [
          { name: "Honda", href: "/vehicles/japanese/honda" },
          { name: "Mazda", href: "/vehicles/japanese/mazda" },
          { name: "Mitsubishi", href: "/vehicles/japanese/mitsubishi" },
          { name: "Nissan", href: "/vehicles/japanese/nissan" },
          { name: "Subaru", href: "/vehicles/japanese/subaru" },
          { name: "Toyota", href: "/vehicles/japanese/toyota" },
        ]
      },
      {
        name: "American",
        href: "/vehicles/american",
        subcategories: [
          { name: "Chevrolet", href: "/vehicles/american/chevrolet" },
          { name: "Dodge", href: "/vehicles/american/dodge" },
          { name: "Ford", href: "/vehicles/american/ford" },
          { name: "Jeep", href: "/vehicles/american/jeep" },
        ]
      },
    ],
  },
];
