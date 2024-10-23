import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/input"
import { useState, FormEvent  } from "react"
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth"

export function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent){
        e.preventDefault();

        if(email === '' || password === '' ){
            alert("Preencha todos os campos !")
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('Usuario logado com sucesso')
            navigate('/admin', {replace: true})
        })
        .catch((error)=>{
            alert(error)
        })
        
    }


    return(
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to={'/'}>
             <h1 className="mt-11 text-white mb-7 font-bold text-5xl">My
                <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
                </h1>
            </Link>

            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2">
                <Input
                placeholder="Digite seu email..." 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value) }
                />
                 <Input
                placeholder="**********" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value) }
                />

                <button
                 type="submit"
                 className="h-9 bg-blue-600 rounded text-lg font-medium text-white">
                    acessar
                </button>
            </form>
        </div>
    )
}