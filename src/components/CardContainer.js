import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMetrics } from "../Features/states";
import Card from "./Card";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "urql";
import { actions } from "./../Features/otherReducers/valuesreducer";

const useStyles = makeStyles({
	root: {
		flexGrow: 6,
		display: "flex",
		flexWrap: "wrap",
	},
});

const query = `
query($input: [MeasurementQuery]){
  getMultipleMeasurements(input: $input){
    measurements{
      value,
      metric
      at
    }
  }
}
`;

const CardContainer = () => {
	const metrics = useSelector(getMetrics);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [input, setInput] = useState([]);

	let myDate = new Date();
	let timeStapNow = myDate.getTime(); //timeStamp now
	let myDateMinus30 = new Date(timeStapNow - 60000 * 30);
	let timeStamp30Ago = myDateMinus30.getTime(); //timeStamp 30 min ago

	const [result] = useQuery({
		query,
		variables: { input },
	});

	useEffect(() => {
		let auxArr = [];
		for (let metric of metrics.selectedMetrics) {
			auxArr.push({
				metricName: metric,
				after: timeStamp30Ago,
				before: timeStapNow,
			});
		}
		setInput(auxArr);
	}, [metrics.selectedMetrics]);

	useEffect(() => {
		if (result.data) {
			dispatch(
				actions.GetLastValues({
					lastValues: result.data.getMultipleMeasurements,
				})
			);
		}
	}, [result.data, dispatch]);

	return (
		<div className={classes.root}>
			{metrics.selectedMetrics.map((metric) => {
				return <Card key={metric} title={metric} content={0.0}></Card>;
			})}
		</div>
	);
};

export default CardContainer;
