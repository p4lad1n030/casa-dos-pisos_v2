import Header from '../components/header';
import bgform from '../assets/imgBackgroundLogin.png';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { auth } from '../services';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { isLogged } from '../shared/redux/loginSlice';




const Login = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [passWord, setPassWord] = useState<string>('');
  const [error, setError] = useState<string | undefined | null>();
  const [loading, setLoading] = useState<boolean>(false);
const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log('clicou');

    signInWithEmailAndPassword(auth, userEmail, passWord).then((result) => {
      console.log('result :>> ', result.user.email);
      dispatch(isLogged(result.user.email!))

      navigate('/create', { replace: true })
    }).catch((err) => {
      console.log(err.code);
      switch (err.code) {
        case 'auth/invalid-email': setError('Email invalido!')
          break
        case 'auth/missing-password': setError('Esqueceu a senha!')
          break;
        case 'auth/invalid-credential': setError('Senha ou email errados!')
          break;
        // default: setError('algo saiu mal')
      }
    }).finally(() => {
      setLoading(false)

    })

  }
  const showPass = ()=> {
    const input = document.querySelector('#pass') as HTMLInputElement
    input.type = 'text'
  }
  const hidePass = ()=> {
    const input = document.querySelector('#pass') as HTMLInputElement
    input.type = 'password'
  }

  return (

    <>

      {loading ?
        <div id="loading-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-vm bg-opacity-90">

          <svg className="animate-spin h-8 w-8 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>

          <span className="text-white text-3xl font-bold">Acessando...</span>

        </div>
        :
        (<section className='h-dvh flex flex-col justify-between '>
          <Header login />
          <article className=" h-screen border border-red mb-3 rounded-bl-2xl border-t-0 rounded-br-2xl">

            <aside className=" w-[500px]  flex  h-full  sm:mx-auto lg:ml-32">

              <form className="relative border h-full flex items-center justify-center  w-full overflow-hidden " onSubmit={handleSubmit}>
                <img src={bgform} alt="" className='w-full absolute -z-10' />
                <div className="h-full  flex items-center  flex-col p-1 justify-center" >
                  <div className="bg-white/80 rounded-lg flex justify-center items-center mb-10 p-1">

                    <p className="text-vm  font-title font-extrabold">Faça login para entrar</p>
                  </div>

                  <input type="email"
                    className="h-8 mb-8 w-[400px] rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" autoComplete='on'
                    aria-label='E-mail' placeholder='Digite seu E-mail' onChange={(e) => setUserEmail(e.target.value)} value={userEmail}/>

                  <div className="relative flex justify-end items-center">

                    {showPassword ? <BsEyeSlash size={20} className='absolute mr-2 cursor-pointer ' color='#DE1111' onClick={(e) => {
                      hidePass()
                      setShowPassword(!showPassword)
                    }} /> : <BsEye size={20} className='absolute mr-2 cursor-pointer ' color='#DE1111' onClick={() => {
                        showPass()
                      setShowPassword(!showPassword)
                    }}/>}
                    
                    
                    <input type="password" id='pass'
                      className="h-8 w-[400px] rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" autoComplete='on'
                      aria-label='PassWord' placeholder='Digite sua Senha' onChange={(e) => setPassWord(e.target.value)} onClick={() => { setError('') }} value={passWord} />
                  </div>

                  {error &&
                    <div className="bg-white/80 rounded-lg flex justify-center items-center mt-2 p-1">
                      <p className="text-vm  font-title font-extrabold">{error}</p>
                    </div>}
                </div>
                <button type='submit' className='absolute bottom-0 mb-1 font-title  border-red border-[1px] bg-vm rounded-lg w-[170px] text-white hover:bg-[#B80000]'>
                  Acessar
                </button>
              </form>
            </aside>

          </article>

        </section>)



      }
    </>
  );
}

export { Login };
