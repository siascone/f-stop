import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import * as sessionActions from '../../store/sessionsReducer';

function ProfileButton({ user }) {

    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    }

    const toggleMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setShowMenu(!showMenu);
    }

    return (
        <>
            <button onClick={toggleMenu}>
                <FaUserCircle />
            </button>
            {showMenu && (
                <ul className="profile-dropdown" ref={dropdownRef}>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={handleLogout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    )
}

export default ProfileButton;