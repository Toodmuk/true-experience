import { SessionProvider, useSession } from './store.jsx'
import PasswordGate from './components/PasswordGate.jsx'
import Hub from './components/Hub.jsx'
import Queue from './components/Queue.jsx'
import Intro from './components/Intro.jsx'
import FrontStaff from './components/FrontStaff.jsx'
import Kiosk from './components/Kiosk.jsx'
import ServiceStaff from './components/ServiceStaff.jsx'
import Impact from './components/Impact.jsx'

function Welcomer() {
  const { state } = useSession()
  switch (state.stage) {
    case 'front':
      return <FrontStaff />
    case 'kiosk':
      return <Kiosk />
    case 'service':
      return <ServiceStaff />
    case 'impact':
      return <Impact />
    default:
      return <Intro />
  }
}

function Router() {
  const { state } = useSession()
  switch (state.concept) {
    case 'queue':
      return <Queue />
    case 'welcomer':
      return <Welcomer />
    default:
      return <Hub />
  }
}

export default function App() {
  return (
    // On phones the app is full-bleed (QR scan). On >=lg (iPad/desktop/projector)
    // the column floats as a framed device on a branded stage — so it reads as an
    // intentional product mock, not a stranded phone column.
    <div className="device-stage relative min-h-full w-full md:flex md:min-h-screen md:items-center md:justify-center md:p-6">
      <div className="dotgrid pointer-events-none absolute inset-0 hidden opacity-70 md:block" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-5 hidden text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-soft/40 md:block"
        aria-hidden="true"
      >
        True Next Gen · ต้นแบบแนวคิด
      </div>
      <PasswordGate>
        <SessionProvider>
          {/* fluid height on large screens: the framed device hugs its content
             (capped at the viewport, scrolls if taller) so no screen is clipped
             or left with dead space. Phones stay full-bleed. */}
          <div className="relative z-10 mx-auto flex min-h-full w-full max-w-md flex-col bg-cloud no-scrollbar md:h-auto md:max-h-[calc(100vh-3rem)] md:min-h-0 md:w-[414px] md:overflow-y-auto md:rounded-[2.4rem] md:shadow-pop md:ring-1 md:ring-black/10">
            <Router />
          </div>
        </SessionProvider>
      </PasswordGate>
    </div>
  )
}
