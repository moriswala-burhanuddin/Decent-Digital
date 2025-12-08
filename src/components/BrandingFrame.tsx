import { Palette, Target, Eye, Sparkles, RefreshCcw, MousePointer2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function BrandingFrame() {
  const [activePalette, setActivePalette] = useState(0);

  const palettes = [
    ["bg-[#FF5733]", "bg-[#C70039]", "bg-[#900C3F]", "bg-[#581845]"],
    ["bg-[#2E86C1]", "bg-[#5DADE2]", "bg-[#85C1E9]", "bg-[#AED6F1]"],
    ["bg-[#28B463]", "bg-[#58D68D]", "bg-[#82E0AA]", "bg-[#ABEBC6]"],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePalette((prev) => (prev + 1) % palettes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full min-h-[240px] rounded-2xl overflow-hidden glass-card border border-border/40 shadow-2xl flex flex-col">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card/90 border-b border-border/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Palette className="w-3 h-3" />
          <span>Brand_Identity_v2.fig</span>
        </div>
        <div className="w-12" /> {/* Spacer for balance */}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 relative bg-gradient-to-br from-background/50 to-muted/20">
        {/* Floating Cursor Animation */}
        <motion.div
          animate={{ x: [0, 100, 50, 0], y: [0, 50, 100, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 pointer-events-none z-20"
        >
          <MousePointer2 className="w-5 h-5 text-primary fill-primary/20" />
          <div className="px-2 py-1 bg-primary text-primary-foreground text-[10px] rounded ml-4 mt-1 font-bold">
            Designer
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">Brand Guidelines</h3>
              <p className="text-xs text-muted-foreground">Visual Identity System</p>
            </div>
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Animated Palette Generator */}
          <div className="p-4 rounded-xl bg-card/50 border border-border/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-accent-purple" />
                Color Palette
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCcw className="w-3 h-3 text-muted-foreground" />
              </motion.div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {palettes[activePalette].map((color, idx) => (
                <motion.div
                  key={`${activePalette}-${idx}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`aspect-square rounded-lg ${color} shadow-sm cursor-pointer hover:scale-105 transition-transform`}
                />
              ))}
            </div>
          </div>

          {/* Brand Assets List */}
          <div className="space-y-2">
            {[
              { icon: Eye, label: "Logo Usage", width: "80%" },
              { icon: Palette, label: "Typography", width: "60%" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="p-1.5 rounded-md bg-secondary/10">
                  <item.icon className="w-3 h-3 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: item.width }}
                      transition={{ duration: 1.5, delay: 0.5 + idx * 0.2 }}
                      className="h-full bg-secondary rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
