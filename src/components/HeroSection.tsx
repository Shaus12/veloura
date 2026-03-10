import heroImage from "@/assets/veloura-hero.png";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <img
        src={heroImage}
        alt="VELŌURA Pilates grip socks"
        className="w-full h-auto object-cover"
      />
    </section>
  );
};

export default HeroSection;