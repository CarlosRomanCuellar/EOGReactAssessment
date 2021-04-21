import React from "react";
import MySelect from "./mySelect";
import { makeStyles } from "@material-ui/core/styles";
import { Provider, createClient } from "urql";

const useStyles = makeStyles({
	select: {
		flexGrow: 4,
	},
});

const client = createClient({
	url: "https://react.eogresources.com/graphql",
});

const SelectWithChips = () => {
	const classes = useStyles();

	return (
		<div className={classes.select}>
			<Provider value={client}>
				<MySelect></MySelect>
			</Provider>
		</div>
	);
};

export default SelectWithChips;
