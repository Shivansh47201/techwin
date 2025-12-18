import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

export default function EditRedirect({ params }: Props) {
  // Redirect /admin/posts/:id/edit to /admin/posts/:id (existing edit page)
  const id = params.id;
  redirect(`/admin/posts/${id}`);
}
