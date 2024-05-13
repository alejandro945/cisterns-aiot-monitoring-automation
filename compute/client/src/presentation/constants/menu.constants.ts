const isGreenLake = process.env.GREEN_LAKE === 'true';

export const NAVOPTIONS = [
    {
        label: 'Perfil',
        link: '#',
        shortcut: '⇧⌘P'
    },
    {
        label: 'Configuración',
        link: '#',
        shortcut: '⌘S'
    },
    {
        label: 'Salir',
        link: '/',
        shortcut: '⇧⌘Q'
    },
]

const BASICMENU = [
    
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

export const MENUWITHOUTSUBSCRIPTION = [
    {
        label: 'Subscripción',
        link: '/dashboard/pricing',
    }
];



