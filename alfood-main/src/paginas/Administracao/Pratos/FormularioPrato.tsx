import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITag from "../../../interfaces/ITag"

const FormularioPrato = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            axios.get(`http://localhost:8000/api/v2/pratos/${parametros.id}/`)
                .then(resposta => setNomePrato(resposta.data.nome))
                .catch(error => console.log(error))
        }
    }, [parametros.id])

    const [nomePrato, setNomePrato] = useState('')

    const [descricao, setDescricao] = useState('')

    const [tag, setTag] = useState('')

    const [tags, setTags] = useState<ITag[]>([])

    const [restaurante, setRestaurante] = useState('')

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    const [imagem, setImagem] = useState<File | null>(null)

    useEffect(() => {
        axios.get<{tags: ITag[]}>('http://localhost:8000/api/v2/tags/')
            .then(response => setTags(response.data.tags))
            .catch(error => console.log(error))

        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
            .then(response => setRestaurantes(response.data))
            .catch(error => console.log(error))
    }, [])

    const selecionaImagem = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.files?.length) {
            setImagem(e.target.files[0])
        } else {
            setImagem(null)
        }
    }

    const aoSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (parametros.id) {

            axios.put(`http://localhost:8000/api/v2/pratos/${parametros.id}/`, {
                nome: nomePrato,
                descricao,
            })
                .then(() => alert('Prato atualizado com sucesso!'))
                .catch(error => console.log(error))

        } else {
            axios.post('http://localhost:8000/api/v2/pratos/', {
                nome: nomePrato,
                descricao
            })
                .then(() => {
                    alert('Prato cadastrado com sucesso!')
                })
                .catch(error => console.log(error))
        }


    }
    return (

        <Box>
            <Container maxWidth='lg' sx={{ mt: 10 }}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                        <Typography component='h1' variant='h6'>Formulario de Pratos</Typography>
                        <Box component='form' sx={{ width: '100%' }} onSubmit={(e: FormEvent<HTMLFormElement>) => aoSubmitForm(e)}>

                            <TextField
                                sx={{ marginTop: 2 }}
                                value={nomePrato}
                                onChange={e => setNomePrato(e.target.value)}
                                id="stardard-basic"
                                label="Nome do Restaurante"
                                variant="standard"
                                fullWidth
                                margin="dense"
                                required
                            />

                            <TextField
                                sx={{ marginTop: 2 }}
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                                id="stardard-basic"
                                label="Nome do Restaurante"
                                variant="standard"
                                fullWidth
                                required
                            />

                            <FormControl margin="dense" fullWidth>
                                <InputLabel id="select-tag">Tag</InputLabel>

                                <Select labelId="select-tag" value={tag} onChange={e => setTag(e.target.value)}>
                                    {tags.map(tag => (
                                        <MenuItem key={tag.id} value={tag.id}>
                                            {tag.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl margin="dense" fullWidth>
                                <InputLabel id="select-tag">Restaurante</InputLabel>

                                <Select labelId="select-tag" value={restaurante} onChange={e => setRestaurante(e.target.value)}>
                                    {restaurantes.map(restaurante => (
                                        <MenuItem key={restaurante.id} value={restaurante.id}>
                                            {restaurante.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <input type='file' onChange={selecionaImagem} />

                            <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}

export default FormularioPrato