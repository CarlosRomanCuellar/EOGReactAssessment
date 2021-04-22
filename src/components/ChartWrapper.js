import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
	Chart,
	ValueAxis,
	LineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { getLastValues } from "../Features/states";
import { getMetrics } from "../Features/states";

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
	const { selectedMetrics } = useSelector(getMetrics);
	const [dataForCharts, setDataForCharts] = useState([]);

	useEffect(() => {
		if (lastValues.getlastValues[0]) {
			let auxArr = [];
			for (
				let i = 0;
				i < lastValues.getlastValues[0].measurements.length;
				i++
			) {
				let auxObj = {};
				for (let j = 0; j < selectedMetrics.length; j++) {
					auxObj[selectedMetrics[j]] =
						lastValues.getlastValues[j].measurements[i].value;
					auxObj.at = lastValues.getlastValues[j].measurements[i].at;
				}
				auxArr.push(auxObj);
			}
			setDataForCharts(auxArr);
		} else {
			setDataForCharts([]);
		}
	}, [lastValues]);

	const { classes } = props;

	return (
		<Paper>
			<Chart data={dataForCharts} className={classes.chart}>
				<ValueAxis max={50} labelComponent={ValueLabel} />

				<LineSeries
					name="waterTemp"
					valueField="waterTemp"
					argumentField="at"
				/>
				<LineSeries name="oilTemp" valueField="oilTemp" argumentField="at" />
				<LineSeries
					name="tubingPressure"
					valueField="tubingPressure"
					argumentField="at"
				/>
				<LineSeries
					name="injValveOpen"
					valueField="injValveOpen"
					argumentField="at"
				/>
				<LineSeries
					name="flareTemp"
					valueField="flareTemp"
					argumentField="at"
				/>
				<LineSeries
					name="casingPressure"
					valueField="casingPressure"
					argumentField="at"
				/>
			</Chart>
		</Paper>
	);
};

export default withStyles(demoStyles, { name: "Demo" })(Demo);
