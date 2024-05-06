export default function MovieItem(img, title, category) {
  return (
    <div className="movie-item">
      <div className="movie-item__img"></div>
      <div className="movie-item__title">{title}</div>
      <div className="movie-item__category">{category}</div>
    </div>
  );
}
