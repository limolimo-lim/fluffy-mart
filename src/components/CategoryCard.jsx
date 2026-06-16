function CategoryCard({ title, icon }) {
  return (
    <div className="category-card text-center shadow-sm">
      <div className="category-icon">{icon}</div>
      <h6 className="mt-2">{title}</h6>
    </div>
  );
}

export default CategoryCard;