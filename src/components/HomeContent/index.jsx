import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import BlockResource from '../BlockRessource';

const HomeContent = () => {
    return (
        <>
            <Grid container spacing={2} style={{marginTop: '10px'}}>
                {/* Recent Deposits */}
                <Grid item xs={12} md={7} >
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                    >
                    <BlockResource
                        title="Communiques"
                        description="Tous les cours du departement, pour toutes les filieres et tous les niveaux"
                        qty={45}
                    />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5} >
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                    >
                    <BlockResource
                        title="Cours"
                        description="Tous les cours du departement, pour toutes les filieres et tous les niveaux"
                        qty={45}
                    />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{marginTop: '10px'}}>
                <Grid item xs={12} md={4} >
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    }}
                >
                    <BlockResource
                    title="Lexique"
                    description="Un lexique riche avec toutes les expresions et mots de l'actualite tech"
                    qty={124}
                    />
                </Paper>
                </Grid>
                <Grid item xs={12} md={4} >
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    }}
                >
                    <BlockResource
                    title="Entreprises"
                    description="Plusieurs conatcts d'entreprises repertoriees pour faciliter vos demandes d'emploi et de stage"
                    qty={45}
                    />
                </Paper>
                </Grid>
                <Grid item xs={12} md={4} >
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    }}
                >
                    <BlockResource
                    title="Enseignants"
                    description="Une equipe d'enseignants et chercheurs prets a vous aider"
                    qty={23}
                    />
                </Paper>
                </Grid>              
            </Grid>
        </>
    );
}

export default HomeContent