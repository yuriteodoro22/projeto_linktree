import { ReactNode } from "react"; // importando o icone pra tipar ele e dizer que o nosso social irá receber um filho que será um icone

interface SocialProps{ //tipando as propriedades que iremos receber de outra pagina
    url: string;
    children: ReactNode;
}

export function Social({url, children}: SocialProps){
    return(
        <a
        href={url}
        rel="noopenner noreferrer" //passando que é uma url externa
        target="_blank" // dizendo para abrir em uma nova aba
        >
           {children}
        </a>
    )
}