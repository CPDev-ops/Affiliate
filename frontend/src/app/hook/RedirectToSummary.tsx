// RedirectToSummary.tsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function RedirectToSummary() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get('id_affiliate_periodos');
        if (id) {
            navigate(`/user/summaryPdf/${id}`);
        }
    }, [location, navigate]);

    return null; // o un loader si quieres mostrar algo
}
