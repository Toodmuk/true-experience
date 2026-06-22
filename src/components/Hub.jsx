import { useSession } from '../store.jsx'
import { PERSONAS } from '../data/scenarios.js'
import { Brand, Tag } from './ui.jsx'

const STORY = [
  { i: '🏠', t: 'จองคิวจากบ้าน' },
  { i: '🧾', t: 'เตรียมเอกสารครบ' },
  { i: '🏬', t: 'มาถึงร้าน' },
  { i: '📱', t: 'พนักงานรู้เรื่องแล้ว' },
]

const CONCEPTS = [
  {
    id: 'queue',
    emoji: '🎟️',
    kicker: 'มุมลูกค้า · ในแอป True',
    title: 'True Queue',
    desc: 'จองคิวจากที่บ้านหรือที่ไหนก็ได้ — ระบบบอกว่าต้องเตรียมเอกสารอะไร แล้วส่งข้อมูลของคุณเข้าคิวล่วงหน้า',
    points: ['เลือกบริการที่จะมาทำ', 'รู้ล่วงหน้าว่าต้องเตรียมอะไร', 'ผูกเบอร์ → พนักงานพร้อมก่อนคุณถึง'],
    accent: '#e2231a',
  },
  {
    id: 'welcomer',
    emoji: '📱',
    kicker: 'มุมพนักงาน · แท็บเล็ตหน้าร้าน',
    title: 'The Welcomer',
    desc: 'พนักงานเริ่มดูแลตั้งแต่ก้าวแรก วินิจฉัยบนแท็บเล็ตก่อนกดบัตรคิว และระบบคัดโปรฯ 40+ ให้เหลือที่ตรงกับลูกค้า',
    points: ['ทักทาย + วินิจฉัยก่อนกดคิว', 'คัดโปรฯ ที่ใช่จากกองโปรฯ มหาศาล', 'ส่งข้อมูลต่อให้ Service ทันที'],
    accent: '#1f2937',
  },
]

export default function Hub() {
  const { dispatch } = useSession()

  return (
    <div className="flex flex-1 flex-col px-5 pb-10 pt-7">
      <div className="anim-fadeUp flex items-center justify-between">
        <Brand />
        <Tag color="#e2231a">ต้นแบบ</Tag>
      </div>

      <div className="anim-fadeUp mt-7" style={{ animationDelay: '0.05s' }}>
        <h1 className="text-[26px] font-bold leading-tight text-ink">
          ประสบการณ์หน้าร้านแบบใหม่
          <br />
          ที่เริ่มตั้งแต่ก่อนถึงร้าน
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          สองด้านของเรื่องเดียวกัน — ลูกค้า <b className="text-ink">จองคิวจากบ้าน</b> พร้อมเตรียมเอกสาร
          ข้อมูลถูกส่งเข้าคิว แล้วพนักงาน <b className="text-ink">ดูแลตั้งแต่ก้าวแรก</b> โดยไม่ต้องถามซ้ำ
        </p>
      </div>

      {/* story strip */}
      <div
        className="anim-fadeUp mt-6 flex items-center justify-between rounded-2xl border border-line bg-white px-3 py-3.5 shadow-card"
        style={{ animationDelay: '0.1s' }}
      >
        {STORY.map((f, i) => (
          <div key={f.t} className="flex items-center">
            <div className="flex flex-col items-center gap-1 px-0.5 text-center">
              <span className="text-xl">{f.i}</span>
              <span className="text-[10px] font-medium leading-tight text-ink-soft">{f.t}</span>
            </div>
            {i < STORY.length - 1 && <span className="mx-0.5 text-ink-soft/40">→</span>}
          </div>
        ))}
      </div>

      {/* concept cards */}
      <div className="anim-fadeUp mt-7" style={{ animationDelay: '0.16s' }}>
        <div className="mb-3 text-[13px] font-bold uppercase tracking-wide text-ink-soft/70">
          เลือกมุมที่อยากลองเล่น
        </div>
        <div className="flex flex-col gap-3.5">
          {CONCEPTS.map((c) => (
            <button
              key={c.id}
              onClick={() => dispatch({ type: 'SET_CONCEPT', concept: c.id })}
              className="group w-full rounded-2xl border border-line bg-white p-4 text-left shadow-card transition active:scale-[0.985] hover:border-ink/15 hover:shadow-pop"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                  style={{ background: `${c.accent}12` }}
                >
                  {c.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft/70">
                    {c.kicker}
                  </div>
                  <div className="text-[17px] font-bold text-ink">{c.title}</div>
                  <p className="mt-1 text-[13px] leading-snug text-ink-soft">{c.desc}</p>
                  <ul className="mt-2.5 flex flex-col gap-1">
                    {c.points.map((p) => (
                      <li key={p} className="flex gap-1.5 text-[12.5px] leading-snug text-ink">
                        <span style={{ color: c.accent }}>›</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* grounding: personas from the field research */}
      <div className="anim-fadeUp mt-7" style={{ animationDelay: '0.22s' }}>
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-ink-soft/70">
          ออกแบบจากการลงพื้นที่จริง · True Shop เซ็นทรัลเวิลด์
        </div>
        <div className="flex flex-wrap gap-2">
          {PERSONAS.map((p) => (
            <span
              key={p.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[12px] font-medium text-ink shadow-sm"
            >
              <span>{p.emoji}</span>
              {p.name}
            </span>
          ))}
        </div>
      </div>

      <p
        className="anim-fadeUp mt-auto pt-8 text-center text-[11px] leading-relaxed text-ink-soft/60"
        style={{ animationDelay: '0.28s' }}
      >
        ต้นแบบแนวคิด · True Next Gen · ข้อมูลลูกค้าเป็นตัวอย่างจำลอง
      </p>
    </div>
  )
}
