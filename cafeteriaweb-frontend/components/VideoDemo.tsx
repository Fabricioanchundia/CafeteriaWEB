"use client";

export function VideoDemo() {
  return (
    <section className="relative w-full max-w-5xl mx-auto my-24">
      <div className="overflow-hidden rounded-3xl shadow-2xl border border-[#e7d9cf]">
        <video
          src="/videos/urban-roast-demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Overlay opcional */}
      <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/40 to-transparent rounded-3xl">
        <h2 className="text-white text-3xl font-bold">
          Vive la experiencia Urban Roast ☕
        </h2>
      </div>
    </section>
  );
}
