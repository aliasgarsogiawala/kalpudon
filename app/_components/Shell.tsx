import SmoothScroll from "./SmoothScroll";
import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";
import Sheets from "./Sheets";
import Reveals from "./Reveals";

// Every page: the same header, footer, sheets and reveal vocabulary.
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#content" className="sr-only z-[60] rounded-full bg-gold px-5 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <SmoothScroll />
      <Loader />
      <Header />
      <div id="content">{children}</div>
      <Footer />
      <Sheets />
      <Reveals />
    </>
  );
}
