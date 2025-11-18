function PriceComparisonPanel({ prices }) {
  if (!prices || prices.length === 0) return null;

  const sortedPrices = [...prices].sort((a, b) => Number(a.price) - Number(b.price));
  const bestPrice = Number(sortedPrices[0]?.price);

  return (
    <section className="w-full max-w-md mt-6 px-2">
      <h3 className="text-lg font-semibold mb-5 ml-1">Comparar precios</h3>
      <div className="flex flex-col gap-3">
        {sortedPrices.map((stock, index) => {
          const isBest = Number(stock.price) === bestPrice;

          return (
            <div
              key={index}
              className="relative p-3 bg-white rounded-xl shadow hover:shadow-lg transition flex items-center justify-between gap-3"
            >
              {/* Contenido izquierdo */}
              <div className="flex items-center gap-3">
                {stock.logoUrl ? (
                  <img
                    src={stock.logoUrl}
                    alt={stock.storeName}
                    className="w-10 h-10 object-contain rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    {stock.storeName[0]}
                  </div>
                )}
                <span className="font-medium">{stock.storeName}</span>
              </div>

              {/* Contenido derecho */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{Number(stock.price).toFixed(2)}€</span>
                <a
                  href={stock.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-blue-600 transition"
                >
                  Ver
                </a>
              </div>

              {/* Badge "MEJOR PRECIO" */}
              {isBest && (
                <span className="absolute -top-3 left-2 bg-green-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-white">
                  🏆 Mejor Precio
                </span>
              )}

            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PriceComparisonPanel;
