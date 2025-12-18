**Site Architecture & Routing — Professional Summary (Client-friendly)**

Purpose: This document is written for non-technical stakeholders and clients. It presents a clear, trustworthy, and professional overview of the site: what each page does, typical user journeys, the APIs involved, and where leads are captured. Use this for client presentations and internal alignment.

---

**1) High-level overview**
- Goal: Provide a concise, easy-to-understand site flow that builds client confidence and generates sales leads.
- Approach: Clear discovery → product detail → datasheet download → Request Quote (structured) → Admin follow-up.

---

**2) Routing table (Next.js app router style)**

- `/`
  - File: `src/app/page.tsx`
  - Purpose: Hero, 3–5 product highlights, primary CTA `Request Quote` (Header + floating button)
  - Key metrics: CTR to `/products`, engagement time

- `/products`
  - File: `src/app/products/page.tsx`
  - Purpose: Category cards, search & filters (wavelength, power, application, form-factor)

- `/products/[category]`
  - File: `src/app/products/[category]/page.tsx`
  - Purpose: Product listing within category, compare button, link to product detail

- `/products/[category]/[slug]`
  - File: `src/app/products/[category]/[slug]/page.tsx`
  - Purpose: Full product specs, gallery, downloads (datasheet, drawing), `Request Quote` CTA and inline mini-form

- `/applications`
  - File: `src/app/applications/page.tsx`
  - Purpose: Use-cases and case studies; trust-building content, CTA -> contact/quote

- `/blog` and `/blog/[slug]`
  - Purpose: Technical content for SEO, link to datasheets and contact

- `/contact`
  - File: `src/app/contact/page.tsx`
  - Purpose: Main contact form + embedded `Request Quote` (detailed). This is the canonical place for business inquiries.

- `/admin/*` (private)
  - File(s): `src/app/admin/...`
  - Purpose: Lead management, product & content CMS (protected behind auth)

API endpoints (server-side)
- `POST /api/quote` — Accepts quote JSON, saves to `backend/quotes.json` (demo) or DB (prod). Returns { success:true, id }
- `POST /api/contact` — General contact form
- `GET /api/admin/quotes` — (protected) list leads
- `POST /api/admin/quotes/:id/status` — (protected) update lead status

---

**3) Component & responsibilities map (reusable pieces)**

- `Header` — Global nav, primary CTA `Request Quote` (opens modal or navigates to `/contact`)
- `Footer` — Contact quick links, phone, email, social
- `ProductCard` — image, 3 key specs, link to product detail, quick-quote button
- `ProductDetail` — hero image, spec table, downloads, Request Quote banner
- `QuoteForm` — full structured form (component: `src/components/QuoteForm.tsx`)
- `ContactForm` — simple name/email/message (on `/contact`)
- `AdminTable` — list leads with filters and actions
- `DownloadButton` — track clicks for downloads (analytics)

---

**4) Data models (concise)**

- Product (example)
  - id, sku, name, category, thumbnail, gallery[], shortDescription, specs{wavelength,power,linewidth}, datasheetUrl

- QuoteRequest (example)
  - id, createdAt, fullName, company, email, phone, productModel, requiredPower, wavelength, application, timeline, preferredContact, sourceUTM, status (new|contacted|quoted|closed)

JSON example (POST /api/quote)
```
{
  "fullName":"Jane Doe",
  "company":"Acme Labs",
  "email":"jane@acme.com",
  "productModel":"X-1.0",
  "requiredPower":"20 W",
  "wavelength":"1064 nm",
  "application":"Material processing - marking",
  "timeline":"1-3 months"
}
```

Response
```
{ "success": true, "id": 1671234567890 }
```

---

**5) UX journeys (client-friendly narratives)**

- Buyer (fast path): Home -> Products -> Category -> Product -> Click `Request Quote` -> fills 3 fields + application -> Submit -> Confirmation screen -> Sales follows up.

- Researcher (info path): Product -> Datasheet download (collect email, optional) -> contact for technical support.

- OEM partner (deep path): Contact -> selects `OEM Partnership` -> uploads drawings -> Sales schedules call.

Design cues for authenticity (avoid AI-feel):
- Use human microcopy (names, realistic numbers), avoid generic filler like "lorem ipsum".
- Use actual spec examples (e.g., "Linewidth ≤ 0.1 nm at 1064 nm") when possible.
- Add customer logos & real case metrics on Applications page.

---

**6) API & integration details (production-ready suggestions)**

- Storage: demo uses `backend/quotes.json`. For production use a relational DB (Postgres) or a SaaS CRM (HubSpot, Pipedrive) via API.
- Email notifications: on new quote, send an email to `sales@...` (SendGrid / Nodemailer). Include link to admin view.
- Webhooks: optionally forward quote to Slack channel and to CRM.

Security & auth
- Admin endpoints require authentication. Options:
  - Lightweight: static API key + server middleware
  - Recommended: `next-auth` with provider (Google SSO) and role-based access

Error handling & validation
- Server: validate required fields, sanitize inputs, return clear error codes.
- Client: show inline validation messages and summary on top.

---

**7) SEO, Performance & Accessibility (brief action list)**

- SEO: Unique meta title & description per product, structured data (Product / Breadcrumb schema), OpenGraph image per product.
- Performance: lazy-load product images, use optimized `public/` images (WebP), cache datasheet downloads on CDN.
- Accessibility: label all form fields, keyboard focus, color-contrast > 4.5:1 for body text, ARIA roles for dynamic content.

---

**8) Testing & QA checklist**

- Unit tests: form validation, API request/response
- Integration: submit quote end-to-end (UI -> `/api/quote` -> `backend/quotes.json`)
- Manual: check mobile layout, header CTA, download links, map embed

---


**9) Improved Mermaid flow (more detail for slides / client)**

```mermaid
flowchart LR
  subgraph Public
    H[Home]
    P[Products]
    A[Applications]
    B[Blog]
    C[Contact]
  end

  subgraph Discovery
    H --> P
    P --> Cat[Category]
    Cat --> PD[Product Detail]
    PD --> Download[Datasheet]
    PD --> Q[Request Quote]
  end

  subgraph Conversion
    Q --> Confirm[Confirmation Screen]
    Confirm --> Save[(Save to backend/quotes.json or DB)]
    Save --> Notify[Send notification to Sales (email/Slack/CRM)]
  end

  subgraph Admin
    Save --> AdminUI[Admin Dashboard]
    AdminUI --> Sales[Sales Rep Follow-up]
    Sales --> Close[Status: quoted/closed]
  end

  C --> Q
  H --> A
  H --> B
```