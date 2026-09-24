import SmoothScroll from "./SmoothScroll";
import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";
import Reveals from "./Reveals";

// Every page: the same header, footer and reveal vocabulary.
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Loader />
      <Header />
      {children}
      <Footer />
      <Reveals />
    </>
  );
}
