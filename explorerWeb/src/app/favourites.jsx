import Header from '../componentesP/Header';
import ListaPost from '../componentesP/ListaPost';

export default function FavouritesPage({ favorites, onRemoveFavorite, onNavigate }) {
	return (
		<main className="page-shell">
			<Header
				title="Favoritos"
				subtitle="Tus recetas guardadas"
				rightContent={
					<button type="button" className="primary-button" onClick={() => onNavigate('/')}>
						Volver al inicio
					</button>
				}
			/>
			<section className="content-shell favourites-content">
				<ListaPost
					data={favorites}
					favoriteIds={favorites.map((meal) => meal.id)}
					onToggleFavorite={onRemoveFavorite}
					emptyMessage="Todavía no guardaste recetas."
				/>
			</section>
		</main>
	);
}
