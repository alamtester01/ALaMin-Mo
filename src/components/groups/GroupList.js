import { useState, useMemo, useEffect } from "react";
import { Container} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

  /**
   * -------------------
   * * Redux store state
   * -------------------
   */
  const { groups } = useSelector((state) => state.group);

  /**
   * Columns template and configuration
   */
  const columns = [
    {
      name: "Name",
      selector: (row) => row.model_detail[0]?.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.model_detail[0]?.version,
      sortable: true,
    },
    {
      name: "Members",
      selector: (row) => row.model_detail[0]?.machine_learning_task,
      sortable: true,
    },
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
        item.model_detail[0] &&
        (item.model_detail[0]?.name
          .toLowerCase()
          .includes(filterText.toLowerCase()) ||
          item.model_detail[0]?.version
            .toLowerCase()
            .includes(filterText.toLowerCase()) ||
          item.model_detail[0]?.machine_learning_task
            .toLowerCase()
            .includes(filterText.toLowerCase()) ||
          item.model_detail[0]?.accuracy
            .toLowerCase()
            .includes(filterText.toLowerCase()) ||
          item.user?.organization
            .toLowerCase()
            .includes(filterText.toLowerCase()))
    )
    .sort((a, b) => {
      return b.id - a.id;
    });

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setFilterText(e.target.value)}
      />
    );
  }, []);

  /**
   *  Update user role state and models state
   */
  useEffect(() => {
    // dispatch(getAllModels());
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

  return (
    <>
      <Container className="model-list-container">
        
        <DataTable
          title="Group Profiles"
          columns={columns}
          data={filteredItems}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
        />
      </Container>
    </>
  );
};

export default GroupList;
