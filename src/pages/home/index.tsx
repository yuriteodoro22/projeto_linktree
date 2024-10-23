import { Social } from "../../components/Social"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp,FaUser } from "react-icons/fa"
import {db} from '../../services/firebaseConnection'
import { 
    collection, 
    orderBy,
    query, 
    getDocs,
    getDoc,
    doc, 
     } from "firebase/firestore";

     interface LinkProps{
        id: string;
        name: string;
        url: string;
        bg: string;
        color: string;
    }

    interface SocialLinksProps{
        facebook: string;
        whatsapp: string;
        youtube: string;
        instagram: string;
    }

export function Home(){
    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();


    /*BUSCANDO LINKS NO BANCO DE DADOS*/
    useEffect(() => {
        function LoadLinks(){
            const linksRef = collection(db, 'links')
            const queryRef = query(linksRef, orderBy("created", 'asc'))

            getDocs(queryRef)
            .then((snapshot) =>{
                let lista = [] as LinkProps[];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        bg: doc.data().bg,
                        color: doc.data().color
                    })
                })

                setLinks(lista)
            })
        }

        LoadLinks();
    }, [])


/*BUSCANDO SOCIAL LINKS NO BANCO DE DADOS*/
    useEffect(() => {
     function loadSocialLinks(){
        const docRef = doc(db, 'social' ,'link')

        getDoc(docRef)
        .then((snapshot) => {
            if(snapshot.data() !== undefined){
                setSocialLinks({
                facebook: snapshot.data()?.facebook,
                whatsapp: snapshot.data()?.whatsapp,
                instagram: snapshot.data()?.instagram,
                youtube: snapshot.data()?.youtube,
            })
            }   
        })
     }

     loadSocialLinks();
    }, [])


    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <div className="w-full flex flex-row justify-end">
                <Link className=" flex gap-3 px-5" to={'/login'}>
                   <p className=" text-white">Login</p>
                </Link>
            </div>
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Larissa Fer Make</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links👇</span>


            <main className="flex flex-col w-11/12 max-w-xl text-center">
               
               {links.map((Link) => (
                 <section
                 key={Link.id} 
                 style={{background: Link.bg, color: Link.color }}
                 className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 duration-300  cursor-pointer">
                 <a href={Link.url} target="_blank" className="text-base md:text-lg">
                     <p>
                         {Link.name}
                     </p>
                 </a>
             </section>
               ))}

               {socialLinks && Object.keys(socialLinks).length > 0 && ( 
                
                <footer className="flex justify-center gap-3 my-4">
                    <Social url={socialLinks?.facebook}>
                        <FaFacebook size={35} color="#FFF"/>
                    </Social>

                    <Social url={socialLinks?.instagram}>
                        <FaInstagram size={35} color="#FFF"/>
                    </Social>

                    <Social url={socialLinks?.whatsapp}>
                        <FaWhatsapp size={35} color="#FFF"/>
                    </Social>
                </footer>
               )}
            </main>
        </div>
    )
}