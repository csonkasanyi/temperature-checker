import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Nav.css';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';

const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const name = result.user.displayName;
                const profilePic = result.user.photoURL;

                localStorage.setItem("name", name);
                localStorage.setItem("profilePic", profilePic)
                setIsLoggedIn(true);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const signOut = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("profilePic");
        setIsLoggedIn(false);
    }

    const loggedInDiv = (
        <div>
            <p>Üdv, {localStorage.getItem("name")}</p>
            <button className="btn btn-secondary" onClick={signOut}>Kilépés</button>
        </div>
    )
    return (
            <nav>
                <Link to="/list" className=""><button className="btn btn-success btn-sm">Hőfokok megtekintése</button></Link>
                <Link to="/update" className=""><button className="btn btn-success btn-sm">Adatok feltöltése</button></Link>
            </nav>
    )
}

export default Nav;