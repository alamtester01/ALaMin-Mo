import React, { useState, useMemo, useEffect } from "react";
import { Container, Dropdown, Breadcrumb } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "actions/group";
import CustomPagination from "components/layout/CustomPagination";
import FilterDropdown from "components/layout/FilterDropdown";
import {
  editSubscribeModelProfile,
  getAllModels,
  getAllSubscribeModelProfile,
  subscribeModelProfile,
  unsubscribeModelProfile,
} from "actions/model";
import { compareValues } from "common/constants";

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

const ModelList = () => {
  import("styles/ModelList.css");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * -------------------
   * * Redux store state
   * -------------------
   */
  const { models, subscribedModels } = useSelector((state) => state.model);
  const { groups, users } = useSelector((state) => state.group);
  const { user } = useSelector((state) => state.auth);

  const [subscribed, setSubscribed] = useState(false);
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortColumn, setSortColumn] = useState("Date created");
  const [expandedName, setExpandedName] = useState(false);
  const [expandedTask, setExpandedTask] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(false);
  const [expandedCreatedBy, setExpandedCreatedBy] = useState(false);
  const [expandedDateCreated, setExpandedDateCreated] = useState(false);
  const [refreshSubscribe, setRefreshSubscribe] = useState(0);

  const CustomDropdownToggle = React.forwardRef(
    ({ children, onClick }, ref) => {
      return (
        <span
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
        </span>
      );
    }
  );

  const handleToggleExpand = (column) => {
    switch (column) {
      case "name":
        setExpandedName(!expandedName);
        setExpandedTask(false);
        setExpandedGroup(false);
        setExpandedCreatedBy(false);
        setExpandedDateCreated(false);
        break;
      case "task":
        setExpandedName(false);
        setExpandedTask(!expandedTask);
        setExpandedGroup(false);
        setExpandedCreatedBy(false);
        setExpandedDateCreated(false);
        break;
      case "group":
        setExpandedName(false);
        setExpandedTask(false);
        setExpandedGroup(!expandedGroup);
        setExpandedCreatedBy(false);
        setExpandedDateCreated(false);
        break;
      case "created_by":
        setExpandedName(false);
        setExpandedTask(false);
        setExpandedGroup(false);
        setExpandedCreatedBy(!expandedCreatedBy);
        setExpandedDateCreated(false);
        break;
      case "date_created":
        setExpandedName(false);
        setExpandedTask(false);
        setExpandedGroup(false);
        setExpandedCreatedBy(false);
        setExpandedDateCreated(!expandedDateCreated);
        break;
      default:
      //
    }
  };

  // Define your custom header component for Name column
  const CustomHeader = (props) => {
    const handleSortToggle = (direction) => {
      props?.setSortDirection(direction);
      props?.setSortColumn(props?.columnName);
    };

    return (
      <Dropdown
        show={props?.expanded}
        className="dropdown-model-list"
        drop="down"
      >
        <Dropdown.Toggle
          as={CustomDropdownToggle}
          variant="secondary"
          id="dropdown-basic"
        >
          {props?.columnName}
        </Dropdown.Toggle>

        <Dropdown.Menu
          className={
            props?.expanded ? "dropdown-menu slide-down" : "dropdown-menu"
          }
        >
          <Dropdown.Item onClick={() => handleSortToggle("asc")}>
            {props?.columnName === "Date created" ? "Older to newer" : "A to Z"}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortToggle("desc")}>
            {props?.columnName === "Date created" ? "Newer to older" : "Z to A"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const handleSubscribe = (id, isSubscribed) => {
    if (isSubscribed) {
      dispatch(unsubscribeModelProfile(subscribedModels[0]?.id, id))
        .then((res) => {
          setRefreshSubscribe(refreshSubscribe + 1)
        })
        .catch((err) => console.log(err));
    } else {
      console.log(subscribedModels.length);
      if (!subscribedModels.length) {
        dispatch(subscribeModelProfile(id))
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } else {
        const subsArr = Object.values(
          subscribedModels[0]?.subscribe_model_profile
        );
        subsArr.push(id);
        console.log(subsArr);
        dispatch(editSubscribeModelProfile(subscribedModels[0]?.id, subsArr))
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
    }
  };
  /**
   * Columns template and configuration
   */
  const columns = [
    {
      name: (
        <div onClick={() => handleToggleExpand("name")} className="w-100 h-100">
          <CustomHeader
            setSortDirection={setSortDirection}
            setSortColumn={setSortColumn}
            columnName="Name"
            expanded={expandedName}
          />
        </div>
      ),
      cell: (row) => (
        <div className="flex d-flex justify-content-between">
          <div>{row.model_profile_name}</div>
          <div onClick={() => handleSubscribe(row.id, row.model_subscribe)}>
            <img
              src={
                row?.model_subscribe
                  ? "/images/subscribed.svg"
                  : "/images/not-subscribed.svg"
              }
              className="img-fluid heart"
              alt="menu"
            />
          </div>
        </div>
      ),
      width: "50%",
    },
    {
      name: (
        <div onClick={() => handleToggleExpand("task")} className="w-100 h-100">
          <CustomHeader
            setSortDirection={setSortDirection}
            setSortColumn={setSortColumn}
            columnName="Task"
            expanded={expandedTask}
          />
        </div>
      ),
      selector: (row) => <div>{row.model_profile_task}</div>,
      width: "15%",
    },
    {
      name: (
        <div
          onClick={() => handleToggleExpand("group")}
          className="w-100 h-100"
        >
          <CustomHeader
            setSortDirection={setSortDirection}
            setSortColumn={setSortColumn}
            columnName="Group"
            expanded={expandedGroup}
          />
        </div>
      ),
      selector: (row) => {
        const model_group = Object.values(groups).find(
          (group) => group.id === row.model_profile_group
        );
        return model_group?.group_name || "Unassigned";
      },
      width: "10%",
    },
    {
      name: (
        <div
          onClick={() => handleToggleExpand("created_by")}
          className="w-100 h-100"
        >
          <CustomHeader
            setSortDirection={setSortDirection}
            setSortColumn={setSortColumn}
            columnName="Created by"
            expanded={expandedCreatedBy}
          />
        </div>
      ),
      selector: (row) => {
        const model_user = Object.values(users).find(
          (user) => user.email === row.model_created_by
        );
        const icon = (
          <img
            src="/images/user_list.svg"
            className="img-fluid icon-list"
            alt="user"
          />
        );
        const model_user_name =
          user.email === row.model_created_by
            ? "me"
            : model_user?.first_name + " " + model_user?.last_name;

        return (
          <span key={`createdByKey${row.id}`}>
            {icon}
            {model_user_name}
          </span>
        );
      },
      width: "15%",
    },
    {
      name: (
        <div
          onClick={() => handleToggleExpand("date_created")}
          className="w-100 h-100"
        >
          <CustomHeader
            setSortDirection={setSortDirection}
            setSortColumn={setSortColumn}
            columnName="Date created"
            expanded={expandedDateCreated}
          />
        </div>
      ),
      selector: (row) => {
        const dateString = row.model_date_create;
        const date = new Date(dateString);

        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = String(date.getFullYear());

        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
      },
      width: "10%",
    },
  ];

  useEffect(() => {
    console.log(subscribedModels);
  }, [subscribedModels]);

  /**
   * -------------------------
   * * Component state
   *  ------------------------
   */
  const [filterText, setFilterText] = useState("");

  const [selectedOptionsTasks, setSelectedOptionsTasks] = useState([]);
  const [selectedOptionsCreatedBy, setSelectedOptionsCreatedBy] = useState([]);
  const [selectedOptionsSubscriptions, setSelectedOptionsSubscriptions] =
    useState([]);
  useEffect(() => {
    handleItemsPerPageChange(itemsPerPage);
    setFilteredItems(
      Object.values(models)
        .map((item) => {
          console.log(subscribedModels);
          let model_subscribe = false;
          if (subscribedModels.length > 0) {
            const subscribe = Object.values(
              subscribedModels[0]?.subscribe_model_profile
            ).find((i) => i === item.id);
            model_subscribe = subscribe ? true : false;
          } else {
            model_subscribe = false;
          }
          const updatedItem = {
            id: item.id,
            model_created_by: item.model_created_by,
            model_date_create: item.model_date_create,
            model_profile_description: item.model_profile_description,
            model_profile_group: item.model_profile_group,
            model_profile_name: item.model_profile_name,
            model_profile_task: item.model_profile_task,
            model_subscribe: model_subscribe,
          };

          return updatedItem;
        })
        .filter((item) => {
          const dateString = item.model_date_create;
          const date = new Date(dateString);

          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const year = String(date.getFullYear());

          const formattedDate = `${month}/${day}/${year}`;
          Object.values(selectedOptionsCreatedBy).map((option) => {
            console.log(
              Object.values(users).find((user) => user.email === option)
            );
          });

          return (
            (item.model_profile_name
              .toLowerCase()
              .includes(filterText.toLowerCase()) ||
              item.model_profile_description
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              item.model_profile_task
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              Object.values(groups)
                .find((group) => group.id === item.model_profile_group)
                ?.group_name.toLowerCase()
                .includes(filterText.toLowerCase()) ||
              formattedDate.toLowerCase().includes(filterText.toLowerCase()) ||
              Object.values(users)
                .find((user) => user.email === item.model_created_by)
                ?.first_name.concat(
                  " ",
                  Object.values(users).find(
                    (user) => user.email === item.model_created_by
                  )?.last_name
                )
                .toLowerCase()
                .includes(filterText.toLowerCase())) &&
            (selectedOptionsTasks.length > 0
              ? selectedOptionsTasks.includes(item.model_profile_task)
              : true) &&
            (selectedOptionsCreatedBy.length > 0
              ? selectedOptionsCreatedBy.includes(item.model_created_by)
              : true)
          );
        })
        .sort((a, b) => {
          switch (sortColumn) {
            case "Name":
              return compareValues(
                a.model_profile_name,
                b.model_profile_name,
                sortDirection
              );
            case "Description":
              return compareValues(
                a.model_profile_description,
                b.model_profile_description,
                sortDirection
              );
            case "Task":
              return compareValues(
                a.model_profile_task,
                b.model_profile_task,
                sortDirection
              );
            case "Group":
              const groupA =
                Object.values(groups).find(
                  (group) => group.id === a.model_profile_group
                )?.group_name || "Unassigned";
              const groupB =
                Object.values(groups).find(
                  (group) => group.id === b.model_profile_group
                )?.group_name || "Unassigned";

              return compareValues(groupA, groupB, sortDirection);
            case "Created by":
              return compareValues(
                a.model_created_by,
                b.model_created_by,
                sortDirection
              );
            default:
              return sortDirection === "asc"
                ? a.model_date_create
                    .toLowerCase()
                    .localeCompare(b.model_date_create)
                : b.model_date_create
                    .toLowerCase()
                    .localeCompare(a.model_date_create);
          }
        })
    );
  }, [
    models,
    filterText,
    selectedOptionsTasks,
    selectedOptionsCreatedBy,
    sortDirection,
    sortColumn,
    subscribedModels,
  ]);

  const subHeaderComponentMemo = useMemo(() => {
    // Create an empty Set to store unique tasks
    const uniqueTasks = new Set();
    const uniqueUsers = new Set();
    const outputArray = [];

    // Iterate through the inputArray and add each task to the Set
    Object.values(models).forEach((item) =>
      uniqueTasks.add(item.model_profile_task)
    );

    // Iterate through the inputArray and add each task to the Set
    Object.values(models).forEach((item) => {
      const model_user = Object.values(users).find(
        (user) => user.email === item.model_created_by
      );
      const model_user_name =
        user.email === item.model_created_by
          ? "me"
          : model_user?.first_name + " " + model_user?.last_name;

      if (!uniqueUsers.has(item.model_created_by)) {
        uniqueUsers.add(item.model_created_by);
        outputArray.push({
          email: item.model_created_by,
          created_by: model_user_name,
        });
      }
    });

    // Convert the Set back to an array
    const filteredTasks = Array.from(uniqueTasks);
    const filteredCreatedBy = Array.from(outputArray);

    return (
      <div className="model-list-header">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search model"
            onChange={(e) => setFilterText(e.target.value)}
            className="search-input"
          />
          <img
            src="/images/search-icon-gray.svg"
            className="search-icon img-fluid icon-list"
            alt="model"
          />
        </div>
        <FilterDropdown
          setSelectedOptions={setSelectedOptionsTasks}
          filterTitle="Tasks"
          options={filteredTasks}
          name="tasks"
        />
        <FilterDropdown
          setSelectedOptions={setSelectedOptionsCreatedBy}
          filterTitle="Created by"
          options={filteredCreatedBy}
          name="created_by"
        />
        <FilterDropdown
          setSelectedOptions={setSelectedOptionsSubscriptions}
          filterTitle="Subscriptions"
          options={[]}
          name="subscriptions"
        />
      </div>
    );
  }, [models, users]);

  useEffect(() => {
    dispatch(getAllModels()).catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    dispatch(getAllUsers()).catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    dispatch(getAllSubscribeModelProfile())
      // .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [refreshSubscribe]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [data, setData] = useState([]); // your data array
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);

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
    const fetchedData = filteredItems; // Replace this with your fetched data
    setData(fetchedData);
    setTotalItems(fetchedData.length);
  }, [filteredItems, sortDirection]);

  useEffect(() => {
    let slicedData = data;
    if (itemsPerPage !== totalItems) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      slicedData = data.slice(start, end);
    }
    setPaginatedData(slicedData);
  }, [currentPage, itemsPerPage, data, totalItems]);

  const handleRowClick = (row) => {
    // Handle row click event and navigate to a different page
    navigate("/models/view/" + row.id);
  };

  return (
    <>
      <Container className="mw-100">
        <Breadcrumb>
          <Breadcrumb.Item active>Models</Breadcrumb.Item>
        </Breadcrumb>
        <DataTable
          className="model-list-datatable"
          title={"Model Profiles"}
          columns={columns}
          data={paginatedData}
          pagination={false}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          onRowClicked={handleRowClick}
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

export default ModelList;
