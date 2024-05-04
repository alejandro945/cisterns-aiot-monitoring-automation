const isGreenLake = process.env.GREEN_LAKE === 'true';

const BASICMENU = [
    {
        label: 'Perfil',
        link: '/examples/dashboard',
        shortcut: '⇧⌘P'
    },
    {
        label: 'Configuración',
        link: '/examples/dashboard',
        shortcut: '⌘S'
    },
    {
        label: 'Salir',
        link: '/',
        shortcut: '⇧⌘Q'
    },
    {
        label: 'Inicio',
        link: '/dashboard',
    },
    {
        label: 'Usuarios',
        link: '/dashboard/user',
    },
    {
        label: 'Alertas',
        link: '/dashboard/alert',
    },
    {
        label: 'Dispositivos',
        link: '/dashboard/device',
    },
]

export const MENU = isGreenLake ? [...BASICMENU, {
    label: 'Subscripción',
    link: '/dashboard/pricing',
}] : BASICMENU;



