import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Landing, Home, Dashboard, Analytics, Admin } from "./pages";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  // usuario a modo de ejemplo
  const [user, setUser] = useState(null);

  const login = () => {
    // peticiones terminadas
    setUser({
      id: 1,
      name: "Raul",
      permissions: [
        "analize",
      ] /* tiene el permiso por lo que dejara entrar a la pagina analytics, de no tenerlo no dejara entrar*/,
      roles: ["admin"],
    });
  };

  const logout = () => setUser(null);

  return (
    <BrowserRouter>
      <Navigation />

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>login</button>
      )}

      <Routes>
        {/* paara que la paginas de inicio sea landing siempre */}
        <Route index element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        {/* proteger una ruta */}
        {/* <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        /> */}

        {/* proteger multiples rutas */}
        {/* !!user transforma a user en un booleano, nos ahorramos escribir user ? true: false */}
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* proteger un componente, Analytics seria el children */}
        <Route
          path="/analytics"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.permissions.includes("analize")}
              redirectTo="/home"
            >
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.roles.includes("admin")}
              redirectTo="/home"
            >
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/landing">landing</Link>
        </li>
        <li>
          <Link to="/home">home</Link>
        </li>
        <li>
          <Link to="/dashboard">dashboard</Link>
        </li>
        <li>
          <Link to="/analytics">analytics</Link>
        </li>
        <li>
          <Link to="/admin">admin</Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
