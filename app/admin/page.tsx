import AdminClient from "./AdminClient";

export const metadata = {
  title: "Créneaux — Private Teaching",
  robots: { index: false, follow: false },
};

export default function AdminRoute() {
  return <AdminClient />;
}
