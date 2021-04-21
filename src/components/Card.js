import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "urql";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
	root: {
		minWidth: 250,
		maxWidth: 450,
		marginRight: "2rem",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

const query = `
query($metricName: String!){
  getLastKnownMeasurement(metricName:$metricName){
    metric,
    at,
    value,
    unit
  }
}
`;

export default function SimpleCard(props) {
	const classes = useStyles();
	let metricName = props.title;
	const dispatch = useDispatch();
	const prevVal = useRef("0");

	const [result, reexecuteQuery] = useQuery({
		query,
		variables: {
			metricName,
		},
	});
	const { fetching, data, error } = result;
	useEffect(() => {
		if (error) {
			console.log(error);
			return;
		}
		if (!data) return;
		prevVal.current = data.getLastKnownMeasurement.value;
		reexecuteQuery({ requestPolicy: "network-only" });
	}, [dispatch, data, error, reexecuteQuery]);

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant="h5" component="h2">
					{props.title}
				</Typography>
				<Typography variant="h3" className={classes.pos} color="textSecondary">
					{fetching ? prevVal.current : data.getLastKnownMeasurement.value}
				</Typography>
			</CardContent>
		</Card>
	);
}
