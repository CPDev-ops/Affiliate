export function ImageHome({ domain }: { domain: string }) {
    return (
        <img
            src={`/images/client/game/${domain.toLowerCase()}/logo-dominio.png`}
            className={`${domain.toUpperCase() !== 'SALTA' ? 'w-60 sm:w-64' : 'w-36 sm:w-40'} mt-8 mx-auto z-20`}
            alt="Titulo Alterno"
        />
    )
}