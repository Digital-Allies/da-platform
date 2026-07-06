import { GalaxyProductCard } from "./components/GalaxyProductCard";
import imgChair from "../imports/product-rattan-chair-04-1.png";
import imgShelf from "../imports/product-wiccer-book-shelf-01.png";
import imgLamp from "../imports/product-lamp-04-1.png";
import imgPeacock from "../imports/product-peacock-chair-02-1.png";

export default function App() {
  return (
    <div className="min-h-screen bg-[#111111] bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=3293&auto=format&fit=crop')] bg-cover bg-center bg-fixed py-24 px-8 font-sans overflow-hidden">
      {/* Background overlay for better contrast */}
      <div className="fixed inset-0 bg-black/60 pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <p className="text-gray-400 uppercase tracking-[0.3em] text-sm font-semibold">The Signature Collection</p>
          <h1 className="text-6xl md:text-7xl font-['Abril_Fatface'] text-white font-[Lilita_One] font-bold text-[#eccc73]">Galaxy Card</h1>
          <p className="font-['Dancing_Script'] text-3xl md:text-4xl text-[#d4994f] mt-2">curated finds, in orbit</p>
        </div>

        <div className="flex flex-wrap justify-center gap-y-24 md:gap-y-32 gap-x-12 md:gap-x-[240px] px-4 md:px-20 py-10">
          <GalaxyProductCard
            id="peacock"
            title="Rattan Lounge Chair"
            script="vintage find"
            description="Newly restored upholstery in neutral linen. A statement piece that catches light beautifully. Fully functional and ready for your living room."
            price="145"
            imageSrc={imgChair}
            imageBgColor="#2D2D2D" // Match background
          />

          <GalaxyProductCard
            id="wicker-shelf"
            title="Wiccer Book Shelf"
            script="vintage find"
            description="Beautiful natural patina from decades of use. Perfect for adding vertical interest. Delicate joinery, impeccable craftsmanship."
            price="145"
            imageSrc={imgShelf}
            imageBgColor="#2D2D2D" // Match background
          />
          
          <GalaxyProductCard
            id="bamboo-lamp"
            title="Bamboo Lamp"
            script="glow keeper"
            description="Woven rattan pendant shade, rewired and ready to hang. Emits a warm, patterned glow."
            price="220"
            imageSrc={imgLamp}
            imageBgColor="#2D2D2D" // Match background
          />
          
          <GalaxyProductCard
            id="peacock-chair"
            title="Peacock"
            script="vintage find"
            description="1970s rattan peacock chair, restored cane back. A dramatic seating option for sunrooms."
            price="1450"
            imageSrc={imgPeacock}
            imageBgColor="#2D2D2D" // Match background
          />
        </div>
      </div>
    </div>
  );
}
