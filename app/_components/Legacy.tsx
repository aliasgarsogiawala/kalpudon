import Image from "next/image";
import Crop from "./Crop";

// Brief §5.6: the human close, in his register.
export default function Legacy() {
  return (
    <section className="relative overflow-hidden bg-obsidian">
      <div className="mx-auto grid w-full max-w-[1680px] gap-10 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p data-fade className="label flex items-center gap-4 text-champagne">
            <span className="h-px w-10 bg-champagne" /> A note on why
          </p>
          <blockquote
            data-scrub-words
            className="display mt-10 max-w-[16ch] text-[clamp(33px,4.2vw,79px)] leading-[0.98] text-bone"
          >
            Build things that make more people better off. <em className="text-champagne">Connect with an open heart.</em>
          </blockquote>
          <p data-fade className="mt-12 max-w-[520px] text-[17px] leading-[1.65] text-bone/75">
            Responsibility arrived early — he lost his father at thirteen, and started his first company from a
            hundred square feet. Every platform since has been judged by one test: did the suppliers, investors,
            residents and artists leave better off than they arrived?
          </p>
        </div>

        <figure className="relative lg:col-span-4 lg:col-start-9">
          <div data-reveal className="relative aspect-[4/5] w-full max-w-[380px]">
            <div data-reveal-clip className="absolute inset-0 overflow-hidden">
              <div data-parallax="0.6" className="absolute inset-x-0 -inset-y-[10%]">
                <Image
                  src="/img/portrait.jpg"
                  alt="Kalpesh Kinariwala in profile (placeholder)"
                  fill
                  sizes="(min-width:1024px) 30vw, 90vw"
                  className="object-cover object-[35%_20%] grayscale"
                />
              </div>
            </div>
            <Crop />
          </div>
          <figcaption className="mt-8">
            <p className="display-sm text-[34px] text-bone">Kalpesh Kinariwala</p>
            <p className="mt-1 text-[15px] text-ash">Founder · Platform builder · Dubai</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
