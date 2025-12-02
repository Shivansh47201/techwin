// src/components/application/listing/ApplicationsPage.tsx
"use client";

import React from "react";
import type { ApplicationSummary } from "./ApplicationCard"; // ya ApplicationItem jaisa bhi type ho
import ApplicationsHero from "./ApplicationsHero";
import ApplicationsGrid from "./ApplicationsGrid";
import ApplicationsCTA from "./ApplicationsCTA";

type ApplicationsPageProps = {
  applications: ApplicationSummary[]; // ya tumhara ApplicationItem agar compatible ho
};

export const ApplicationsPage: React.FC<ApplicationsPageProps> = ({
  applications,
}) => {
  return (
    <main className="flex flex-col">
      <ApplicationsHero />
      <ApplicationsGrid applications={applications} />
      <ApplicationsCTA />
    </main>
  );
};

export default ApplicationsPage;
