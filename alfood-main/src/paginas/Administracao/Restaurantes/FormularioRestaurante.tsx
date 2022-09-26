import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"

const FormularioRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios.post('http://localhost:8000/api/v2/restaurantes/', {
            nome: nomeRestaurante
        })
            .then(() => {
                alert('Restaurante cadastrado com sucesso!')
            })
            .catch(error => console.log(error))
    }
    return (
        <form onSubmit={e => aoSubmitForm(e)}>
            <TextField 
                value={nomeRestaurante} 
                onChange={e => setNomeRestaurante(e.target.value)} 
                id="stardard-basic" 
                label="Nome do Restaurante" 
                variant="standard" 
            />

            <Button type="submit" variant="outlined">Outlined</Button>
        </form>
    )
}

export default FormularioRestaurante