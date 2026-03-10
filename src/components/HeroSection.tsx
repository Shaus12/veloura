import heroImage from "@/assets/hero-pilates-new.png";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <img
        src={heroImage}
        alt="LŪNA Pilates grip socks"
        className="w-full h-auto object-cover"
      />
    </section>
  );
};

export default HeroSection;
