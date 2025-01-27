import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AdminApp } from './components/app/admin/AdminApp';
import { GetIcon } from './components/config/GetIcon';
import { FormClient } from './components/app/client/Form';
import { Login } from './components/app/auth/Login';
import {Home} from './components/app/user/balance/Home.tsx';
import { Goals } from './components/app/user/goals/Goals';
import { HowToGet } from './components/app/client/HowToGet';
import { Balance } from './components/app/user/details/Details';
import { useLevel } from './context/LevelContext';
import { useEffect } from 'react';
import { Summary } from './components/app/user/summary/Summary';
import { Collaborators } from './components/app/user/collaborators/Collaborators';
import { GameModule } from './components/app/client/game/Game';
import { GradientWrapper } from './components/hook/GradientWrapper';
import { getDomainInfo } from './components/utils/changedDomainPage';
import { HowToGetPage } from './components/app/client/game/howToGet/Page';
import { AlreadyPlayedPage } from './components/app/client/game/alreadyPlayed/Page';

function App() {
  const { level } = useLevel(); // Usamos el valor de 'level' desde el contexto

  // Ejemplo de uso
  const { domainName, domain } = getDomainInfo();
  console.log(domain, domainName)
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
        <GetIcon domain={domain} />
        <Routes>
          <Route path='/' element={<AdminApp />} />
          <Route path='/login' element={<Login domain={domain} />} />
          <Route path='/client' element={<FormClient domain={domain} />} />
          <Route path='/client/game' element={<GradientWrapper domain={domain}><GameModule domain={domain} /></GradientWrapper>} />
          <Route path='/client/game/howToGet' element={<GradientWrapper domain={domain}><HowToGetPage domain={domain} /></GradientWrapper>} />
          <Route path='/client/game/alreadyPlayed' element={<GradientWrapper domain={domain}><AlreadyPlayedPage domain={domain} /></GradientWrapper>} />
          <Route path='/client/howToGet' element={<HowToGet domain={domain} />} />
          <Route path='/user/balance' element={<Home domain={domain} />} />
          <Route path='/user/goals' element={<Goals domain={domain} />} />
          <Route path='/user/details' element={<Balance domain={domain} />} />
          <Route path='/user/summary' element={<Summary domain={domain} />} />
          <Route path='/user/collaborators' element={<Collaborators domain={domain} />} />
        </Routes>
      </Router>
    </div >
  )
}


export default App
