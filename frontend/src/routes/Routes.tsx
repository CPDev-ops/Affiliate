import { Route, Routes, useLocation } from 'react-router-dom';
import { AdminApp } from '../app/hook/RedirectLoader.tsx';
import { GetIcon } from '../app/config/GetIcon';
import { FormClient } from '../app/core/client/Form';
import { Login } from '../app/core/auth/Login';
import { Home } from '../app/core/user/balance/Home.tsx';
import { Goals } from '../app/core/user/goals/Goals';
import { Balance } from '../app/core/user/details/Details';

import { Summary } from '../app/core/user/summary/Summary';
import { Collaborators } from '../app/core/user/collaborators/Collaborators';
import { GameModule } from '../app/core/client/game/Game';
import { GradientWrapper } from '../app/hook/GradientWrapper';
import { getDomainInfo } from '../app/utils/changedDomainPage';
import { HowToGetPage } from '../app/core/client/game/howToGet/Page';
import { AlreadyPlayedPage } from '../app/core/client/game/alreadyPlayed/Page';
import { BackgroundWrapper } from '../app/hook/BackgroundWrapper.tsx';
import { QrPage } from '../app/core/user/qr/Page.tsx';
import { AdminHome } from '../app/core/admin/home/Page.tsx';
import { TypeDto } from '../types/TypePropsComponents.ts';
import { NotFound } from '../app/core/notFound/page.tsx';
import { useLevel } from '../context/LevelContext.tsx';
import { useEffect } from 'react';
import { Template } from '../app/core/admin/pdf/TemplatePdf.tsx';
import { ModuleInstructive } from '../app/core/admin/instructive/ModuleInstructive.tsx';
import { RedirectToSummary } from '../app/hook/RedirectToSummary.tsx';

export function RoutesContainer() {
    //valor de admin
    const admin: TypeDto = 'admin'
    const user: TypeDto = 'user'

    // Ejemplo de uso
    const { domainName, domain } = getDomainInfo();
    console.log(domain, domainName)

    const { level } = useLevel(); // Usamos el valor de 'level' desde el contexto

    const location = useLocation(); // Obtener la ruta actual

    // Definir las rutas en las que se debe aplicar la clase de fondo
    const routesWithBackground = ['/login'];

    useEffect(() => {
        // Verificar si la ruta actual está en la lista
        if (routesWithBackground.includes(location.pathname)) {
            // Remover clases anteriores
            const backgroundClassRegex = /^domain-background\d+$/;
            const existingClasses = document.body.classList;

            existingClasses.forEach((className) => {
                if (backgroundClassRegex.test(className)) {
                    document.body.classList.remove(className);
                }
            });

            // Agregar la nueva clase de fondo según el nivel
            document.body.classList.add(`domain-background${level}`);
        } else {
            // Si la ruta NO está en la lista, asegurarse de limpiar cualquier clase de fondo previa
            document.body.className = ''; // Elimina todas las clases
        }
    }, [level, location.pathname]); // Se ejecuta cuando cambia el nivel o la ruta
    return (
        <>
            <GetIcon domain={domain} />
            <Routes>
                <Route path='/' element={<AdminApp />} />
                <Route path='/login' element={<BackgroundWrapper domain={domain}><GradientWrapper domain={domain}><Login domain={domain} /></GradientWrapper></BackgroundWrapper>} />
                <Route path='/client' element={<FormClient domain={domain} />} />
                <Route path='/client/game' element={<GradientWrapper domain={domain}><GameModule domain={domain} /></GradientWrapper>} />
                <Route path='/client/game/howToGet' element={<GradientWrapper domain={domain}><HowToGetPage domain={domain} /></GradientWrapper>} />
                <Route path='/client/game/alreadyPlayed' element={<GradientWrapper domain={domain}><AlreadyPlayedPage domain={domain} /></GradientWrapper>} />
                {/* USER */}
                <Route path='/user/balance' element={<Home type={user} domain={domain} />} />
                <Route path='/user/goals' element={<Goals type={user} domain={domain} />} />
                <Route path='/user/details' element={<Balance type={user} domain={domain} />} />
                <Route path='/user/summary' element={<Summary type={user} domain={domain} />} />
                <Route path='/user/qr' element={<QrPage type={user} domain={domain} />} />
                <Route path='/user/collaborators' element={<Collaborators type={user} domain={domain} />} />
                {/* <Route path='/user/summaryPdf/:id_affiliate_periodos' element={<Template />} /> */}
                <Route path="/user/summaryPdf" element={<RedirectToSummary />} />
                <Route path="/user/summaryPdf/:id_affiliate_periodos" element={<Template />} />
                {/* MODULO DE ADMIN */}
                <Route path='/admin/home' element={<AdminHome type={admin} domain={domain} />} />
                <Route path='/all/instructive/:type' element={<ModuleInstructive domain={domain} />} />
                <Route path='/test' element={<Template />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}