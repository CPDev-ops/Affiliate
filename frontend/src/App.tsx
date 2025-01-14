import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AdminApp } from './components/app/admin/AdminApp';
import { GetIcon } from './components/config/GetIcon';
import { FormClient } from './components/app/client/Form';
import { Login } from './components/app/auth/Login';
import { Home } from './components/app/user/home/Home';
import { Goals } from './components/app/user/goals/Goals';
import { HowToGet } from './components/app/client/HowToGet';
import { Balance } from './components/app/user/Balance/Balance';
import { useLevel } from './context/LevelContext';
import { useEffect } from 'react';

function App() {
  const { level } = useLevel(); // Usamos el valor de 'level' desde el contexto

  // Efecto para cambiar el background cada vez que 'level' cambie
  useEffect(() => {
    // Elimina todas las clases previas que puedan estar relacionadas con el fondo
    const backgroundClassRegex = /^domain-background\d+$/;
    const existingClasses = document.body.classList;

    // Eliminar todas las clases de fondo anteriores
    existingClasses.forEach((className) => {
      if (backgroundClassRegex.test(className)) {
        document.body.classList.remove(className);
      }
    });

    // Agregar la clase de fondo correspondiente al nivel actual
    document.body.classList.add(`domain-background${level}`);
  }, [level]); // Solo se ejecuta cuando 'level' cambia

  return (
    <div className="gothamMedium">
      <Router>
        <GetIcon />
        <Routes>
          <Route path='/' element={<AdminApp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/client' element={<FormClient />} />
          <Route path='/client/howToGet' element={<HowToGet />} />
          <Route path='/user/home' element={<Home />} />
          <Route path='/user/goals' element={<Goals />} />
          <Route path='/user/balance' element={<Balance />} />
        </Routes>
      </Router>
    </div >

  )
}

export default App
