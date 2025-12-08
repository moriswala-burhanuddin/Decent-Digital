import { useState, useEffect } from "react";
import {
  Layers, MousePointer2, PenTool, Square, Type, Move,
  Minus, Plus, Play, ChevronDown, Circle, Image,
  Zap, AlignLeft, Palette, Code2, Eye,
  Smartphone, Monitor, Tablet, Grid3X3
} from "lucide-react";

const tools = [
  { icon: MousePointer2, name: "Select" },
  { icon: Move, name: "Hand" },
  { icon: Square, name: "Rectangle" },
  { icon: Circle, name: "Ellipse" },
  { icon: PenTool, name: "Pen" },
  { icon: Type, name: "Text" },
  { icon: Image, name: "Image" },
];

const layers = [
  {
    name: "Hero Section", type: "Frame", active: true, expanded: true, children: [
      { name: "Background", type: "Rectangle" },
      { name: "Heading", type: "Text" },
      { name: "CTA Button", type: "Component" },
    ]
  },
  { name: "Navigation", type: "Component", children: [] },
  { name: "Cards", type: "Auto Layout", children: [] },
];

const colorPalette = [
  "hsl(217 91% 60%)",
  "hsl(187 94% 43%)",
  "hsl(258 90% 66%)",
  "hsl(330 81% 60%)",
  "hsl(142 76% 36%)",
];

export function FigmaFrame() {
  const [activeTool, setActiveTool] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [cursorPos, setCursorPos] = useState({ x: 45, y: 40 });
  const [activeDevice, setActiveDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showCode, setShowCode] = useState(false);
  const [typingText, setTypingText] = useState("");
  const fullText = "Decent Digital";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.slice(0, index));
        index++;
      } else {
        index = 0;
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const positions = [
      { x: 45, y: 35 },
      { x: 55, y: 45 },
      { x: 40, y: 55 },
      { x: 60, y: 40 },
    ];
    let index = 0;
    const interval = setInterval(() => {
      setCursorPos(positions[index % positions.length]);
      setActiveTool(Math.floor(Math.random() * 4));
      index++;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 via-secondary/15 to-accent-purple/20 rounded-3xl blur-3xl opacity-60" />

      <div className="relative glass-card overflow-hidden shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)] border border-border/30 rounded-2xl">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 bg-card/90 border-b border-border/50">
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all cursor-pointer" />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/30">
              <Grid3X3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Design System — Figma</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-muted/50 border border-border/30">
              {[
                { icon: Monitor, value: "desktop" },
                { icon: Tablet, value: "tablet" },
                { icon: Smartphone, value: "mobile" },
              ].map(({ icon: Icon, value }) => (
                <button
                  key={value}
                  onClick={() => setActiveDevice(value as typeof activeDevice)}
                  className={`p-2 rounded-md transition-all ${activeDevice === value
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl">
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">Present</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <button onClick={() => setZoom(z => Math.max(25, z - 25))} className="p-1.5 hover:bg-muted rounded-md transition-all">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold">{zoom}%</span>
              <button onClick={() => setZoom(z => Math.min(200, z + 25))} className="p-1.5 hover:bg-muted rounded-md transition-all">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-[320px] sm:h-[420px] lg:h-[500px]">
          <div className="w-12 sm:w-14 lg:w-16 bg-card/80 border-r border-border/50 py-4 flex flex-col items-center gap-1">
            {tools.slice(0, 5).map((tool, index) => (
              <button
                key={tool.name}
                onClick={() => setActiveTool(index)}
                className={`p-2.5 sm:p-3 rounded-xl transition-all ${activeTool === index
                  ? "bg-primary text-primary-foreground shadow-lg scale-110"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105"
                  }`}
              >
                <tool.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            ))}

            <div className="w-8 h-px bg-border my-2 hidden sm:block" />

            <div className="space-y-1 hidden sm:block">
              <button className="p-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all hover:scale-105">
                <Zap className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all hover:scale-105">
                <AlignLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 bg-muted/20 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: `linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.5) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />

            <div className="absolute inset-0 pointer-events-none hidden sm:block">
              <div className="absolute top-6 left-6 floating-element">
                <div className="glass-card p-3 rounded-xl shadow-xl border border-border/30">
                  <div className="flex gap-2">
                    {colorPalette.slice(0, 4).map((color, i) => (
                      <div key={i} className="w-6 h-6 rounded-lg shadow-md hover:scale-110 transition-transform cursor-pointer" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute top-6 right-6 floating-element animation-delay-1000 hidden lg:block">
                <div className="glass-card p-4 rounded-xl shadow-xl border border-border/30 w-44">
                  <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Typography</div>
                  <div className="text-base font-bold text-foreground mb-1">Heading Style</div>
                  <div className="text-sm text-muted-foreground">Body text style</div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 floating-element animation-delay-2000 hidden md:block">
                <div className="glass-card p-3 rounded-xl shadow-xl border border-border/30">
                  <div className="flex gap-3">
                    <div className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold shadow-lg">Primary</div>
                    <div className="px-4 py-2 rounded-lg border-2 border-border text-foreground text-sm font-bold hover:bg-muted/50 transition-all">Secondary</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-8 sm:inset-12 lg:inset-16 flex items-center justify-center">
              <div
                className="relative bg-card rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 border border-border/30"
                style={{
                  transform: `scale(${zoom / 100})`,
                  width: activeDevice === "mobile" ? "240px" : activeDevice === "tablet" ? "360px" : "100%",
                  maxWidth: activeDevice === "desktop" ? "480px" : undefined
                }}
              >
                <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg" />
                      <div className="h-3 w-20 rounded-full bg-foreground/20" />
                    </div>
                    <div className="hidden sm:flex gap-6">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-3 w-16 rounded-full bg-muted-foreground/30" />
                      ))}
                    </div>
                  </div>

                  <div className="py-6 sm:py-10 space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{typingText}</span>
                      <span className="w-0.5 h-6 sm:h-8 bg-primary animate-cursor-blink" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 w-full rounded-full bg-muted-foreground/20" />
                      <div className="h-3 w-5/6 rounded-full bg-muted-foreground/20" />
                      <div className="h-3 w-2/3 rounded-full bg-muted-foreground/20 hidden sm:block" />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <div className="h-10 sm:h-12 w-28 sm:w-36 rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg" />
                      <div className="h-10 sm:h-12 w-28 sm:w-36 rounded-xl border-2 border-border shadow-md" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="p-3 rounded-xl bg-muted/50 space-y-2 border border-border/30 hover:border-primary/30 transition-all">
                        <div className="h-12 sm:h-20 rounded-lg bg-primary/20" />
                        <div className="h-2 w-full rounded-full bg-muted-foreground/20" />
                        <div className="h-2 w-3/4 rounded-full bg-muted-foreground/20 hidden sm:block" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute -inset-0.5 border-2 border-primary rounded-2xl pointer-events-none">
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-primary rounded-sm" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-primary rounded-sm" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-primary rounded-sm" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-primary rounded-sm" />
                </div>
              </div>
            </div>

            <div
              className="absolute w-8 h-8 transition-all duration-1000 ease-out pointer-events-none z-20 hidden sm:block"
              style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <MousePointer2 className="w-6 h-6 text-primary drop-shadow-lg fill-primary-foreground" />
              <div className="absolute top-6 left-5 px-3 py-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-bold rounded-full whitespace-nowrap shadow-xl">
                Designer
              </div>
            </div>

            <button
              onClick={() => setShowCode(!showCode)}
              className={`absolute bottom-4 right-4 p-3 rounded-xl transition-all shadow-lg ${showCode ? "bg-primary text-primary-foreground scale-110" : "glass-card text-muted-foreground hover:text-foreground hover:scale-105"
                }`}
            >
              <Code2 className="w-5 h-5" />
            </button>

            {showCode && (
              <div className="absolute bottom-20 right-4 w-64 sm:w-80 glass-card rounded-xl p-4 shadow-2xl animate-fade-in border border-border/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">CSS Export</span>
                  <Palette className="w-4 h-4 text-primary" />
                </div>
                <pre className="text-xs font-mono text-muted-foreground leading-relaxed">
                  <code>
                    <span className="text-accent-purple font-semibold">.btn-primary</span> {`{`}{"\n"}
                    {"  "}<span className="text-secondary">background</span>: <span className="text-primary">linear-gradient(...)</span>;{"\n"}
                    {"  "}<span className="text-secondary">border-radius</span>: <span className="text-primary">12px</span>;{"\n"}
                    {"  "}<span className="text-secondary">padding</span>: <span className="text-primary">16px 32px</span>;{"\n"}
                    {`}`}
                  </code>
                </pre>
              </div>
            )}
          </div>

          <div className="hidden lg:flex w-60 xl:w-72 bg-card/80 border-l border-border/50 flex-col">
            <div className="flex border-b border-border/50">
              {["Design", "Inspect"].map((tab, i) => (
                <button
                  key={tab}
                  className={`flex-1 py-3 text-sm font-bold transition-all ${i === 0 ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-auto p-4">
              <div className="flex items-center gap-2 text-sm font-bold mb-4">
                <Layers className="w-5 h-5 text-primary" />
                Layers
                <ChevronDown className="w-4 h-4 ml-auto text-muted-foreground" />
              </div>

              <div className="space-y-1">
                {layers.map((layer) => (
                  <div key={layer.name}>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-all ${layer.active ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}>
                      <ChevronDown className={`w-4 h-4 ${layer.expanded ? "" : "-rotate-90"}`} />
                      <Square className="w-4 h-4" />
                      <span className="truncate flex-1">{layer.name}</span>
                      <Eye className="w-4 h-4 opacity-50 hover:opacity-100 transition-opacity" />
                    </div>
                    {layer.expanded && layer.children && (
                      <div className="ml-6 mt-1 space-y-1">
                        {layer.children.map((child) => (
                          <div key={child.name} className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted rounded-lg cursor-pointer transition-all">
                            <div className="w-2.5 h-2.5 rounded-sm bg-muted-foreground/30" />
                            <span className="truncate">{child.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border/50 p-4">
              <div className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wide">Color Palette</div>
              <div className="flex gap-2">
                {colorPalette.map((color, i) => (
                  <button key={i} className="w-8 h-8 rounded-lg transition-all hover:scale-110 shadow-md" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 sm:px-5 py-2 sm:py-3 bg-card/90 border-t border-border/50 text-xs sm:text-sm">
          <div className="flex items-center gap-4 text-muted-foreground font-medium">
            <span className="flex items-center gap-2">
              <Grid3X3 className="w-4 h-4" />
              <span className="hidden sm:inline">1920 × 1080</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
              <span className="hidden sm:inline font-semibold">Auto-saving</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-muted-foreground font-medium">3 collaborators</span>
            <div className="flex -space-x-2">
              {["bg-primary", "bg-secondary", "bg-accent-purple"].map((bg, i) => (
                <div key={i} className={`w-6 h-6 rounded-full ${bg} border-2 border-card shadow-lg hover:scale-110 transition-transform cursor-pointer`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}