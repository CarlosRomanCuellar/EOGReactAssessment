import React, { useState, useEffect, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import {
	Chart,
	ValueAxis,
	LineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { getLastValues } from "../Features/states";

const demoStyles = () => ({
	chart: {
		paddingRight: "20px",
	},
	title: {
		whiteSpace: "pre",
	},
});

const ValueLabel = (props) => {
	const { text } = props;
	return <ValueAxis.Label {...props} text={`${text}`} />;
};

const Demo = (props) => {
	const lastValues = useSelector(getLastValues);
	const [data, setData] = useState([]);
	const pastValues = useRef([]);
	useEffect(() => {
		if (lastValues.getlastValues[0]) {
			pastValues.current = data;
			setData(lastValues.getlastValues[0].measurements);
		} else {
			setData([]);
			pastValues.current = [];
		}
	}, [lastValues ]);

	const { classes } = props;

	return (
		<Paper>
			<Chart data={data} className={classes.chart}>
				<ValueAxis max={500} labelComponent={ValueLabel} />

				<LineSeries valueField="value" argumentField="at" />
			</Chart>
		</Paper>
	);
};

export default withStyles(demoStyles, { name: "Demo" })(Demo);
