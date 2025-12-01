function PriceComparisonPanel({ prices }) {
  if (!prices || prices.length === 0) return null;

  const sortedPrices = [...prices].sort((a, b) => Number(a.price) - Number(b.price));
  const bestPrice = Number(sortedPrices[0]?.price);

  return (
    <section className="w-full max-w-md mt-6 px-2">
      <h3 className="text-lg font-semibold mb-5 ml-1 text-[#66c0f4]">Comparar precios</h3>
      <div className="flex flex-col gap-3">
        {sortedPrices.map((stock, index) => {
          const isBest = Number(stock.price) === bestPrice;

          return (
            <div
              key={index}
              className="relative p-3 bg-[#1b2838] rounded-xl shadow-[0_0_15px_rgba(102,192,244,0.3)] hover:shadow-[0_0_25px_rgba(102,192,244,0.5)] transition flex items-center justify-between gap-3"
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
                  <div className="w-10 h-10 bg-[#2a3b52] rounded-full flex items-center justify-center text-[#66c0f4]">
                    {stock.storeName[0]}
                  </div>
                )}
                <span className="font-medium text-[#c7d5e0]">{stock.storeName}</span>
              </div>

              {/* Contenido derecho */}
              <div className="flex items-center gap-2">
                <span className={`text-lg font-semibold ${isBest ? 'text-green-400' : 'text-[#c7d5e0]'}`}>{Number(stock.price).toFixed(2)}€</span>
                <a
                  href={stock.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#66c0f4] text-[#0b0f15] py-1 px-3 rounded-lg text-sm hover:bg-[#559acb] transition"
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