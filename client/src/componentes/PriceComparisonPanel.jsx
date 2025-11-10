function PriceComparisonPanel({ prices }) {
  if (!prices || prices.length === 0) return null;

  return (
    <section className="w-full max-w-md mt-6 px-2">
      <h3 className="text-lg font-semibold mb-2 ml-1">Comparar precios</h3>
      <div className="flex flex-col gap-3">
        {prices.map((store, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              {store.logoUrl ? (
                <img src={store.logoUrl} alt={store.name} className="w-10 h-10 object-contain" />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  {store.name[0]}
                </div>
              )}
              <span className="font-medium">{store.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{store.price}€</span>
              <a
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-blue-600 transition"
              >
                Ver
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PriceComparisonPanel;
