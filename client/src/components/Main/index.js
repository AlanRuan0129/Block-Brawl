import React, { useEffect } from 'react';
import styles from "./styles.module.css";

import io from 'socket.io-client';


const Main = () => {

	
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>fakebook</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Sign out
				</button>
			</nav>


		</div>
	);
};

export default Main;