import { AppBar, Box, Button, Container, Link, Paper, Toolbar, Typography } from "@mui/material"
import { Link as LinkA, Outlet } from 'react-router-dom'

const BaseAdmin = () => {

    return (
        <>
            <AppBar>
                <Container maxWidth='xl'>
                    <Toolbar>
                        <Typography variant='h6'>
                            Administração
                        </Typography>

                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <Link component={LinkA} to='/admin/restaurantes'>
                                <Button sx={{ my: 2, color: 'white' }}>Restaurantes</Button>
                            </Link>
                            <Link component={LinkA} to='/admin/restaurantes/novo'>
                                <Button sx={{ my: 2, color: 'white' }}>Novo Restaurante</Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth='lg' sx={{ mt: 10 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet/>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default BaseAdmin