import { Briefcase, CheckCircle2, MoreHorizontal, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function BusinessFrame() {
  const tasks = [
    { title: "Q1 Growth Strategy", tag: "Strategy", color: "bg-blue-500" },
    { title: "Market Analysis", tag: "Research", color: "bg-purple-500" },
    { title: "Revenue Optimization", tag: "Finance", color: "bg-green-500" },
  ];

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
          <Briefcase className="w-3 h-3" />
          <span>Growth_Roadmap</span>
        </div>
        <div className="w-12" />
      </div>

      <div className="flex-1 p-4 relative bg-background/50">
        {/* Kanban Column Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">In Progress</span>
            <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">3</span>
          </div>
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Task Cards */}
        <div className="space-y-3">
          {tasks.slice(0, 2).map((task, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="p-3 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {task.title}
                </span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.2 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${task.color}`} />
                  <span className="text-[10px] text-muted-foreground font-medium">{task.tag}</span>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((u) => (
                    <div key={u} className="w-5 h-5 rounded-full bg-muted border border-background flex items-center justify-center text-[8px] font-bold">
                      U{u}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Action Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="absolute bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform cursor-pointer"
        >
          <ArrowUpRight className="w-5 h-5" />
        </motion.div>

        {/* Activity Graph (Mini) */}
        <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Due Today</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>2h remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
}
