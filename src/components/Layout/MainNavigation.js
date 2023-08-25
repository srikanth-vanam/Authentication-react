import { Link ,useHistory} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../Store/AuthContext';

const MainNavigation = () => {
  const ctx=useContext(AuthContext);
  const history=useHistory();
  const clickHandler=()=>{
    ctx.removeToken();
    // redirecting user to login page
    history.replace("/auth")
  }
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
            <button onClick={clickHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
