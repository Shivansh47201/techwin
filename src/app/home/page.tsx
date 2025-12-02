import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function HomeRedirect() {
  // Permanently redirect /home to /
  redirect("/");
}
