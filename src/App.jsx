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
    <div className="device-stage relative min-h-full w-full lg:flex lg:min-h-screen lg:items-center lg:justify-center lg:p-6">
      <div className="dotgrid pointer-events-none absolute inset-0 hidden opacity-70 lg:block" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-5 hidden text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-soft/40 lg:block"
        aria-hidden="true"
      >
        True Next Gen · ต้นแบบแนวคิด
      </div>
      <PasswordGate>
        <SessionProvider>
          <div className="relative z-10 mx-auto flex min-h-full w-full max-w-md flex-col bg-cloud no-scrollbar lg:h-[860px] lg:max-h-[calc(100vh-3rem)] lg:min-h-0 lg:w-[414px] lg:overflow-y-auto lg:rounded-[2.4rem] lg:shadow-pop lg:ring-1 lg:ring-black/10">
            <Router />
          </div>
        </SessionProvider>
      </PasswordGate>
    </div>
  )
}
