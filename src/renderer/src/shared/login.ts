import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { auth } from '../services'
import { FirebaseError } from 'firebase/app'
import { isLogged } from './redux/loginSlice'



// loga na aplicação
export const handleLogin = async (
  email: string,
  password: string,
  dispatch: any
): Promise<UserCredential | string> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log('userCredential :>> ', userCredential.user.email);
    dispatch(true)

    return userCredential
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/invalid-email':
          return 'E-mail inválido!'
        case 'auth/wrong-password':
          return 'Senha inválida!'
        case 'auth/weak-password':
          return 'Senha deve ter ao menos 6 caracteres!'
        case 'auth/invalid-credential':
          return 'E-mail ou Senha invalidos!'
        default:
          return 'Erro Carai'
      }
    } else {
      return 'Erro desconhecido ao fazer login'
    }
  }
}
