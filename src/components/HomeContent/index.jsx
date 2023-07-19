import React, { useEffect, useState } from 'react';
import {
    Grid,
    Paper,
    CircularProgress
} from '@mui/material';
import { getCourses } from '../../api/courseAPI';
import {getCompanies} from '../../api/companyAPI';
import {getTeachers} from '../../api/teacherAPI';
import {getCommunications} from '../../api/pressAPI';
import BlockResource from '../BlockRessource';

const HomeContent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState(null);
    const [teachers, setTeachers] = useState(null);
    const [companies, setCompanies] = useState(null);
    const [pressReleases, setPressReleases] = useState(null);

    const fetchData = async () => {
        const resCommunications = await getCommunications();
        const resTeachers = await getTeachers();
        const resCompanies = await getCompanies();
        const resCourses = await getCourses();
        const companies_data = resCompanies.data;
        const courses_data = resCourses.data;
        const teachers_data = resTeachers.data;
        const communications_data = resCommunications.data;
        return {
            companies: companies_data,
            courses: courses_data,
            teachers: teachers_data,
            press: communications_data,
        };
    };

    useEffect(() => {
        const get_data = async () => {
            const dataFromServer = await fetchData();
            setCourses(dataFromServer.courses.length);
            setPressReleases(dataFromServer.press.length);
            setTeachers(dataFromServer.teachers.length);
            setCompanies(dataFromServer.companies.length);

            setIsLoading(false);
        }
    
        get_data();
    }, [])

    return (
        <>
            <Grid container spacing={2} style={{marginTop: '10px'}}>
                {/* Recent Deposits */}
                <Grid item xs={12} md={6} >
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
                        description="Tous les communiqués du departement, pour toutes les filieres et tous les niveaux"
                        qty={
                            isLoading ? <CircularProgress /> : pressReleases
                        }
                        link="communiques"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} >
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
                        description="Tous les cours du département, pour toutes les filières et tous les niveaux"
                        qty={
                            isLoading ? <CircularProgress /> : courses
                        }
                        link="cours"
                        />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{marginTop: '10px'}}>
                {/* <Grid item xs={12} md={4} >
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
                        link="lexique"
                        />
                </Paper>
                </Grid> */}
                <Grid item xs={12} md={6} >
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
                            description="Plusieurs conatcts d'entreprises repertoriées pour faciliter vos demandes d'emploi et de stage"
                            qty={
                                isLoading ? <CircularProgress /> : companies
                            }
                            link="entreprises"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} >
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
                        description="Une équipe d'enseignants et chercheurs prets à vous aider"
                        qty={
                            isLoading ? <CircularProgress /> : teachers
                        }
                        link="enseignants"
                    />
                </Paper>
                </Grid>              
            </Grid>
        </>
    );
}

export default HomeContent