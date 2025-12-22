// definir las props que espera el componente
interface LoginFormProps {
    onSwitch: () => void // el componente solo espera una prop, que es una funcion sin parametros y no retorna nada
}

// `<LoginFormProps>` indica que el componente debe recibir las props definidas en la interfaz
const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
    return <>login form</>
}

export default LoginForm
