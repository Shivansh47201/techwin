// /src/app/applications/[slug]/page.tsx
import React from "react";
import type { Metadata } from "next";
import rawData, { applications as namedApplications, type Application } from "@/data/Application/index";
import ApplicationDetailHero from "@/components/application/detail/ApplicationDetailHero";
import ApplicationOverviewStrip from "@/components/application/detail/ApplicationOverviewStrip";
import ApplicationFeatureBlock from "@/components/application/detail/ApplicationFeatureBlock";
import ApplicationSubSection from "@/components/application/detail/ApplicationSubSection";
import ApplicationUseCasesGrid from "@/components/application/detail/ApplicationUseCasesGrid";
import ApplicationSpecsAccordion from "@/components/application/detail/ApplicationSpecsAccordion";
import ApplicationProcessTimeline from "@/components/application/detail/ApplicationProcessTimeline";
import ApplicationGalleryCarousel from "@/components/application/detail/ApplicationGalleryCarousel";
import ApplicationComparisonMatrix from "@/components/application/detail/ApplicationComparisonMatrix";
import ApplicationTestimonialsStrip from "@/components/application/detail/ApplicationTestimonialsStrip";
import ApplicationCTA from "@/components/application/detail/ApplicationCTA";

type PageProps = {
  params: { slug?: string } | Promise<{ slug?: string }>;
};

export const dynamic = "auto";
export const revalidate = 60;

// normalize imported data into an array
const applicationList: Application[] = Array.isArray(rawData)
  ? (rawData as Application[])
  : Array.isArray(namedApplications)
  ? (namedApplications as Application[])
  : rawData && typeof rawData === "object"
  ? (Object.values(rawData) as Application[])
  : [];

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-console
  console.log("[apps] normalized applicationList slugs:", applicationList.map((a) => a.slug));
}

// generateStaticParams for SSG
export async function generateStaticParams() {
  return applicationList.filter((a) => a && typeof a.slug === "string").map((a) => ({ slug: a.slug }));
}

// Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = (await params) ?? {};
  const slug = String(resolvedParams.slug ?? "");
  const app = applicationList.find((a) => a.slug === slug);
  if (!app) return { title: "Application" };
  const title = app.title ?? app.name ?? app.heroTitle ?? "Application";
  return {
    title: `${title} — Our Applications`,
    description: app.tagline ?? app.heroTagline ?? app.metaDescription ?? "",
    openGraph: {
      title: `${title} — Our Applications`,
      description: app.tagline ?? app.heroTagline ?? app.metaDescription ?? "",
      images: app.heroImage ? [{ url: app.heroImage.src, alt: app.heroImage.alt || title }] : undefined,
    },
  };
}

/**
 * Normalized shape that your UI components expect.
 */
type NormalizedApp = {
  original: any;
  slug: string;
  title: string;
  tagline?: string;
  kicker?: string;
  heroImage?: any;
  ctas?: any[];
  overviewStats?: any[];
  overviewImage?: any;
  sections?: any[];
  useCases?: any[];
  specGroups?: any[];
  gallery?: any[];
  comparison?: any;
  testimonials?: any[];
  partnerLogos?: any[];
  datasheetHref?: string;
  ctaHeading?: string;
  ctaSubheading?: string;
  ctaPrimary?: string;
  ctaPrimaryHref?: string;
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
};

/** coerce image values */
const coerceImage = (img: any) => (img == null ? undefined : img);

/** normalization that returns NormalizedApp | null */
function normalizeApp(raw: any): NormalizedApp | null {
  if (!raw || typeof raw !== "object") return null;

  const title = raw.title ?? raw.name ?? raw.heroTitle ?? raw.metaTitle ?? "";
  const tagline = raw.tagline ?? raw.heroTagline ?? raw.heroIntro ?? raw.metaDescription ?? "";
  const kicker = raw.kicker ?? raw.name ?? (title ? String(title).split(" ")[0] : "");
  const heroImage = raw.heroImage ?? raw.overviewImage ?? (Array.isArray(raw.gallery) ? raw.gallery[0] : undefined) ?? undefined;
  const ctas = raw.ctas ?? (raw.ctaPrimary ? [{ label: raw.ctaPrimary, href: raw.ctaPrimaryHref ?? "#" }] : []);
  const overviewStats = raw.overviewStats ?? raw.specGroups ?? [];

  const sectionsNormalized: any[] = [];
  if (Array.isArray(raw.sections)) {
    for (const sec of raw.sections) {
      if (!sec) continue;

      // If already in feature/media shape
      if (sec.type && (sec.title || sec.heading)) {
        sectionsNormalized.push({
          type: sec.type,
          eyebrow: sec.eyebrow,
          title: sec.title ?? sec.heading,
          subtitle: sec.subtitle,
          body: Array.isArray(sec.body) ? sec.body.join("\n\n") : sec.body ?? sec.description ?? "",
          bullets: sec.bullets ?? undefined,
          image: sec.image ?? undefined,
          variant: sec.variant ?? undefined,
          reverseOnMobile: sec.reverseOnMobile ?? false,
        });
        continue;
      }

      // If the module uses heading / subSections style
      if (sec.heading) {
        sectionsNormalized.push({
          type: "feature",
          eyebrow: sec.eyebrow ?? undefined,
          title: sec.heading,
          subtitle: undefined,
          body: Array.isArray(sec.body) ? sec.body.join("\n\n") : sec.body ?? undefined,
          bullets: sec.bullets ?? undefined,
          image: sec.image ?? undefined,
        });

        if (Array.isArray(sec.subSections) && sec.subSections.length) {
          sectionsNormalized.push({
            type: "subsections",
            title: `${sec.heading} — details`,
            bullets: sec.subSections.map((ss: any) => ss.heading ?? (Array.isArray(ss.body) ? ss.body.join(" ") : ss.body ?? "")),
            background: "white",
          });
        }
        continue;
      }

      // fallback
      sectionsNormalized.push({
        type: sec.type ?? "feature",
        title: sec.title ?? sec.heading ?? "Feature",
        body: Array.isArray(sec.body) ? sec.body.join("\n\n") : sec.body ?? sec.description ?? "",
        bullets: sec.bullets ?? undefined,
        image: sec.image ?? undefined,
      });
    }
  }

  const gallery = raw.gallery ?? (Array.isArray(raw.sections) ? raw.sections.filter((s: any) => s.type === "gallery").flatMap((g: any) => g.items ?? []) : undefined);

  return {
    original: raw,
    slug: raw.slug,
    title,
    tagline,
    kicker,
    heroImage,
    ctas,
    overviewStats,
    overviewImage: raw.overviewImage ?? undefined,
    sections: sectionsNormalized,
    useCases: raw.useCases ?? raw.use_cases ?? undefined,
    specGroups: raw.specGroups ?? raw.spec_groups ?? undefined,
    gallery,
    comparison: raw.comparison ?? undefined,
    testimonials: raw.testimonials ?? undefined,
    partnerLogos: raw.partnerLogos ?? raw.partner_logos ?? undefined,
    datasheetHref: raw.datasheetHref ?? raw.datasheet_href ?? undefined,
    ctaHeading: raw.ctaHeading ?? raw.cta_heading ?? undefined,
    ctaSubheading: raw.ctaSubheading ?? raw.cta_subheading ?? undefined,
    ctaPrimary: raw.ctaPrimary ?? raw.cta_primary ?? undefined,
    ctaPrimaryHref: raw.ctaPrimaryHref ?? raw.cta_primary_href ?? undefined,
    ctaSecondary: raw.ctaSecondary ?? raw.cta_secondary ?? undefined,
    ctaSecondaryHref: raw.ctaSecondaryHref ?? raw.cta_secondary_href ?? undefined,
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = (await params) ?? {};
  const slug = String(resolvedParams.slug ?? "");

  // find raw app (flexible)
  const findBySlug = (s: string) => {
    const norm = (x: string) => String(x ?? "").toLowerCase().replace(/^\/+|\/+$/g, "");
    const slug = norm(s);

    // 1. Exact slug match
    const exactMatch = applicationList.find((a) => a && norm(a.slug) === slug);
    if (exactMatch) return exactMatch;

    // 2. Alias match
    const aliasMatch = applicationList.find((a) => a && a.aliases && a.aliases.map(norm).includes(slug));
    if (aliasMatch) return aliasMatch;

    // 3. Fallback to looser search (name/title contains)
    return applicationList.find((a) => {
      if (!a) return false;
      if (a.title && norm(a.title).includes(slug)) return true;
      if (a.name && norm(a.name).includes(slug)) return true;
      return false;
    });
  };

  const rawApp = findBySlug(slug);
  if (!rawApp) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold mb-4">Application not found</h1>
          <p className="text-lg mb-6">The application for <strong>{slug || "(no slug provided)"}</strong> was not found. The available slugs are shown below.</p>

          <section className="mb-6 p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-2">Available slugs ({applicationList.length})</h3>
            <ul className="list-disc ml-6 text-left">
              {applicationList.map((a) => <li key={a.slug}><strong>{a.slug}</strong> — {a.title ?? a.name ?? "—no title—"}</li>)}
            </ul>
          </section>

          <div className="flex justify-center gap-3">
            <a href="/applications" className="inline-block px-5 py-3 rounded-2xl bg-[--primary] text-white font-semibold">Go to Applications</a>
            <a href="/admin" className="inline-block px-5 py-3 rounded-2xl border border-gray-200">Check data files</a>
          </div>
        </div>
      </main>
    );
  }

  // normalize and ensure not null (TS understands the check)
  const normalized = normalizeApp(rawApp);
  if (!normalized) {
    // very unlikely — but handle again
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold mb-4">Application data invalid</h1>
          <p className="text-lg mb-6">The application data structure is not recognized for <strong>{slug}</strong>.</p>
          <div className="flex justify-center gap-3">
            <a href="/applications" className="inline-block px-5 py-3 rounded-2xl bg-[--primary] text-white font-semibold">Go to Applications</a>
          </div>
        </div>
      </main>
    );
  }

  // Now normalized is guaranteed to be non-null and typed
  const app: NormalizedApp = normalized;

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("[apps] rendering app:", { slug: app.slug, title: app.title, sections: app.sections?.length });
  }

  // renderers
  const renderSection = (section: any, idx: number) => {
    const background = idx % 2 === 0 ? "blue" : "white";
    if (section.type === "feature" || section.type === "media") {
      return (
        <ApplicationFeatureBlock
          key={idx}
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
          body={section.body}
          bullets={section.bullets}
          image={coerceImage(section.image)}
          variant={section.variant ?? "media-left"}
          background={background as "blue" | "white"}
          reverseOnMobile={section.reverseOnMobile}
        />
      );
    }
    if (section.type === "subsections" || section.type === "bullets") {
      return (
        <ApplicationSubSection key={idx} title={section.title} bullets={section.bullets} background={background as "blue" | "white"} />
      );
    }
    if (section.type === "gallery") {
      return <ApplicationGalleryCarousel key={idx} items={section.items || []} background={background as "blue" | "white"} />;
    }
    if (section.type === "timeline") {
      return <ApplicationProcessTimeline key={idx} steps={section.steps || []} background={background as "blue" | "white"} />;
    }
    return <ApplicationFeatureBlock key={idx} title={section.title} body={section.body} image={coerceImage(section.image)} background={background as "blue" | "white"} />;
  };

  return (
    <main>
      <ApplicationDetailHero title={app.title} tagline={app.tagline} kicker={app.kicker} image={coerceImage(app.heroImage)} ctas={app.ctas} />

      <ApplicationOverviewStrip stats={app.overviewStats || []} ctaLabel={app.ctaPrimary ?? "Talk to expert"} ctaHref={app.ctaPrimaryHref ?? "#"} image={coerceImage(app.overviewImage)} background="blue" />

      <div>
        {Array.isArray(app.sections) && app.sections.map((section, idx) => renderSection(section, idx))}
      </div>

      {app.useCases && <ApplicationUseCasesGrid useCases={app.useCases} background="white" />}
      {app.specGroups && <ApplicationSpecsAccordion groups={app.specGroups} downloadHref={app.datasheetHref} background="blue" />}
      {app.gallery && <ApplicationGalleryCarousel items={app.gallery} background="white" />}
      {app.comparison && <ApplicationComparisonMatrix columns={app.comparison.columns} rows={app.comparison.rows} background="white" />}
      {app.testimonials && <ApplicationTestimonialsStrip testimonials={app.testimonials} logos={app.partnerLogos ?? []} background="blue" />}

      <ApplicationCTA
        heading={app.ctaHeading ?? "Talk to our experts"}
        subheading={app.ctaSubheading ?? "Discuss integration, samples & prototyping."}
        primaryLabel={app.ctaPrimary ?? "Contact sales"}
        primaryHref={app.ctaPrimaryHref ?? "#contact"}
        secondaryLabel={app.ctaSecondary ?? "Request sample"}
        secondaryHref={app.ctaSecondaryHref ?? "#"}
        background="blue"
      />
    </main>
  );
}
