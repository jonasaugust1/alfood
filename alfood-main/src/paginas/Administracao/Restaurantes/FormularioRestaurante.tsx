import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            axios.get(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
                .catch(error => console.log(error))
        }
    }, [parametros.id])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (parametros.id) {

            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`,{
                nome: nomeRestaurante
            })
                .then(() => alert('Restaurante atualizado com sucesso!'))
                .catch(error => console.log(error))

        } else {
            axios.post('http://localhost:8000/api/v2/restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante cadastrado com sucesso!')
                })
                .catch(error => console.log(error))
        }


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

            <Button type="submit" variant="outlined">Salvar</Button>
        </form>
    )
}

export default FormularioRestaurante