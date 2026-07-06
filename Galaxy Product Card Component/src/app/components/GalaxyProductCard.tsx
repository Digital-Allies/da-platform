import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { X, Orbit } from "lucide-react";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export interface GalaxyProductCardProps {
  imageSrc: string;
  imageBgColor?: string;
  title: string;
  script: string;
  description: string;
  price: string;
  id?: string;
}

export function GalaxyProductCard({
  imageSrc,
  imageBgColor = "#8c9b74", // Default to olive green
  title,
  script,
  description,
  price,
  id
}: GalaxyProductCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <div className="relative group cursor-pointer w-[310px] sm:w-[360px] h-[460px] sm:h-[520px] shrink-0 isolate perspective-[1200px]">
          {/* 3D Scene Wrapper - scales on hover */}
          <div 
            className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* The Ring System */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] flex items-center justify-center pointer-events-none" 
              style={{ transformStyle: "preserve-3d" }}
            >
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: "rotateZ(-35deg) rotateX(75deg)", transformStyle: "preserve-3d" }}
              >
                {/* Spinning Ring */}
                <motion.div
                  className="absolute w-full h-full rounded-[50%] border-[4px] border-[#f3ca63]/70 shadow-[0_0_30px_rgba(243,202,99,0.6),inset_0_0_20px_rgba(243,202,99,0.4)]"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateZ: [0, 360] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-[10px] rounded-[50%] border border-[#f3ca63]/30" />
                  
                  {/* Planet 2 (Cyan) */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" style={{ transformStyle: "preserve-3d" }}>
                    <motion.div
                      style={{ transformStyle: "preserve-3d" }}
                      animate={{ rotateZ: [360, 0] }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    >
                      <div 
                        className="w-7 h-7 rounded-full shadow-[0_0_15px_rgba(163,228,215,0.8),inset_0_0_8px_rgba(0,0,0,0.5)] border border-[#cffff5]/50 relative"
                        style={{ 
                          transform: "rotateX(-75deg) rotateZ(35deg)",
                          background: "radial-gradient(circle at 30% 30%, #fff 0%, #a3e4d7 20%, #2b8271 60%, #0a362e 100%)",
                          transformStyle: "preserve-3d"
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Little stars */}
                  <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-white shadow-[0_0_15px_white]"></div>
                  <div className="absolute bottom-[20%] right-[10%] w-2.5 h-2.5 rounded-full bg-[#f3ca63] shadow-[0_0_20px_#f3ca63]"></div>
                  <div className="absolute top-[40%] right-[5%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]"></div>
                </motion.div>
              </div>
            </div>

            {/* Card Body */}
            <div 
              className="relative w-full h-full rounded-[24px] bg-[#1a1a1a] overflow-hidden flex flex-col border-[2px] border-[#f3ca63]/40 shadow-[0_0_40px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(243,202,99,0.15)]"
              style={{ transform: "translateZ(0px)" }}
            >
              {/* Top image section with dynamic background color */}
            <div 
              className="h-[220px] sm:h-[260px] w-[94%] mx-auto mt-3 rounded-[20px] flex items-center justify-center overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border-[2px] border-[#f3ca63]/40"
              style={{ backgroundColor: imageBgColor }}
            >
              {/* Inner container to hold image, removing drop shadow */}
              <div className="relative w-[90%] h-[90%] flex items-center justify-center pointer-events-none z-10">
                <ImageWithFallback 
                  src={imageSrc} 
                  alt={title} 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Content section */}
            <div className="flex-1 px-5 sm:px-6 py-4 sm:py-5 flex flex-col justify-between text-white bg-[#1a1a1a] relative z-0">
              <div>
                <h3 className="font-['Abril_Fatface'] text-[34px] sm:text-[42px] tracking-wide text-[#f3ca63] leading-none mb-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {title}
                </h3>
                <p className="font-['Dancing_Script'] text-2xl sm:text-3xl text-[#d4994f] mb-2 sm:mb-3">
                  {script}
                </p>
                <p className="text-[12px] sm:text-[13px] text-gray-300 leading-relaxed font-sans opacity-90 line-clamp-2 sm:line-clamp-3">
                  {description}
                </p>
              </div>
              
              <div className="mt-3 sm:mt-4">
                <div className="inline-flex items-center justify-center gap-2 bg-[#f3ca63] text-black px-4 py-0.5 rounded-full font-['Abril_Fatface'] text-lg sm:text-xl shadow-[0_0_15px_rgba(243,202,99,0.3)]">
                  ${price}
                  <Orbit className="w-4 h-4 opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </Dialog.Trigger>

      {/* Product Details Pop-up */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] max-h-[90vh] overflow-y-auto bg-[#1a1a1a] border border-yellow-500/30 rounded-2xl p-0 shadow-[0_0_50px_rgba(250,204,21,0.1)] z-50 flex flex-col md:flex-row focus:outline-none animate-in zoom-in-95 duration-200">
          
          <Dialog.Close asChild>
            <button className="absolute top-3 right-3 md:top-4 md:right-4 text-white/70 hover:text-white transition-colors p-2 rounded-full bg-black/20 hover:bg-black/40 z-10 backdrop-blur-sm">
              <X className="w-6 h-6" />
            </button>
          </Dialog.Close>

          <div 
            className="w-full md:w-1/2 h-[250px] md:min-h-[400px] md:h-auto flex items-center justify-center p-6 md:p-8 relative shrink-0"
            style={{ backgroundColor: imageBgColor }}
          >
            <ImageWithFallback 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-contain filter drop-shadow-2xl"
            />
          </div>
          
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col relative text-white bg-gradient-to-b from-[#242424] to-[#111111]">
            <div className="mb-6 md:mb-8 mt-2 md:mt-4">
              <p className="font-['Dancing_Script'] text-2xl md:text-3xl text-[#d4994f] mb-1 md:mb-2">
                {script}
              </p>
              <Dialog.Title className="font-['Abril_Fatface'] text-3xl md:text-5xl text-[#f3ca63] leading-none mb-4 md:mb-6">
                {title}
              </Dialog.Title>
              
              <Dialog.Description className="text-gray-300 text-sm md:text-base leading-relaxed font-sans mb-6 md:mb-8">
                {description}
                <br /><br />
                Dimensions: H 42" x W 30" x D 28"<br />
                Origin: United States<br />
                Era: 1970s
              </Dialog.Description>
            </div>
            
            <div className="mt-auto">
              <div className="flex items-end gap-3 mb-4 md:mb-6">
                <span className="font-['Abril_Fatface'] text-3xl md:text-4xl text-[#f3ca63]">${price}</span>
                <span className="text-gray-400 text-xs md:text-sm mb-1">Tax included.</span>
              </div>
              
              <button className="w-full bg-[#f3ca63] hover:bg-[#ffe58a] text-black font-semibold py-3 md:py-4 px-6 rounded-full transition-colors flex items-center justify-center gap-2 group text-sm md:text-base">
                <Orbit className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Add to Cart
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
