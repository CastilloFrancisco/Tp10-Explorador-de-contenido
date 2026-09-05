import { useEffect, useMemo, useState } from 'react';
import Header from '../componentesP/Header';
import ListaPost from '../componentesP/ListaPost';
import SearchBar from '../componentesP/SearchBar';

const DEFAULT_QUERY = 'chicken';

function normalizeMeal(item) {
	return {
		id: item.idMeal ?? Math.random().toString(),
		name: item.strMeal ?? 'Receta sin título',
		image: item.strMealThumb,
		category: item.strCategory,
		area: item.strArea,
	};
}

export default function HomePage({ favorites, onToggleFavorite, onNavigate }) {
	const [meals, setMeals] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const query = searchText.trim() || DEFAULT_QUERY;
		const timer = setTimeout(async () => {
			setLoading(true);
			setError('');
			try {
				const response = await fetch(
					`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`,
				);
				if (!response.ok) throw new Error('Request failed');
				const data = await response.json();
				setMeals((data.meals ?? []).map(normalizeMeal));
			} catch {
				setMeals([]);
				setError('No fue posible obtener la información.');
			} finally {
				setLoading(false);
			}
		}, searchText ? 300 : 0);

		return () => clearTimeout(timer);
	}, [searchText]);

	const filteredMeals = useMemo(() => {
		const text = searchText.trim().toLowerCase();
		return meals.filter((meal) => {
			const matchesText =
				!text ||
				meal.name.toLowerCase().includes(text) ||
				(meal.area ?? '').toLowerCase().includes(text);
			return matchesText;
		});
	}, [meals, searchText]);

	const handleToggleFavorite = (mealId) => {
		const meal = meals.find((item) => String(item.id) === String(mealId));
		if (meal) onToggleFavorite(meal);
	};

	return (
		<main className="page-shell">
			<Header
				title="Explorador"
				subtitle="Recetas del mundo"
				rightContent={
					<div className="header-actions">

						<button type="button" className="primary-button" onClick={() => onNavigate('/favourites')}>
							Favoritos 
						</button>
					</div>
				}
			/>
			<section className="content-shell">
				<SearchBar value={searchText} onChangeText={setSearchText} />
				{loading ? (
					<div className="status-container"><p>Cargando información...</p></div>
				) : error ? (
					<div className="status-container error"><p>{error}</p></div>
				) : (
					<ListaPost
						data={filteredMeals}
						favoriteIds={favorites.map((favorite) => favorite.id)}
						onToggleFavorite={handleToggleFavorite}
					/>
				)}
			</section>
		</main>
	);
}
