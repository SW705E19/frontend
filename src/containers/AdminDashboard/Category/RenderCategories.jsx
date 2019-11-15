import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { List, TextField, ListItem, ListItemText, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { categoryService } from '../../../services/category/category.service';
import { withTranslation } from 'react-i18next';


const styles = () => ({
	root: {
		width: '100%',
		maxWidth: 360,
		left: '40%',
		position: 'absolute',
	},
	list: {
		//TODO make the size responsive
		maxHeight: 360,
		overflow: 'scroll',
	}
});

class RenderCategories extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			category: {
				name: '',
				description: ''
			},
			categories: []
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.submit = this.submit.bind(this);
	}

	componentDidMount() {
		categoryService.getAll().then(data => {
			this.setState({categories: data});
		});
	}

	handleOnChange(event) {
		let category = this.state.category;
		category[event.target.name] = event.target.value;
		this.setState({category: category});
	}

	submit() {
		categoryService.create(
			this.state.category).then(data => {
			const newCategories = this.state.categories.concat(data);
			this.setState({categories: newCategories});
		});
	}

	render() {

		const{classes, t} = this.props;

		return (
			<>
				<Grid className={classes.root}>
					<Grid item xs={12}>
						{renderRow(this.state.categories, classes)}
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="create-category-name"
							name="name"
							label= {t('categoryname')}
							className={classes.textField}
							margin="normal"
							fullWidth={true}
							onChange={this.handleOnChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="create-category-description"
							name="description"
							label={t('categorydescription')}
							className={classes.textField}
							margin="normal"
							fullWidth={true}
							onChange={this.handleOnChange}
						/>
					</Grid>
					<Grid id="button-grid" item xs={12}>
						<Button
							id="submit-button"
							variant="contained"
							color="primary"
							size="large"
							className={classes.button}
							startIcon={<SaveIcon />}
							fullWidth={true}
							onClick={this.submit}
						>
							{t('save')}
						</Button>
					</Grid>
				</Grid>
			</>
		);
	}
}


function renderRow(categories, classes) {
	return (
		<List className={classes.list}>
			{categories != null
				? categories.map(function(item) {
					return (
						<ListItem button key={item.id}>
							<ListItemText primary={item.name}
								secondary={item.description} />
						</ListItem>
					);
				})
				: null}
		</List>
	);
}


export default withTranslation()(withStyles(styles)(RenderCategories));