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
    <PasswordGate>
      <SessionProvider>
        <div className="mx-auto flex min-h-full w-full max-w-md flex-col bg-cloud shadow-sm">
          <Router />
        </div>
      </SessionProvider>
    </PasswordGate>
  )
}
