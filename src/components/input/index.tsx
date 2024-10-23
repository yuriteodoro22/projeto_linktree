import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{} //Aqui estamos passando que os dados que vamos receber no nosso componente input, são os dados padrões de input que o react
//espera receber, então se a propriedade for do tipo input ele aceitará no nosso componente

export function Input(props: InputProps){
    return(
        <input
        className="border-0 h-9 rounded-md outline-none px-2 mb-3"
        {...props} //Recebendo aqui qualquer propriedade que seja passada dentro do input usamos rest operator pois pode ser mais de uma propriedade
        />
    )
}