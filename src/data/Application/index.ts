// src/data/Application/index.ts
// Aggregate and normalize application data from individual module files.
//
// This file is intentionally tolerant: it accepts either a default export,
// a named export (e.g. `biomedicalApplication`) or an exported object that
// contains a `slug` property.

export type AppImage = { src: string; alt?: string; width?: number; height?: number };
export type CTA = { label: string; href: string; variant?: "primary" | "ghost" };
export type FeatureSection = {
  type: "feature" | "media";
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  body?: string | string[];
  bullets?: string[];
  image?: AppImage | null;
  variant?: "media-left" | "media-right" | "full-bleed";
  reverseOnMobile?: boolean;
};
export type SubsectionsSection = { type: "subsections" | "bullets"; title?: string; bullets?: string[]; background?: "blue" | "white" };
export type GallerySection = { type: "gallery"; items?: { id?: string; src: string; alt?: string }[] };
export type TimelineSection = { type: "timeline"; steps?: any[] };
export type ApplicationSection = FeatureSection | SubsectionsSection | GallerySection | TimelineSection | Record<string, any>;

export type Application = {
  slug: string;
  title: string;
  name?: string;
  aliases?: string[];
  tagline?: string;
  kicker?: string;
  heroTitle?: string;
  heroTagline?: string;
  heroImage?: AppImage | null;
  ctas?: CTA[];
  overviewStats?: any[];
  overviewImage?: AppImage | null;
  sections?: ApplicationSection[];
  useCases?: any[];
  specGroups?: any[];
  gallery?: { id?: string; src: string; alt?: string }[];
  comparison?: { columns: any[]; rows: any[] };
  testimonials?: any[];
  partnerLogos?: any[];
  datasheetHref?: string;
  ctaHeading?: string;
  ctaSubheading?: string;
  ctaPrimary?: string;
  ctaPrimaryHref?: string;
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
  [k: string]: any;
};

// --- Import modules (adjust names to match your files) ---
// These imports assume files are at src/data/Application/<name>.ts
import * as biomedicalModule from "./biomedical";
import * as lidarModule from "./lidar";
import * as quantumModule from "./quantum";
import * as satelliteModule from "./satellite";
import * as sensingModule from "./sensing";
import * as spectroscopyModule from "./spectroscopy";
import * as materialProcessingModule from "./material-processing";
import * as gravitationalWaveModule from "./gravitational-wave";
import * as communicationModule from "./communication";
import * as atomicModule from "./atomic";

// Type-guard: narrow unknown -> Application
function isApplication(v: unknown): v is Application {
  return !!v && typeof v === "object" && typeof (v as any).slug === "string";
}

// helper: pick default export, or named export by guessed name, or module itself
const pickApp = (mod: any, guessedNames: string[] = []): Application | null => {
  if (!mod) return null;
  // prefer default export if it's object-like and looks like Application
  if (isApplication(mod.default)) return mod.default;
  // check guessed named exports
  for (const n of guessedNames) {
    if (isApplication(mod[n])) return mod[n];
  }
  // if module itself is an Application-like object
  if (isApplication(mod)) return mod;
  // attempt to pick the first exported value that looks like Application
  const values = Object.values(mod || {});
  for (const v of values) {
    if (isApplication(v)) return v;
  }
  return null;
};

// Map modules to real application objects (pass guessed named-export names too)
const appsCandidates: Application[] = [
  pickApp(biomedicalModule, ["biomedicalApplication", "application", "default"]),
  pickApp(lidarModule, ["lidarApplication", "application"]),
  pickApp(quantumModule, ["quantumApplication", "application"]),
  pickApp(satelliteModule, ["satelliteApplication", "application"]),
  pickApp(sensingModule, ["sensingApplication", "application"]),
  pickApp(spectroscopyModule, ["spectroscopyApplication", "application"]),
  pickApp(materialProcessingModule, ["materialProcessingApplication", "application", "materialProcessing"]),
  pickApp(gravitationalWaveModule, ["gravitationalWaveApplication", "gravitational-wave", "application"]),
  pickApp(communicationModule, ["communicationApplication", "application"]),
  pickApp(atomicModule, ["atomicApplication", "application"]),
]
  .filter((x): x is Application => x !== null && x !== undefined);

// Final applications array (preserves the order above)
export const applications: Application[] = appsCandidates;

// default export
export default applications;