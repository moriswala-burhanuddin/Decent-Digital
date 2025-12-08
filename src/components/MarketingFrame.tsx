import { Megaphone, Users, BarChart3, Globe, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export function MarketingFrame() {
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
          <BarChart3 className="w-3 h-3" />
          <span>Analytics_Dashboard</span>
        </div>
        <div className="w-12" />
      </div>

      <div className="flex-1 p-4 relative bg-background/50">
        {/* Header Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-3 rounded-xl bg-card border border-border/50 shadow-sm"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Users className="w-3 h-3" />
              <span>Reach</span>
            </div>
            <div className="text-xl font-bold text-foreground">24.5k</div>
            <div className="flex items-center text-[10px] text-green-500 font-medium">
              <ArrowUp className="w-3 h-3 mr-0.5" />
              +12%
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-3 rounded-xl bg-card border border-border/50 shadow-sm"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Globe className="w-3 h-3" />
              <span>Visits</span>
            </div>
            <div className="text-xl font-bold text-foreground">8.2k</div>
            <div className="flex items-center text-[10px] text-green-500 font-medium">
              <ArrowUp className="w-3 h-3 mr-0.5" />
              +24%
            </div>
          </motion.div>
        </div>

        {/* Animated Chart Area */}
        <div className="relative h-24 rounded-xl bg-gradient-to-b from-accent-pink/5 to-transparent border border-accent-pink/10 p-4 overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-0 pt-8 gap-2">
            {[40, 65, 45, 80, 55, 90, 75].map((height, idx) => (
              <motion.div
                key={idx}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                className="w-full bg-accent-pink/20 rounded-t-sm relative group"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + idx * 0.1 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-accent-pink opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {height}
                </motion.div>
                <div className="absolute top-0 left-0 w-full h-1 bg-accent-pink/50" />
              </motion.div>
            ))}
          </div>

          {/* Trend Line Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <motion.path
              d="M0 80 C 50 80, 50 20, 100 20 C 150 20, 150 60, 200 60 C 250 60, 250 10, 300 10"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--accent-pink)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Campaign Status */}
        <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/30">
          <div className="p-2 rounded-lg bg-primary/10">
            <Megaphone className="w-4 h-4 text-primary animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">Q4 Campaign</span>
              <span className="text-primary">Active</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.5, delay: 1 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
