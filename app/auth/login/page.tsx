import { auth } from "@/auth"
import LoginForm from "@/components/auth/login-form"

const LoginPage = async () => {
  const session = await auth()
  console.log(session);

  return (
    <LoginForm />
  )
}
export default LoginPage