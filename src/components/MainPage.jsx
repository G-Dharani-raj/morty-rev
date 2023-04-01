import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./API";
import Card from "./Card";
import styles from "./Mainpage.module.css";

const MainPage = () => {
	const [search, setSearch] = useState("");
	const [searchText, setSearchText] = useState("");
	const [page, setPage] = useState(1);
	const [gender, setGender] = useState(false);
	const [status, setStatus] = useState(false);
	const [chardata, setCharData] = useState([]);
	const [totalPages, setTotalPages] = useState(42);

	const getData = async (current, alive, gen, query) => {
		try {
			let res = await axios.get(
				`${API}?page=${current || 1}${alive ? `&status=${alive}` : ""}${
					gen ? `&gender=${gen}` : ""
				}${query ? `&name=${query}` : ""}`
			);
			console.log(res.data);
			setTotalPages(res.data.info.pages);
			let tmp = [];
			for (let i = 0; i < 12; i++) {
				if (!res.data.results[i]) break;
				tmp.push(res.data.results[i]);
			}
			setCharData([...tmp]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClick = () => {
		setSearchText(search);
	};
	const handlePageChange = (val) => {
		setPage((prev) => prev + val);
	};

	useEffect(() => {
		getData(page, status, gender, searchText);
		console.log(chardata);
	}, [page, status, gender, searchText]);

	if (!chardata) return <h1>No results found</h1>;
	return (
		<div>
			<div id="search-container">
				<input
					type="text"
					placeholder="Search..."
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button id="search-btn" onClick={handleClick}>
					Search
				</button>
			</div>
			<div>
				<select
					id="status-filter"
					onChange={(e) => setStatus(e.target.value)}
				>
					<option value="" selected disabled>
						Select
					</option>
					<option value="Alive">Alive</option>
					<option value="Dead">Dead</option>
					<option value="Unknown">Unknown</option>
				</select>
				<select
					id="gender-filter"
					onChange={(e) => setGender(e.target.value)}
				>
					<option value="" selected disabled>
						Select
					</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
				</select>
			</div>
			<div id="card-container" className={styles.card_container}>
				{chardata.map((char) => (
					<Card key={char.id} {...char} />
				))}
			</div>
			<div className="paginations-container">
				<button
					id="prev-btn"
					disabled={page === 1}
					onClick={() => handlePageChange(-1)}
				>
					Prev
				</button>
				<button id="current-btn">{page}</button>
				<button
					id="next-btn"
					disabled={page === totalPages}
					onClick={() => handlePageChange(1)}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default MainPage;
