import { useState, useMemo, useEffect } from "react";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups, getAllUsers } from "actions/group";

import CustomPagination from "./CustomPagination";
/**
 * A module for Listing Models component
 * @module components/models/Models
 */

/**
 * Listing Models component
 * @method Models
 *
 * @return {JSX.Element}
 *
 */

const GroupList = () => {
  import("../../styles/GroupList.css");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * -------------------
   * * Redux store state
   * -------------------
   */
  const { users, groups } = useSelector((state) => state.group);

  /**
   * Columns template and configuration
   */
  const columns = [
    {
      name: "ID",
      // selector: '(row) => row.group_name,'
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      // selector: (row) => row.group_description,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      // selector: (row) =>
      //   Object.values(row.group_members).map((member) => {
      //     const result = Object.values(users).filter(
      //       (user) => user.email === member
      //     );
      //     return result[0]?.first_name + " " + result[0]?.last_name;
      //   }),
      sortable: true,
    },
  ];

  const xdata = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
    { id: 3, name: "Jane Smith", age: 30 },
    { id: 4, name: "Jane Smith", age: 30 },
    { id: 5, name: "Jane Smith", age: 30 },
    { id: 6, name: "Jane Smith", age: 30 },
    { id: 7, name: "Jane Smith", age: 30 },
    { id: 8, name: "Jane Smith", age: 30 },
    { id: 9, name: "Jane Smith", age: 30 },
    { id: 10, name: "Jane Smith", age: 30 },
    { id: 11, name: "John Doe", age: 25 },
    { id: 12, name: "Jane Smith", age: 30 },
    { id: 13, name: "Jane Smith", age: 30 },
    { id: 14, name: "Jane Smith", age: 30 },
    { id: 15, name: "Jane Smith", age: 30 },
    { id: 16, name: "Jane Smith", age: 30 },
    { id: 17, name: "Jane Smith", age: 30 },
    { id: 18, name: "Jane Smith", age: 30 },
    { id: 19, name: "Jane Smith", age: 30 },
    { id: 20, name: "Jane Smith", age: 30 },
    { id: 21, name: "John Doe", age: 25 },
    { id: 22, name: "Jane Smith", age: 30 },
    { id: 23, name: "Jane Smith", age: 30 },
    { id: 24, name: "Jane Smith", age: 30 },
    { id: 25, name: "Jane Smith", age: 30 },
    { id: 26, name: "Jane Smith", age: 30 },
    { id: 27, name: "Jane Smith", age: 30 },
    { id: 28, name: "Jane Smith", age: 30 },
    { id: 29, name: "Jane Smith", age: 30 },
    { id: 30, name: "Jane Smith", age: 30 },
    { id: 31, name: "John Doe", age: 25 },
    { id: 32, name: "Jane Smith", age: 30 },
    { id: 33, name: "Jane Smith", age: 30 },
    { id: 34, name: "Jane Smith", age: 30 },
    { id: 35, name: "Jane Smith", age: 30 },
    { id: 36, name: "Jane Smith", age: 30 },
    { id: 37, name: "Jane Smith", age: 30 },
    { id: 38, name: "Jane Smith", age: 30 },
    { id: 39, name: "Jane Smith", age: 30 },
    { id: 40, name: "Jane Smith", age: 30 },
  ];

  /**
   * -------------------------
   * * Component state
   *  ------------------------
   */
  const [filterText, setFilterText] = useState("");

  const paginationComponentOptions = {
    selectAllRowsItem: true,
  };
  const filteredItems = Object.values(groups)
    .filter(
      (item) =>
        item.group_name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.group_description
          .toLowerCase()
          .includes(filterText.toLowerCase()) ||
        Object.values(users)
          .filter((user) => user.email === item.group_members[0])[0]
          .first_name.toLowerCase()
          .includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      return b.id - a.id;
    });

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <input
        type="text"
        placeholder="Search groups"
        onChange={(e) => setFilterText(e.target.value)}
      />
    );
  }, []);

  /**
   * Handles event upon clicking the view button and navigates to the Models View page
   * @param {event} e - An event object containing information about the action
   */
  const onClickView = (e) => {
    const result = groups.find((item) => item.id.toString() === e.target.value);
    navigate(
      "/models/view/" +
        e.target.value +
        "?isPublish=" +
        result.model_detail[0].is_publish
    );
  };

  /**
   * Redirects to the Add Model page
   */
  const onClickAddBtn = () => {
    navigate("/models/add");
  };

  useEffect(() => {
    dispatch(getAllGroups());
    dispatch(getAllUsers());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]); // your data array
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (selectedItemsPerPage) => {
    setCurrentPage(1);
    setItemsPerPage(selectedItemsPerPage);
  };

  useEffect(() => {
    // Simulating data fetching
    // Replace this with your actual data fetching logic
    setTimeout(() => {
      const fetchedData = xdata; // Replace this with your fetched data
      setData(fetchedData);
      setTotalItems(fetchedData.length);
    }, 1000);
  }, []);

  useEffect(() => {
    let slicedData = data;
    if (itemsPerPage !== totalItems) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      slicedData = data.slice(start, end);
    }
    setPaginatedData(slicedData);
  }, [currentPage, itemsPerPage, data, totalItems]);

  return (
    <>
      <Container>
        <DataTable
          className="group-list-datatable"
          title={"Group Profiles"}
          columns={columns}
          data={paginatedData}
          pagination={false}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
        />
        <CustomPagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </Container>
    </>
  );
};

export default GroupList;
