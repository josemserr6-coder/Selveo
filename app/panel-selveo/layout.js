export const metadata = {
  robots: { index: false, follow: false },
  title: "Panel Selveo",
};

export default function PanelLayout({ children }) {
  return <div className="min-h-screen bg-cream">{children}</div>;
}
