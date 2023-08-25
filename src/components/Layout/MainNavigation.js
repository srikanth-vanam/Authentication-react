import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../Store/AuthContext';

const MainNavigation = () => {
  const ctx=useContext(AuthContext);
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!ctx.isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {ctx.isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          { ctx.isLoggedIn && <li>
            <button onClick={()=>ctx.removeToken()}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
