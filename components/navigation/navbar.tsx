import React from "react"
import classes from "./navbar.module.scss"
import Cart from "../cart/cart"
import Link from "next/link"

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

          <ul className={classes.navbar_nav_links}>
            <li>
              <Link href="/" className={classes.nav_link}>

                <span className={classes.nav_link}>Home</span>
              </Link>
            </li>



            <li>
              <Link href="/products" className={classes.nav_link}>
                Products
              </Link>

            </li>


            <li>
              <Link href="/account" className={classes.nav_link}>
                account
              </Link>

            </li>
          </ul>



          <form className={classes.nav_search_form}>
            <input
              className=""
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


          <li className={classes.nav_item}>
            <Cart />
          </li>


        </ul>

      </div>
    </nav>
  )
}

export default Navbar
