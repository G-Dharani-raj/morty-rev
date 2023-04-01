import React from "react";
import { Route, Routes } from "react-router-dom";
import Character from "../Character";
import MainPage from "../MainPage";

const AllRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/:id" element={<Character />} />
			</Routes>
		</>
	);
};

export default AllRoutes;
