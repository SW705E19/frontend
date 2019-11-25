import React from 'react';
import { Card, Avatar, Grid, Typography, CardContent, Button, CardActions, CardMedia, Box, Divider} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

function RenderService(props) {
	const useStyles = makeStyles(theme => ({
		root: {
			padding: theme.spacing(3, 2),
		},
		media: {
			height: 0,
			paddingTop: '56.25%',
		},
		servicepicture:  {
			height: 350,
			width: 350,
		},
		avatar: {
			height: 140,
			width: 140,
		},
		item: {
			textAlign: 'center',
			width: '100%'
		},
		card: {
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between'
		},
	}));

	const { t } = useTranslation();
	const classes = useStyles();

	const random = 1 + (Math.random() * (200 - 1));
	const randomUrl = `https://api.adorable.io/avatars/140/${random}@adorable.png`;

	return (
		<>
			<Grid container className={classes.root} spacing={2}>
				<Grid className = {classes.item} item md={12}>
					<Card justify="center"  className={classes.card}>
						<CardMedia className={classes.media}
							image={randomUrl}>					
						</CardMedia>
					</Card>
				</Grid>
			
				<Grid className = {classes.item} item md={6}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="h5">
								{props.tutor.firstName} {props.tutor.lastName}
								<Divider orientation="horizontal" />
								<Box m={0.5} />
								<Grid container justify="center" alignItems="center">
									<Avatar className={classes.avatar} />
								</Grid>
							</Typography>						
							<Typography color="textPrimary">
								{props.tutorInfo.description}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								type="button"
								variant="contained"
								color="primary"
								fullWidth
								onClick={() => props.setRedirect()}
							>
								{t('gototutorpage')}
							</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid className = {classes.item} item md={6}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="h5">
								{props.service.name}
								<Divider orientation="horizontal" />
								<Box fontStyle="italic" >
									<Typography color="textPrimary" style={{fontSize: 12}}>
										{'Categories: ' + props.categories.map((category, index) =>  category.name + (index ? '.' : ', ')).join('')}
									</Typography>
								</Box>
								<Divider orientation="horizontal" />
								<Box m={0.5} />
								<Typography color="textPrimary">
									{props.service.description}
								</Typography>
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								type="button"
								variant="contained"
								color="primary"
								fullWidth
							>
								{t('contacttutor')}
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}
export default RenderService;
