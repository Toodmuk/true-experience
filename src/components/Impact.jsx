import { Check, ArrowRight, RotateCcw } from 'lucide-react'
import { useSession } from '../store.jsx'
import { getScenario } from '../data/scenarios.js'
import { Brand } from './ui.jsx'
import { getIcon } from './icons.jsx'

export default function Impact() {
  const { state, dispatch } = useSession()
  const sc = getScenario(state.scenarioId)
  const { before, after, wins } = sc.impact

  return (
    <div className="flex flex-1 flex-col px-5 pb-8 pt-7">
      <div className="anim-fadeUp flex items-center justify-between">
        <Brand small />
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" /> ปิดเคสแล้ว
        </span>
      </div>

      <h1 className="anim-fadeUp mt-6 text-[24px] font-bold leading-tight text-ink" style={{ animationDelay: '0.05s' }}>
        ผลลัพธ์ของการ
        <br />
        เริ่มบริการตั้งแต่ก้าวแรก
      </h1>

      <div className="anim-fadeUp mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-[13px] leading-relaxed text-emerald-900" style={{ animationDelay: '0.08s' }}>
        <b>{sc.service.resolution.title}:</b> {sc.service.resolution.text}
      </div>

      {/* time contrast */}
      <div className="anim-fadeUp mt-5 flex items-stretch gap-2" style={{ animationDelay: '0.12s' }}>
        <div className="flex-1 rounded-2xl bg-slate-100 p-3.5 text-center">
          <div className="text-[11px] font-medium text-ink-soft">แบบเดิม</div>
          <div className="tnum mt-0.5 text-[22px] font-extrabold text-slate-500">{before.time}</div>
        </div>
        <div className="flex items-center text-true">
          <ArrowRight className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
        </div>
        <div className="flex-1 rounded-2xl border border-true/20 bg-true-soft p-3.5 text-center">
          <div className="text-[11px] font-medium text-true">ด้วยระบบนี้</div>
          <div className="tnum mt-0.5 text-[22px] font-extrabold text-true">{after.time}</div>
        </div>
      </div>

      {/* before / after detail */}
      <div className="anim-fadeUp mt-3 grid grid-cols-1 gap-2.5" style={{ animationDelay: '0.16s' }}>
        <Compare title="แบบเดิม" mood={before.mood} steps={before.steps} tone="muted" />
        <Compare title="ด้วยระบบนี้" mood={after.mood} steps={after.steps} tone="brand" />
      </div>

      {/* wins */}
      <div className="mt-6">
        <div className="anim-fadeUp mb-2.5 text-[13px] font-bold uppercase tracking-wide text-ink-soft/70" style={{ animationDelay: '0.2s' }}>
          คุณค่าที่ได้
        </div>
        <div className="stagger flex flex-col gap-2.5">
          {wins.map((w, i) => {
            const WinIcon = getIcon(w.icon)
            return (
            <div key={i} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-3.5 shadow-card">
              <WinIcon className="h-6 w-6 shrink-0 text-true" strokeWidth={1.75} aria-hidden="true" />
              <div>
                <div className="text-[14px] font-bold text-ink">{w.label}</div>
                <div className="text-[13px] leading-snug text-ink-soft">{w.text}</div>
              </div>
            </div>
            )
          })}
        </div>
      </div>

      {/* CTAs */}
      <div className="anim-fadeUp mt-7 flex flex-col gap-2.5" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={() => dispatch({ type: 'RESTART_WELCOMER' })}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-true py-3.5 text-[15px] font-bold text-white shadow-pop transition active:scale-[0.98]"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> ลองอีกสถานการณ์
        </button>
        <button
          onClick={() => dispatch({ type: 'GO_HUB' })}
          className="w-full rounded-xl border border-line bg-white py-3 text-[14px] font-semibold text-ink-soft transition active:scale-[0.98]"
        >
          กลับหน้าแรก (เลือกมุมอื่น)
        </button>
      </div>
    </div>
  )
}

function Compare({ title, mood, steps, tone }) {
  const brand = tone === 'brand'
  return (
    <div
      className={`rounded-2xl border p-4 ${
        brand ? 'border-true/20 bg-true-soft' : 'border-line bg-slate-50'
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className={`text-[13px] font-bold ${brand ? 'text-true' : 'text-slate-500'}`}>{title}</span>
        <span className={`text-[11px] font-medium ${brand ? 'text-true/80' : 'text-slate-400'}`}>
          {mood}
        </span>
      </div>
      <ul className="space-y-1.5">
        {steps.map((s, i) => (
          <li key={i} className={`flex gap-2 text-[13px] leading-snug ${brand ? 'text-ink' : 'text-ink-soft'}`}>
            {brand ? (
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-true" strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <span className="text-slate-400">·</span>
            )}
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}
