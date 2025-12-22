import React from 'react'
import { useAuth } from "../Context/UserContext.jsx";

function HomePage() {

     const { user, logout } = useAuth();
  return (
    <div>
       <div className="mt-5">
               {" "}
        {user ? (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="w-full p-3 pl-4 text-left rounded-xl font-medium text-red-500 hover:bg-red-100 transition"
          >
                        Logout          {" "}
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full p-3 pl-4 text-left rounded-xl font-medium text-blue-500 hover:bg-blue-100 transition"
          >
                        Login          {" "}
          </button>
        )}
             {" "}
      </div>
    </div>
  )
}

export default HomePage
