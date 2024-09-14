export default function Marketing() {
  return (
    <main className="w-full h-auto min-h-lvh relative">
      <header className="h-16 w-full sticky top-0 z-40 bg-black">
        <div className="flex justify-between items-center wrapper-container bg-white h-full"></div>
      </header>
      <div className="h-full select-none w-full absolute inset-0 [mask-image:linear-gradient(to_top,transparent_10%,white_90%)]">
        {/* <video
          loop
          autoPlay
          muted
          className="max-h-[calc(100dvh-90px)] h-[100vw] min-h-[70dvh] w-full object-cover brightness-50"
        >
          <source src="/assets/video/videoplayback.mp4" type="video/mp4" />
        </video> */}
      </div>
    </main>
  );
}
