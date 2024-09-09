import { Link, Outlet } from "react-router-dom";
import { createContext } from "react";
import { Container } from "../../components/components";

export default function Root() {
  const ThemeContext = createContext();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        {/* <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div> */}
        <nav>
          <ul>
            <li>
              <Link to={`/order`}>ORDER</Link>
            </li>
            <li>
              <Link to={`/income`}>INCOME</Link>
            </li>
            <li>
              <Link to={`/menu`}>Menu</Link>
            </li>
            {/* <li>
              <Link to={`/game`}>Game</Link>
            </li> */}
            <li>
              <Link to={`/products`}>Products</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Container>
          <Outlet />
        </Container>
      </div>
    </>
  );
}
