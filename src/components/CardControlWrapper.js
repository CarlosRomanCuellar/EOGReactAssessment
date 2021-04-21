import React from "react";
import CardContainer from "./CardContainer";
import SelectWithChips from "./SelectWithChips";
import { makeStyles } from "@material-ui/core/styles";
import { Provider, createClient } from "urql";

const useStyles = makeStyles({
	root: {
		display: "flex",
		width: "100%",
	},
	notes: {
		flexGrow: 6,
	},
	select: {
		flexGrow: 4,
	},
});

const client = createClient({
	url: "https://react.eogresources.com/graphql",
});

const CardControllWrapper = () => {
	const classes = useStyles();

	return (
		<Provider value={client}>
			<div className={classes.root}>
				<CardContainer className={classes.notes}></CardContainer>
				<SelectWithChips className={classes.select}></SelectWithChips>
			</div>
		</Provider>
	);
};

export default CardControllWrapper;
