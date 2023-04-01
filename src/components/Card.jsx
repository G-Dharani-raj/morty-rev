import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ id, name, status, image }) => {
	const navigate = useNavigate();
	const indiPage = (id) => {
		navigate(`/${id}`);
	};
	return (
		<div onClick={() => indiPage(id)} className={styles.main_body}>
			<div className={styles.status_box}>
				<p className={styles[status]}>{status}</p>
			</div>
			<img src={image} className="card-image" alt={name} />
			<div className={styles.char_name}>
				<p>{name}</p>
			</div>
		</div>
	);
};

export default Card;
