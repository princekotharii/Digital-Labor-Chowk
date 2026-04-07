import { NavLink, Outlet } from 'react-router-dom'
import { FaBolt, FaBuilding, FaHome, FaInfoCircle, FaMapMarkerAlt, FaSearch, FaSignInAlt, FaSignOutAlt, FaUserCircle, FaUsers } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { useDemoMode } from '../hooks/useDemoMode'

const navItems = [
  { to: '/', label: 'Home', icon: FaHome },
  { to: '/workers', label: 'Workers', icon: FaUsers },
  { to: '/employers', label: 'Employers', icon: FaSearch },
  { to: '/directory', label: 'Directory', icon: FaBuilding },
  { to: '/about', label: 'About', icon: FaInfoCircle },
]

function AppLayout() {
  const { isAuthenticated, user, logout } = useAuth()
  const { demoMode, toggleDemoMode } = useDemoMode()

  return (
    <div className="dlc-shell">
      <header className="card dlc-header reveal">
        <div className="header-top">
          <div className="brand-block">
            <div className="logo-lockup">
              <div className="logo-mark">DLC</div>
              <div>
                <strong>Digital Labor Chowk</strong>
                <p className="muted">One Network. One Workforce.</p>
              </div>
            </div>
            <p className="pill">Digital Labor Chowk Platform</p>
            <h1>Smart Hiring Hub For Daily Workforce</h1>
            <p className="muted">Modern, mobile-first and location-aware hiring workflows for workers and employers.</p>
            <div className="header-meta-row">
              <span><FaMapMarkerAlt /> Haridwar Region</span>
              <span><FaBolt /> Real-time matching enabled</span>
            </div>
          </div>
          <div className="auth-actions">
            <button type="button" className={`demo-toggle ${demoMode ? 'on' : 'off'}`} onClick={toggleDemoMode}>
              <FaBolt /> Demo Mode: {demoMode ? 'ON' : 'OFF'}
            </button>
            {isAuthenticated ? (
              <>
                <p className="user-badge"><FaUserCircle /> {user.name} ({user.role})</p>
                <button type="button" className="header-btn" onClick={logout}><FaSignOutAlt /> Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/register" className="header-btn"><FaUserCircle /> Register</NavLink>
                <NavLink to="/login" className="header-btn link-btn"><FaSignInAlt /> Login</NavLink>
              </>
            )}
          </div>
        </div>

        <nav className="nav-grid" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={item.to === '/'}
            >
              <item.icon /> {item.label}
            </NavLink>
          ))}
          <button type="button" className="nav-link city-pill"><FaMapMarkerAlt /> City: Haridwar</button>
        </nav>
      </header>

      <Outlet />

      <footer className="card footer-card">
        <div className="footer-grid">
          <div>
            <strong>Digital Labor Chowk</strong>
            <p>Connecting workers and employers with trust, location and speed.</p>
            <p>College demo ready: login, register and protected pages.</p>
          </div>
          <div>
            <strong>Quick Links</strong>
            <p>Workers</p>
            <p>Employers</p>
            <p>Directory</p>
          </div>
          <div>
            <strong>Support</strong>
            <p>Email: support@dlc.com</p>
            <p>Phone: +91 99999 00000</p>
            <p>Hours: 8 AM - 8 PM</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AppLayout
