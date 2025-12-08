import { Layers, PenTool, Shapes, MousePointer, Move } from "lucide-react";
import { motion } from "framer-motion";

export function LogoFrame() {
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
          <PenTool className="w-3 h-3" />
          <span>Logo_Concept_Final.ai</span>
        </div>
        <div className="w-12" />
      </div>

      <div className="flex-1 flex relative bg-muted/5">
        {/* Toolbar */}
        <div className="w-10 border-r border-border/50 bg-card/50 flex flex-col items-center py-4 gap-3">
          {[MousePointer, Move, PenTool, Shapes, Layers].map((Icon, idx) => (
            <div key={idx} className={`p-2 rounded-lg ${idx === 2 ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>
              <Icon className="w-4 h-4" />
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 p-4 relative overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />

          {/* Main Logo Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                  <motion.path
                    d="M50 10 L90 90 L10 90 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-secondary"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                  />
                </svg>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border border-dashed border-primary/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 border border-dashed border-accent-purple/30 rounded-full"
              />
            </div>
          </div>

          {/* Properties Panel (Floating) */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 right-4 w-32 bg-card/90 backdrop-blur-md rounded-xl border border-border/50 p-3 shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Stroke</span>
                <span className="font-mono">4px</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-secondary" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Fill</span>
                <div className="w-4 h-4 rounded bg-transparent border border-border" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
