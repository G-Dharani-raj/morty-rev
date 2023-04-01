import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "./API";

const Character = () => {
	const { id } = useParams();
	const [details, setDetails] = useState([]);

	const getDetails = async () => {
		try {
			let res = await axios.get(`${API}${id}`);
			setDetails((prev) => [res.data]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDetails();
	}, []);
	if (!details.length) return <h1>Loading</h1>;
	return (
		<div>
			<img src={details[0].image} alt="" />
			<strong>{details[0].name}</strong>
			<p>{details[0].status}</p>
			<p>{details[0].species}</p>
			<p>{details[0].type}</p>
			<p>{details[0].gender}</p>
			<p>{details[0].origin.name}</p>
			<p>{details[0].location.name}</p>
		</div>
	);
};

export default Character;
