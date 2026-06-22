import { useSession } from '../store.jsx'
import { getScenario } from '../data/scenarios.js'

export default function Kiosk() {
  const { state, dispatch } = useSession()
  const sc = getScenario(state.scenarioId)
  const number = state.ticket?.number || '—'

  const attached = [
    { icon: '👤', text: 'ข้อมูลลูกค้า + แพ็กเกจ' },
    { icon: '🔎', text: 'ผลวินิจฉัยจากหน้าร้าน' },
    { icon: '🧠', text: 'คำแนะนำ + ข้อเสนอที่จัดไว้' },
    sc.diagnosis.some((d) => state.captured[d.id]?.flag === 'priority')
      ? { icon: '⚡', text: 'ตั้งค่าคิว: ดูแลพิเศษ (ด่วน)' }
      : { icon: '🎟️', text: 'ลำดับคิวพร้อมข้อมูลแนบ' },
  ]

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 px-6 py-10">
      <div className="anim-fadeIn mb-5 flex items-center gap-2 text-[13px] font-medium text-white/70">
        <span className="text-lg">🖨️</span> ตู้คิวกำลังพิมพ์บัตร...
      </div>

      {/* printed ticket */}
      <div className="anim-ticket w-full max-w-[300px] origin-top rounded-2xl bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-dashed border-line pb-3">
          <div className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-true text-xs font-bold text-white">
              T
            </div>
            <span className="text-[12px] font-bold text-ink">True Shop</span>
          </div>
          <span className="text-[11px] text-ink-soft">บัตรคิว</span>
        </div>

        <div className="py-5 text-center">
          <div className="text-[11px] font-medium uppercase tracking-wider text-ink-soft/70">
            หมายเลขคิวของคุณ
          </div>
          <div className="mt-1 text-[56px] font-extrabold leading-none tracking-tight text-true">
            {number}
          </div>
          <div className="mt-2 inline-block rounded-full bg-cloud px-3 py-1 text-[12px] font-semibold text-ink-soft">
            {sc.title}
          </div>
        </div>

        <div className="rounded-xl bg-emerald-50 p-3">
          <div className="mb-2 text-center text-[12px] font-bold text-emerald-800">
            ✓ ข้อมูลถูกแนบไปกับคิวนี้แล้ว
          </div>
          <div className="space-y-1.5">
            {attached.map((a, i) => (
              <div key={i} className="flex items-center gap-2 text-[12px] text-emerald-900">
                <span>{a.icon}</span>
                {a.text}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 border-t border-dashed border-line pt-3 text-center text-[10px] leading-relaxed text-ink-soft/60">
          เมื่อถึงคิว Service Staff จะเห็นข้อมูลทั้งหมดทันที
          <br />
          ไม่ต้องเล่าเรื่องใหม่
        </div>
      </div>

      <button
        onClick={() => dispatch({ type: 'GO', stage: 'service' })}
        className="anim-fadeUp mt-7 w-full max-w-[300px] rounded-xl bg-white py-3.5 text-[15px] font-bold text-slate-900 shadow-lg transition active:scale-[0.98]"
        style={{ animationDelay: '0.5s' }}
      >
        ลูกค้าถึงคิวแล้ว → ไปที่ Service 💻
      </button>
    </div>
  )
}
