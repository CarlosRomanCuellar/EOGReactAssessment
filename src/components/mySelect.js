import React, { useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "urql";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import { actions } from "./../Features/Metrix/reducer";

import { getMetrics } from "../Features/states";

const query = `
query{
    getMetrics
  }
`;

function MySelect() {
	const dispatch = useDispatch();
	const metrics = useSelector(getMetrics);

	const [result] = useQuery({
		query,
	});
	const { data, error } = result;
	const handleChange = (event) => {
		dispatch(actions.selectedMetrics({ selectedMetrics: event.target.value }));
	};

	const handleDelete = (event) => {
		const chip = event.target.closest("div");
		const span = chip.childNodes[0];
		const remove = span.innerText;

		dispatch(actions.deleteSelected({ deleteSelected: remove }));
	};
	useEffect(() => {
		if (error) {
			console.log(error);
			dispatch(actions.metricsApiErrorReceived({ error: error.message }));
			return;
		}
		if (!data) return;

		dispatch(actions.GetMetrics(data));
	}, [dispatch, data, error]);

	return (
		<FormControl style={{ width: "100%" }}>
			<InputLabel>Select chart</InputLabel>
			<Select
				multiple
				value={metrics.selectedMetrics}
				onChange={handleChange}
				input={<Input id="select-multiple-chip" />}
				renderValue={(selected) => (
					<div style={{ display: "flex", flexWrap: "wrap" }}>
						{selected.map((value) => (
							<Chip
								key={value}
								label={value}
								onDelete={handleDelete}
								color="primary"
							/>
						))}
					</div>
				)}
			>
				{metrics.getMetrics.map((metric) => {
					return (
						<MenuItem key={metric} value={metric}>
							{metric}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
}

export default MySelect;
