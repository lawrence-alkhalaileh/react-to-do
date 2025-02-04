import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ListItem } from "@material-tailwind/react";

const AuthButton = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, [auth]);


    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return user ? (
        <ListItem
            onClick={handleLogout}
            className="flex items-center gap-3 cursor-pointer hover:bg-blue-500/50 text-white transition-all px-4 py-2 rounded-lg"
        >
            <span className="font-medium">Log Out</span>
        </ListItem>
    ) : (
        <Link to="/login">
            <ListItem className="flex items-center gap-3 hover:bg-blue-500/50 text-white transition-all px-4 py-2 rounded-lg">
                <span className="font-medium">Sign In</span>
            </ListItem>
        </Link>
    );
};

export default AuthButton;
