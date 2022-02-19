import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
      <div className="container">
        <Link to={'/'} className="navbar-brand">CRUD de Contactos</Link>
      </div>
    </nav>
  )
}

export default Navbar