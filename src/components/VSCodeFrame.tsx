import { useState, useEffect } from "react";
import {
  Folder, File, ChevronRight, ChevronDown, X, Minus, Square,
  Search, GitBranch, Bug, Blocks, Settings, User,
  Play, SplitSquareVertical, MoreHorizontal
} from "lucide-react";

const files = [
  {
    name: "src", type: "folder", expanded: true, children: [
      {
        name: "components", type: "folder", expanded: true, children: [
          { name: "Hero.tsx", type: "file", active: true },
          { name: "Button.tsx", type: "file" },
          { name: "Card.tsx", type: "file" },
        ]
      },
      {
        name: "styles", type: "folder", children: [
          { name: "globals.css", type: "file" },
        ]
      },
      { name: "App.tsx", type: "file" },
    ]
  },
  { name: "package.json", type: "file" },
];

const codeLines = [
  { text: "import { motion } from 'framer-motion';", type: "import" },
  { text: "import { Button } from './Button';", type: "import" },
  { text: "", type: "empty" },
  { text: "export const Hero = () => {", type: "function" },
  { text: "  return (", type: "code" },
  { text: "    <section className=\"min-h-screen\">", type: "jsx" },
  { text: "      <motion.div", type: "jsx" },
  { text: "        initial={{ opacity: 0, y: 20 }}", type: "prop" },
  { text: "        animate={{ opacity: 1, y: 0 }}", type: "prop" },
  { text: "        className=\"container mx-auto\"", type: "prop" },
  { text: "      >", type: "jsx" },
  { text: "        <h1 className=\"text-6xl font-bold\">", type: "jsx" },
  { text: "          We Build Digital Products", type: "text" },
  { text: "        </h1>", type: "jsx" },
  { text: "        <p className=\"text-xl text-muted\">", type: "jsx" },
  { text: "          Transform your ideas into reality", type: "text" },
  { text: "        </p>", type: "jsx" },
  { text: "        <Button variant=\"primary\">", type: "jsx" },
  { text: "          Get Started", type: "text" },
  { text: "        </Button>", type: "jsx" },
  { text: "      </motion.div>", type: "jsx" },
  { text: "    </section>", type: "jsx" },
  { text: "  );", type: "code" },
  { text: "};", type: "function" },
];

function FileTree({ items, level = 0 }: { items: typeof files; level?: number }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ src: true, components: true });

  return (
    <div className="space-y-0.5">
      {items.map((item) => (
        <div key={item.name}>
          <div
            className={`flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-all text-sm ${item.type === "file" && (item as any).active
              ? "bg-primary/10 text-primary font-semibold"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
            onClick={() => item.type === "folder" && setExpanded(e => ({ ...e, [item.name]: !e[item.name] }))}
          >
            {item.type === "folder" ? (
              <>
                {expanded[item.name] ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )}
                <Folder className="w-4 h-4 text-primary flex-shrink-0" />
              </>
            ) : (
              <>
                <span className="w-4" />
                <File className="w-4 h-4 text-secondary flex-shrink-0" />
              </>
            )}
            <span className="truncate">{item.name}</span>
          </div>
          {item.type === "folder" && expanded[item.name] && (item as any).children && (
            <FileTree items={(item as any).children} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  );
}

export function VSCodeFrame() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setVisibleLines(v => {
        if (v >= codeLines.length) {
          setTimeout(() => setVisibleLines(0), 2000);
          return v;
        }
        return v + 1;
      });
    }, 400);

    return () => clearInterval(lineInterval);
  }, []);

  const getLineColor = (type: string) => {
    switch (type) {
      case "import": return "text-accent-purple";
      case "function": return "text-primary";
      case "jsx": return "text-secondary";
      case "prop": return "text-accent-pink";
      case "text": return "text-foreground";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="absolute -inset-6 bg-gradient-to-r from-accent-purple/20 via-primary/15 to-secondary/20 rounded-3xl blur-3xl opacity-60" />

      <div className="relative glass-card overflow-hidden shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)] border border-border/30 rounded-2xl">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 bg-card/90 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all cursor-pointer" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground hidden sm:block">Hero.tsx — PixelCraft</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-md hover:bg-muted transition-all">
              <Minus className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-muted transition-all">
              <Square className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-muted transition-all">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="flex h-[360px] sm:h-[420px] lg:h-[480px]">
          <div className="hidden sm:flex w-14 lg:w-16 bg-card/80 border-r border-border/50 flex-col items-center py-4 gap-2">
            <button className="p-3 rounded-xl text-primary bg-primary/10 shadow-lg">
              <File className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:scale-105">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:scale-105">
              <GitBranch className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:scale-105">
              <Bug className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:scale-105">
              <Blocks className="w-5 h-5" />
            </button>
            <div className="flex-1" />
            <button className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:scale-105">
              <User className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:scale-105">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden md:block w-56 lg:w-64 bg-card/60 border-r border-border/50 overflow-hidden">
            <div className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
              Explorer
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="px-2">
              <FileTree items={files} />
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-muted/10">
            <div className="flex items-center border-b border-border/50 bg-card/40">
              <div className="flex items-center gap-2 px-4 py-3 bg-background/50 border-r border-border/50">
                <File className="w-4 h-4 text-secondary" />
                <span className="text-sm font-semibold text-foreground">Hero.tsx</span>
                <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
              </div>
              <div className="flex items-center gap-2 px-4 py-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <File className="w-4 h-4" />
                <span className="text-sm">Button.tsx</span>
              </div>
              <div className="flex-1" />
              <div className="flex items-center gap-1 px-2">
                <button className="p-2 rounded-md hover:bg-muted transition-all">
                  <SplitSquareVertical className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-md hover:bg-muted transition-all">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden p-4 sm:p-6 font-mono text-sm sm:text-base leading-relaxed">
              <div className="space-y-0">
                {codeLines.map((line, index) => (
                  <div
                    key={index}
                    className={`flex transition-all duration-300 ${index < visibleLines ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <span className="w-10 sm:w-12 text-muted-foreground/50 select-none text-right pr-4 sm:pr-6 flex-shrink-0 font-medium">
                      {index + 1}
                    </span>
                    <span className={`${getLineColor(line.type)} whitespace-pre font-medium`}>
                      {line.text}
                      {index === visibleLines - 1 && line.text && (
                        <span className="inline-block w-0.5 h-5 bg-primary animate-cursor-blink ml-0.5" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block absolute right-3 top-24 w-20 h-40 bg-muted/20 rounded-lg opacity-40 p-1">
              {codeLines.slice(0, 18).map((_, i) => (
                <div key={i} className="h-1.5 mx-1 my-0.5 bg-muted-foreground/30 rounded-sm" style={{ width: `${30 + Math.random() * 50}%` }} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 sm:px-5 py-2 sm:py-3 bg-primary text-primary-foreground text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 font-semibold">
              <GitBranch className="w-4 h-4" />
              <span className="hidden sm:inline">main</span>
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-foreground/80" />
              0 errors, 0 warnings
            </span>
            <button className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all">
              <Play className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">Run</span>
            </button>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden sm:inline font-semibold">TypeScript React</span>
            <span className="font-bold">UTF-8</span>
            <span className="hidden sm:inline font-semibold">Ln 24, Col 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}