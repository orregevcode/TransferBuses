import React from 'react';
import {Grid, Typography, ThemeProvider, createTheme, makeStyles} from '@material-ui/core';
import i18n from "../../../trip_search/domain/entites/utils/language/i18n";
import SocialButtons from "../../../../general/MUI/SocialButtons/SocialButtons";

const useStyles = makeStyles((theme) => ({
    text: {
        fontSize: '1.5rem', // Размер шрифта для больших экранов
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem', // Размер шрифта для маленьких экранов
        },
    },
}));

const Contacts = () => {
    const classes = useStyles();
    return (
        <div>
            {/*<ThemeProvider theme={theme}>*/}
            <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{minHeight: "80vh", padding: "0"}}
            >
                <Grid item xs={12}>
                    {/*<Typography variant="h5">*/}
                    <Typography className={classes.text} variant="h5">
                        {i18n.t("Contacts")}:
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.text} variant="h5" display="block" gutterBottom>
                        {i18n.t("Name")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.text} variant="h5" display="block" gutterBottom>
                        {i18n.t("Founder and Ceo")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.text} variant="h5" display="block" gutterBottom>
                        +972545779239
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.text} variant="h5" display="block" gutterBottom>
                        <a href="mailto:roman.mantelmakher@gmail.com" rel="noreferrer"
                           target='_blank'>roman.mantelmakher@gmail.com</a>
                    </Typography>
                </Grid>
                {/* <h3>
              You can chat or call me
        </h3>
        <h3>
              Click one of the buttons below
            </h3> */}
            </Grid>
            <SocialButtons/>
            {/*</ThemeProvider>*/}
        </div>
    );
};
export default Contacts;
