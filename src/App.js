import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_FEATURE_API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.REACT_APP_FEATURE_API_KEY}&query=`;

function App() {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		getMovies(FEATURED_API);
	}, []);

	const getMovies = (API) => {
		fetch(API)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setMovies(data.results);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (searchTerm) {
			getMovies(SEARCH_API + searchTerm);
			setSearchTerm("");
		}
	};

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<>
			<header>
				<form onSubmit={handleSubmit}>
					<input
						type="search"
						placeholder="Search..."
						className="search"
						value={searchTerm}
						onChange={handleChange}
					/>
				</form>
			</header>
			<div className="movie-container">
				{movies.length > 0 &&
					movies.map((movie) => <Movie key={movie.id} {...movie} />)}
			</div>
		</>
	);
}

export default App;
