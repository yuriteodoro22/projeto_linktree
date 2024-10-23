import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { useState, FormEvent, useEffect } from "react"
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import { 
    addDoc, //Adicionar um novo documento dentro de uma coleção
    collection, //acessa e cria uma collection
    onSnapshot, // Essa propriedade fica monitorando o banco de dados em real time, caso aconteça algo novo podemos pegar na mesma hora 
    query, //Serve para fazer uma busca ordenada, onde ordenamos as propriedades que vamos buscar do jeito que quisermos
    orderBy, 
    doc, 
    deleteDoc } from "firebase/firestore";


    interface LinkProps{
        id: string;
        name: string;
        url: string;
        bg: string;
        color: string;
    }

export function Admin(){
    const [nameInput, setNameInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [textColorInput, setTextColorInput] = useState("#f1f1f1");
    const [backgroundColorInput, setBackgroundColorInput] = useState('#121212');
    const [links , setLinks] = useState<LinkProps[]>([]);

    useEffect(()=> {
        const linksRef = collection(db, 'links') //criando uma variavel que acessa a colection links que criamos
        const queryRef = query(linksRef, orderBy("created", "asc"))//Query para fazer uma busca na collection links do banco de dados, e o orderby para ordernar os dados que vamos receber
        // baseado na propriedade created que é a data de criação, e apos isso colocamos ''asc'' que significa ascendente , então vai ser ordenar ascendentemente

        const unsub = onSnapshot(queryRef, (snapshot) => { //buscando os itens ordenados em tempo real utilizando o onSnapShot e o onSnapShot recebe uma função anonima que retorna os itens
            //buscados e com isso conseguimos acessar todos os  documentos dessa coleção e suas respectivas propreidades

            let lista = [] as LinkProps[]; //Como estamos usando typescript , ele pede a tipagem dos dados que nossa array de objetos vai receber

            snapshot.forEach((doc) =>{ //Percorrendo os documentos da nossa collection e adicionando as propriedades dentro da nossa variavel lista que é um array
                lista.push({
                 id: doc.id,
                 name: doc.data().name, //Temos que adicionar o .data pois são os valores dentro do documento, pois o snap retorna o documento e dentro uma propriedade data que contem os valores
                 //desse documento
                 url: doc.data().url,
                 bg: doc.data().bg,
                 color: doc.data().color
                })
            })

            setLinks(lista)
        })

        return () => { // esse return com função anonima é chamado de amount, ele é chamado toda vez que você sai da tela/desmonta o componente, ele é muito utilizado para parar funções
            //que ficam executando que no caso será a unsub
            unsub();
        }
    }, [])

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if(nameInput === '' || urlInput === ''){
            alert('Preencha todos os campos')
            return;
        }

        addDoc(collection(db, 'links'), { //Adicionando uma documento a uma nova coleção, primeiro criando nossa coleção links, e depois criando o documento dentro dela que receberá as propriedades
            //do objeto
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date() //Adicionando a data que foi criado o documento
        })
        .then(()=>{
            setNameInput('');
            setUrlInput('');
            alert('Cadastrado com sucesso')
           
        })
        .catch((error)=>{
            alert('Erro ao cadastrar no banco' + error)
        })

    }

     async function handleDeleteLink(id: string){
        const docRef = doc(db, 'links', id)
        
        await deleteDoc(docRef); //Utilizando o await para esperar a resposta do delete para continuar o codigo
    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
                <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                    <Input
                    placeholder="digite o nome do link..."
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    />       

                <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
                    <Input
                    type="url"
                    placeholder="digite a url..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    />       

                    <section className="flex my-4 gap-5">
                        <div className="flex gap-2">
                            <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
                            <input
                            type="color"
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}/>
                        </div>

                        <div className="flex gap-2">
                            <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
                            <input
                            type="color"
                            value={backgroundColorInput}
                            onChange={(e) => setBackgroundColorInput(e.target.value)}/>
                        </div>
                    </section>

                   {nameInput !== '' && (
                     <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                         <label className="text-white font-medium mt-2 mb-3">Veja como está ficando</label>
                         <article 
                          className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                          style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput}}>
                            <p
                            className="font-medium"
                            style={{color: textColorInput}}>{nameInput}</p>                             
                         </article>
                    </div>
                   )}

                    <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
                        Cadastrar
                    </button>
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

         {links.map((link) => (
               <article key={link.id}
               className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none "
               style={{backgroundColor: link.bg, color: link.color}}
               >
                   <p>{link.name}</p>
                   <div>
                       <button 
                       onClick={() => handleDeleteLink(link.id)}
                       className="border border-dashed p-1 rounded"
                       >
                           <FiTrash size={18} color="#FFF"/>
                       </button>
                   </div>
               </article>
         ))}
        </div>
    )
}