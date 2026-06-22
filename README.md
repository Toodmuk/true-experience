# True Experience — True Queue + The Welcomer (ต้นแบบ)

ต้นแบบ (prototype) ประสบการณ์หน้าร้าน True Shop แบบใหม่ที่ **เริ่มตั้งแต่ก่อนลูกค้าถึงร้าน** —
สองด้านของเรื่องเดียวกัน เล่นได้บนมือถือ. (โฟลเดอร์นี้ยังชื่อ `service-flow-app` ตามโค้ดเดิมของ The Welcomer
ที่ต่อยอดเพิ่ม True Queue เข้าไป — repo และ URL คือ `true-experience`)

**Live:** https://toodmuk.github.io/true-experience/ — รหัส `Tng2026@`

## สองแนวคิดในเว็บเดียว
1. **True Queue** (มุมลูกค้า · ในแอป True) — จองคิวจากที่บ้าน:
   เลือกบริการ → ระบบบอกว่าต้องเตรียมเอกสารอะไร (เช่น บัตรเครดิตที่ร่วมรายการ / บัตร ปชช. / พาสปอร์ต) →
   ผูกเบอร์ True เพื่อ "ส่งข้อมูลเข้าคิว" → บัตรคิวดิจิทัลพร้อมเวลารอ. พอถึงคิว พนักงานรู้เรื่องทันที = ลด service time
2. **The Welcomer** (มุมพนักงาน · แท็บเล็ต) — ดูแลตั้งแต่ก้าวแรก ก่อนกดบัตรคิว:
   เสียบบัตร ปชช./ค้นเบอร์ → วินิจฉัย → **Promotion Solver** คัดโปรฯ 40+ รายการให้เหลือที่ตรงกับลูกค้า
   (แก้ปัญหาโปรฯ เยอะจนพนักงานใหม่ตอบไม่แม่น) → ส่งข้อมูลต่อให้ Service → สรุปผลลัพธ์ before/after

ทั้งสองเชื่อมกัน: ในหน้าบัตรคิวของ True Queue มีปุ่ม "ดูสิ่งที่พนักงานเห็น" → ไปมุม The Welcomer

## Grounding
ตัวละครใน demo = 4 personas จาก field research (True Shop เซ็นทรัลเวิลด์): ลุงสมชาย / พี่นัท / Mark / คุณเอ.
ดูกลยุทธ์เต็มที่ `../Presentation-Strategy.md`

## เทคนิค
- **Vite + React 18 + Tailwind v4**, mobile-first, ไม่มี backend (state ใน sessionStorage)
- `base: './'` ใน `vite.config.js` → build ใช้ได้ทั้งบน GitHub Pages (subpath) และ Vercel (root)
- ข้อมูล/คำแนะนำเป็น **ตัวอย่างจำลอง + rule-based** (`src/data/scenarios.js`) เพื่อ demo เสถียร — ออกแบบให้ต่อ API True จริงได้

## รัน / build
```bash
npm install
npm run dev       # โหมดพัฒนา
npm run build     # → dist/
npm run preview
```

## Deploy (GitHub Pages)
source อยู่บน `main`, ของที่ build อยู่บน branch `gh-pages` (Pages เสิร์ฟจาก branch นั้น). รีดีพลอย:
```bash
npm run build
# push dist/ ขึ้น branch gh-pages (เช่น ผ่าน temp dir + git push -f origin gh-pages)
```
(ถ้าจะใช้ Vercel แทน: `vercel login` แล้ว `vercel deploy` — มี `vercel.json` + `.vercel` ของโปรเจกต์เดิมอยู่)
