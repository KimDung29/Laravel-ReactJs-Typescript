import { Outlet } from "react-router-dom";

export default function DefaultLayout() {

  const token = localStorage.getItem('ACCESS_TOKEN');
  const  role = localStorage.getItem('ROLE');

  const onLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ROLE');
  }

  return (
  <>
    <div className="navBar">
      {/* NAV LEFT */}
      <div className="navLeft">
        <div className="navLeft-logo"><a href="/">Logo</a></div>
        <div className="navleft-item"><a href="/women" >Women</a></div>
        <div className="navleft-item"><a href="/men">Men</a></div>
        <div className="navleft-item"><a href="/kids">Kids</a></div>
        <div className="navleft-item"><a href="/baby">Baby</a></div>
      </div>

      {/* NAV RIGHT */}
      <div className="navRight">
      { role === 'admin' ? '' : (
		// SHOPPING CART
        <div className="navRight-cart">
          <a href="/cart">
            <i className="fas fa-shopping-cart"></i>
            Cart 
          </a>
        </div>
      )}
       
        {token === null ? (
          <div className="navRight-register-login"> 
            
            <div className="navRight-register">
              <a href="/register">
              <i className="fas far fa-registered"></i>
                Register
              </a>
            </div>
           {/* LOG IN */}
            <div className="navRight-login">
              <a href="/login">
              <i className="fas fa-sign-in-alt"></i> Login
              </a>
            </div>
          </div>
        ) : (
          // LOG OUT
          <div onClick={onLogout} className="navRight-login">
            <a href="/">
             <i className="fas fa-sign-out-alt"></i> Logout
            </a>
          </div>
        )}        
      </div>
    </div>
	<Outlet/>
  </>
  )
}
