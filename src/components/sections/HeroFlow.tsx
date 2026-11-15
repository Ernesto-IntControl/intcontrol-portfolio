import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useReducer, useRef, useState } from "react";
import { flowChecks, flowStories, type FlowStory } from "@/src/data/heroFlow";
import { EASE_OUT_EXPO } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";

interface Line {
  text: string;
  start: number;
  end: number;
}

interface Plan {
  lines: Line[];
  checks: number[];
  prod: number;
  end: number;
}

/** Calendrier d'une histoire (ms) : la story s'affiche, le code se tape, les vérifications passent, puis la mise en production. */
function schedule(story: FlowStory): Plan {
  let at = 1000;
  const lines: Line[] = [];
  const branch = `git switch -c ${story.branch}`;
  lines.push({ text: branch, start: at, end: at + branch.length * 22 });
  at = lines[0].end + 220;
  for (const commit of story.commits) {
    const line = { text: commit, start: at, end: at + commit.length * 16 };
    lines.push(line);
    at = line.end + 160;
  }
  const checks = flowChecks.map((_, i) => at + 200 + i * 320);
  const prod = checks[checks.length - 1] + 400;
  return { lines, checks, prod, end: prod + 2800 };
}

const plans = flowStories.map(schedule);

type State = { index: number; t: number };
type Action = { type: "tick"; dt: number } | { type: "go"; index: number };

function reducer(state: State, action: Action): State {
  if (action.type === "go") return { index: action.index, t: 0 };
  const t = state.t + action.dt;
  return t >= plans[state.index].end ? { index: (state.index + 1) % plans.length, t: 0 } : { index: state.index, t };
}

/**
 * Carte animée du hero : de l'idée à la production.
 * Une user story (côté produit) devient une branche et des commits (côté code),
 * passe les vérifications, puis part en production ; trois exemples en boucle.
 * Pause au survol et hors de l'écran ; état final fixe si l'utilisateur limite les animations.
 */
export default function HeroFlow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.3 });
  const [paused, setPaused] = useState(false);
  const [{ index, t: elapsed }, dispatch] = useReducer(reducer, { index: 0, t: 0 });

  useEffect(() => {
    if (reduce || !inView || paused) return;
    let last = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      dispatch({ type: "tick", dt: Math.min(now - last, 120) });
      last = now;
    }, 40);
    return () => window.clearInterval(id);
  }, [reduce, inView, paused]);

  const story = flowStories[index];
  const plan = plans[index];
  const t = reduce ? Number.POSITIVE_INFINITY : elapsed;
  const coding = t < plan.lines[plan.lines.length - 1].end;
  const live = t >= plan.prod;
  const progress = reduce ? 1 : Math.min(t / plan.end, 1);

  return (
    <div
      ref={ref}
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className={cn("panel overflow-hidden rounded-[24px] shadow-[var(--shadow-float)]", className)}
    >
      {/* En-tête : titre et choix de l'exemple */}
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5 sm:px-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:text-[11px]">De l'idée à la production</span>
        <div className="flex items-center gap-1.5">
          {flowStories.map((s, i) => (
            <button
              key={s.product}
              type="button"
              onClick={() => dispatch({ type: "go", index: i })}
              aria-label={`Exemple : ${s.product}`}
              aria-pressed={i === index}
              className="flex h-6 items-center"
            >
              <span
                className={cn("block h-1.5 rounded-full transition-all duration-500 ease-out-expo", i === index ? "w-5" : "w-1.5 bg-line-strong")}
                style={i === index ? { background: s.accent } : undefined}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Côté produit : la user story */}
      <div className="px-5 pb-5 pt-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <span className="serif-accent text-lg text-accent">Côté produit</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={story.product}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="chip"
              style={{ color: story.accent }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: story.accent }} />
              {story.product}
            </motion.span>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="mt-3 min-h-[2.8em] font-serif text-[1.3rem] italic leading-snug text-fg sm:text-[1.45rem]"
          >
            « {story.story} »
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Côté code : branche, commits, vérifications */}
      <div className="border-t border-line bg-bg/50 px-5 py-4 sm:px-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Côté code</span>
        <div className="mt-3 space-y-1 font-mono text-[11.5px] leading-[1.75] sm:text-[12.5px]" aria-hidden>
          {plan.lines.map((line, i) => {
            const ratio = Math.min(Math.max((t - line.start) / (line.end - line.start), 0), 1);
            const shown = line.text.slice(0, Math.round(ratio * line.text.length));
            const typing = ratio > 0 && ratio < 1;
            return (
              <div key={`${index}-${i}`} className={cn("flex gap-2 whitespace-nowrap", t < line.start && "invisible")}>
                <span className={i === 0 ? "text-accent" : "text-emerald-500 dark:text-emerald-400"}>{i === 0 ? "$" : "+"}</span>
                <span className={cn("truncate", i === 0 ? "text-fg" : "text-muted")}>
                  {shown}
                  {typing && <span className="caret !h-[1em] !w-[0.55em] !align-[-0.15em] opacity-70" style={{ animation: "none" }} />}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-3.5 font-mono text-[11px] sm:text-xs">
          {flowChecks.map((check, i) => {
            const done = t >= plan.checks[i];
            return (
              <span key={check} className={cn("inline-flex items-center gap-1.5 transition-colors duration-300", done ? "text-fg" : "text-subtle")}>
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300",
                    done ? "scale-100 border-transparent bg-emerald-500 text-white" : "scale-90 border-line-strong",
                  )}
                >
                  {done && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
                </span>
                {check}
              </span>
            );
          })}
        </div>
      </div>

      {/* Statut et progression */}
      <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-3.5 sm:px-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={live ? "live" : coding ? "code" : "checks"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 text-sm"
          >
            {live ? (
              <>
                <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-medium text-fg">En production</span>
              </>
            ) : (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-subtle" />
                <span className="text-muted">{coding ? "En développement" : "Vérifications"}</span>
              </>
            )}
          </motion.span>
        </AnimatePresence>
        <span className="font-mono text-[11px] text-subtle">{paused ? "En pause" : `0${index + 1} / 0${flowStories.length}`}</span>
      </div>
      <div className="h-[2px] bg-line" aria-hidden>
        <div className="h-full origin-left" style={{ transform: `scaleX(${progress})`, background: story.accent }} />
      </div>
    </div>
  );
}
