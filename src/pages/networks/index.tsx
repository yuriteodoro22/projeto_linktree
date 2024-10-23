import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { useState, FormEvent, useEffect } from "react"
import { db } from '../../services/firebaseConnection'
import { 
    setDoc, 
    doc, 
    getDoc 
} from "firebase/firestore"

export function Networks(){
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');
    const [whatsapp, setWhatsapp] = useState('');


    useEffect(() =>{
        function LoadLinks(){
            const docRef = doc(db,'social', 'link')

            getDoc(docRef)
            .then((snapshot)=>{
                if(snapshot.data() !== undefined){
                    setFacebook(snapshot.data()?.facebook)
                    setInstagram(snapshot.data()?.instagram)
                    setWhatsapp(snapshot.data()?.whatsapp)
                }
            })
        }

        LoadLinks();
    }, [])

    function handleRegister(e: FormEvent){
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube,
            whatsapp: whatsapp
        })
        .then(() => {
            alert("Cadastrado com sucesso")
        })
        .catch((error) => {
            console.log(error)
        })

    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>
            <h1 className=" text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

            <form onSubmit={handleRegister} className="flex flex-col max-w-xl w-full ">
                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input
                type="url"
                placeholder="Digite a url do facebook..."
                value={facebook}
                onChange={(e)=>setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do instagram</label>
                <Input
                type="url"
                placeholder="Digite a url do instagram..."
                value={instagram}
                onChange={(e)=>setInstagram(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do youtube</label>
                <Input
                type="url"
                placeholder="Digite a url do youtube..."
                value={youtube}
                onChange={(e)=>setYoutube(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do whatsapp</label>
                <Input
                type="url"
                placeholder="Digite a url do whatsapp..."
                value={whatsapp}
                onChange={(e)=>setWhatsapp(e.target.value)}
                />

                <button className=" text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium">
                    Salvar Links
                </button>

            </form>
        </div>
    )
}