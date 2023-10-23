import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import axiosClient from "../../axios-client";

interface User {
	id: number;
	name: string;
	avatar: string;
	image:string;
	role: string;
	created_at: string;
	email_verified_at: null;
	updated_at: string
}

export default function AdminLayout() {
	const [ user, setUser ] = useState( {} as User );

	const userId = sessionStorage.getItem('CURRENT_USER_ID');

	useEffect(() => {
		axiosClient.get(`/user/${userId}`)
		.then((response) => {
			setUser(response.data)
		})
		.catch((e) => console.log(e.response))
	}, [])	


	const onLogout = () => {
		sessionStorage.removeItem('ACCESS_TOKEN');
		sessionStorage.removeItem('ROLE');
		sessionStorage.removeItem('CURRENT_USER_ID');
	}

	return (
	<>
	<div className="admin-page">
		<div className="admin-wrapper">
			<div className="admin-left-side">
				<div className="admin-left-welcome">
					<p>Wellcome </p>
					<img src={user.avatar} alt="" className="admin-left-avatar" />
					<span>{user?.name}</span>
				</div>
				<div className='admin-left-navlink-wrapper'>
					<NavLink to='/admin/dashboard' className='admin-left-navlink'>Dashboard</NavLink>
				</div >
				<div className='admin-left-navlink-wrapper'>
					<NavLink to='/admin/products' className='admin-left-navlink' >Products</NavLink>
				</div>
			</div>
		
			<div className="admin-right-side">

				<div className="admin-right-navbar">	
					<div className="admin-right-search">
						<a href="#">
							<i className="fas fa-search"></i>Search
						</a>
					</div>
					<div onClick={onLogout} className="admin-right-login">
						<a href="/">
						<i className="fas fa-sign-out-alt"></i> Logout
						</a>
					</div>
				</div>
				<div className="admin-outlet">
					<Outlet />
				</div>
			</div>
			
		</div>

	</div>
	</>
	)
}
  