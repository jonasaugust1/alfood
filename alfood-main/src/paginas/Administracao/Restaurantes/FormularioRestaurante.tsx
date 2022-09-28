import {Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
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

            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
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

        <Box>
            <Container maxWidth='lg' sx={{ mt: 10 }}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                        <Typography component='h1' variant='h6'>Formulario de Restaurantes</Typography>
                        <Box component='form' sx={{ width: '100%' }} onSubmit={(e: FormEvent<HTMLFormElement>) => aoSubmitForm(e)}>

                            <TextField
                                sx={{ marginTop: 2 }}
                                value={nomeRestaurante}
                                onChange={e => setNomeRestaurante(e.target.value)}
                                id="stardard-basic"
                                label="Nome do Restaurante"
                                variant="standard"
                                fullWidth
                                required
                            />

                            <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}

export default FormularioRestaurante