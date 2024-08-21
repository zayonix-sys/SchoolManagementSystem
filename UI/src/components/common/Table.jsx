import React, { useState, useMemo } from "react";
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditModal from './EditModal';
import ConfirmationModal from "./ConfirmationModal";

const DataTable = ({ title, data = [], columns, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleUpdate = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };

  const handleUpdateSubmit = (updatedData) => {
    onUpdate(updatedData);
    handleCloseModal();
  };


  // Define the action column with edit and delete buttons
  const actionColumn = useMemo(() => ({
    Header: "Actions",
    // eslint-disable-next-line react/prop-types
    Cell: ({ row }) => (
      <div>
        <button
          className="btn btn-sm btn-primary me-2"
          // eslint-disable-next-line react/prop-types
          onClick={() => handleUpdate(row.original)}
          
        >
          <FaEdit />
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleDeleteClick(row.original)}
        >
          <FaTrashAlt />
        </button>
      </div>
    ),
  }), [onUpdate, onDelete]);

  // Add the action column to the columns array
  const extendedColumns = useMemo(() => [...columns, actionColumn], [columns, actionColumn]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
  } = useTable(
    {
      columns: extendedColumns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;
  
  const handleDeleteClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsDeleteModalOpen(true);
    console.log('Deleted');
    
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    onDelete(selectedRowData);
    setIsDeleteModalOpen(false);
    alert('Deleted Data SucessFully')

    console.log('Deleted Data SucessFully');
    
  };
  // Dynamically generate the fields array based on the columns prop
  const fields = columns.map(col => ({
    accessor: col.accessor,
    label: col.Header,
    type: col.accessor === 'date' ? 'date' : 'text', // Assuming 'date' column accessor uses a date picker
    name: col.accessor,
  }));

  return (
    <>
      {/* Table Section */}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card py-3">
              <div className="card-body">
                {/* Search */}
                <input
                  value={globalFilter || ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search..."
                  className="form-control mb-3"
                />

                {/* Table */}
                <table
                  {...getTableProps()}
                  className="table datatable table-bordered"
                >
                  <thead>
                    {headerGroups.map((headerGroup, headerGroupIndex) => (
                      <tr
                        key={`header-group-${headerGroupIndex}`}
                        {...headerGroup.getHeaderGroupProps()}
                      >
                        {headerGroup.headers.map((column, columnIndex) => (
                          <th
                            key={`column-${columnIndex}`}
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            {column.render("Header")}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? " 🔽"
                                  : " 🔼"
                                : ""}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row, rowIndex) => {
                      prepareRow(row);
                      return (
                        <tr key={`row-${rowIndex}`} {...row.getRowProps()}>
                          {row.cells.map((cell, cellIndex) => (
                            <td
                              key={`cell-${rowIndex}-${cellIndex}`}
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="d-flex justify-content-between">
                  <div>
                    <button
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      {"<<"}
                    </button>{" "}
                    <button
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      {"<"}
                    </button>{" "}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                      {">"}
                    </button>{" "}
                    <button
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      {">>"}
                    </button>{" "}
                    <span>
                      Page{" "}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>{" "}
                    </span>
                  </div>

                  <div>
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                      {[10, 20, 30, 40, 50].map((size) => (
                        <option key={size} value={size}>
                          Show {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <EditModal
          id="editModal"
          title="Update Fields"
          fields={fields}
          data={selectedRowData}
          onClose={handleCloseModal}
          onSubmit={handleUpdateSubmit}
        />
      )}
      <ConfirmationModal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        message="Are you sure you want to delete this Data?"        
      />
    </>
  );
};

export default DataTable;



