// src/componentes/Table.jsx
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function Table({ columns, data }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 });

  const table = useReactTable({
    columns,
    data,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-300 shadow-sm">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 text-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border px-4 py-3 text-left font-semibold text-sm select-none whitespace-nowrap"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <span className="text-xs opacity-60">
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === "desc"
                          ? "🔽"
                          : "🔼"
                        : ""}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="
                    border px-4 py-2 text-sm
                    max-w-[250px] truncate 
                    hover:whitespace-normal hover:bg-white
                    transition
                  "
                  title={typeof cell.getValue() === "string" ? cell.getValue() : ""}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINACIÓN */}
      <div className="flex justify-between items-center p-3 bg-gray-50 border-t">
        <div>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded mr-2 disabled:opacity-40 hover:bg-gray-200 transition"
          >
            Anterior
          </button>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-200 transition"
          >
            Siguiente
          </button>
        </div>

        <div className="text-sm">
          Página <b>{table.getState().pagination.pageIndex + 1}</b> de <b>{table.getPageCount()}</b>
        </div>

        <div className="text-sm">
          Mostrar{" "}
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="border px-2 py-1 rounded"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>{" "}
          filas
        </div>
      </div>
    </div>
  );
}
