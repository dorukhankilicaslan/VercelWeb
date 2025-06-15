import "./styles.css";
import ClientRoot from "./components/ClientRoot";

export async function generateMetadata() {
  return {
    title: "Dorukhan KILIÇASLAN | CV Test",
    icons: {
      icon: "/favicon.ico",
    },
    description: "Dorukhan Kılıçaslan'ın kişisel portföyü",
    keywords: [
      "Dorukhan Kılıçaslan",
      "Portföy",
      "Web Geliştirici",
      "Yazılım Mühendisi",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
    ],
  };
}
export default function OnePageCVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="scroll-smooth font-[poppins] flex min-h-screen">
      <ClientRoot>{children}</ClientRoot>
    </div>
  );
}
