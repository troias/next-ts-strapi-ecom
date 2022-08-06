import React from "react"
import classes from "./navbar.module.scss"

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className={classes.navbar}>
      <a className={classes.navbar_brand} href="#">

      </a>
      <button
        className={classes.navbar_toggler}
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className={classes.navbar_toggler_icon}></span>
      </button>

      <div className={classes.navbar_collapse} id="navbarSupportedContent">
        <ul className={classes.navbar_nav}>
          <li className={classes.nav_item}>
            <a className={classes.nav_link} href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className={classes.nav_item}>
            <a className={classes.nav_link} href="#">
              Products
            </a>
          </li>
          {/* <li className={classes.nav_item} >
            <a
              className={classes.nav_link}
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a> */}
          {/* <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div> */}
          {/* </li> */}
          {/* <li className="nav-item">
            <a className="classes.nav_link disabled" href="#">
              Disabled
            </a>
          </li> */}
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar
