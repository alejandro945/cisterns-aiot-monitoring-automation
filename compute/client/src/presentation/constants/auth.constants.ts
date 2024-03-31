export const AUTH_PAGE = {
    left: {
        organization: "Universidad Icesi",
        quote: "Esta herramienta nos ayudo a reducir los costos en consumo de agua en un 30%.",
        quoteName: "Alejandro Varela"
    },
    right: {
        signIn: {
            title: 'Bienvenido de nuevo',
            subtitle: 'Por favor ingresa tus credenciales para continuar',
            footerTitle: '¿No tienes una cuenta?',
            form: {
                email: 'Correo Electrónico',
                emailPlaceholder: 'alejo@gmail.com',
                emailDescription: 'Este es el nombre que se mostrará en tu perfil y en los correos electrónicos.',
                password: 'Contraseña',
                passwordPlaceholder: '********',
                localButton: 'Ingresar',
            }
        },
        signUp: {
            title: 'Crea una cuenta',
            subtitle: 'Ingresa tu correo electrónico para crear tu cuenta',
            footerTitle: 'Al continuar, aceptas nuestros terminos y politicas',
            form: {
                email: 'Correo Electrónico',
                password: 'Contraseña',
                confirmPassword: 'Confirmar Contraseña',
                localButton: 'Crear Cuenta',
            }
        },
        sso: {
            title: 'O continua con',
            providers: [
                'GitHub',
                'Google',
            ]
        },
        footerTitle: '¿No tienes una cuenta?',
        termsAndPolicies: 'Terminos y Politicas'
    },
}