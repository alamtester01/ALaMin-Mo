import React, { useState, useMemo, useEffect } from "react";
import { Container, Dropdown, Breadcrumb } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "components/layout/CustomPagination";
import FilterDropdown from "components/layout/FilterDropdown";
import { current } from "@reduxjs/toolkit";
import { getAllGroups, getAllUsers } from "actions/group";
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

const GroupList = () => {
  import("styles/GroupList.css");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * -------------------
   * * Redux store state
   * -------------------
   */
  const { users, groups, currentGroup } = useSelector((state) => state.group);
  const { user } = useSelector((state) => state.auth);

  const [sortDirection, setSortDirection] = useState("desc");
  const [sortColumn, setSortColumn] = useState("Date created");
  const [expandedName, setExpandedName] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [expandedMembers, setExpandedMembers] = useState(false);

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
        setExpandedDescription(false);
        setExpandedMembers(false);
        break;
      case "description":
        setExpandedDescription(!expandedDescription);
        setExpandedName(false);
        setExpandedMembers(false);
        break;
      case "members":
        setExpandedMembers(!expandedMembers);
        setExpandedName(false);
        setExpandedDescription(false);
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
        className="dropdown-group-list"
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
            A to Z
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortToggle("desc")}>
            Z to A
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
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
      selector: (row) => {
        let group_name = "";
        const icon = (
          <img
            src="/images/groups_list.svg"
            className="img-fluid icon-list"
            alt="group"
          />
        );

        group_name = (
          <div onClick={() => handleRowClick(row)}>
            <span key={`groupNameKey${row.id}`}>
              {icon} {row.group_name}
            </span>
          </div>
        );

        return group_name;
      },
      width: "50%",
    },
    {
      name: (
        <div
          onClick={() => handleToggleExpand("description")}
          className="w-100 h-100"
        >
          <CustomHeader
            setSortDirection={setSortDirection}
            setSortColumn={setSortColumn}
            columnName="Description"
            expanded={expandedDescription}
          />
        </div>
      ),
      selector: (row) => {
        const parser = new DOMParser();
        const parsedHTML = parser.parseFromString(
          row.group_description,
          "text/html"
        );
        const textContent = parsedHTML.body.textContent
          .substring(0, 100)
          .trim();
        return <div onClick={() => handleRowClick(row)}>{textContent}</div>;
      },
      width: "30%",
    },
    {
      name: (
        <div
          onClick={() => handleToggleExpand("members")}
          className="w-100 h-100"
        >
          <CustomHeader
            setSortDirection={setSortDirection}
            setSortColumn={setSortColumn}
            columnName="Members"
            expanded={expandedMembers}
          />
        </div>
      ),
      selector: (row) => {
        const result = Object.values(row.group_members).map((member) => {
          return Object.values(users).filter(
            (user) => user.email === member.email
          )[0];
        });
        let member_name = "";
        const icon = (
          <img
            src="/images/user_list.svg"
            className="img-fluid icon-list"
            alt="user"
          />
        );
        if (user.email === result[0]?.email) {
          member_name = (
            <span key={`memberKey${result[0]?.id}`}>
              {icon}me
              {row.group_members.length - 1 !== 0 && (
                <span className="plus-members-count">
                  +{row.group_members.length - 1}
                </span>
              )}
            </span>
          );
        } else {
          if (result[0]) {
            member_name = (
              <span key={`memberKey${result[0]?.id}`}>
                {icon}
                {result[0]?.first_name + " " + result[0]?.last_name}
                {row.group_members.length - 1 !== 0 && (
                  <span className="plus-members-count">
                    +{row.group_members.length - 1}
                  </span>
                )}
              </span>
            );
          } else {
            member_name = "--";
          }
        }
        return <div onClick={() => handleRowClick(row)}>{member_name}</div>;
      },
      width: "20%",
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

  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    handleItemsPerPageChange(itemsPerPage);
    setFilteredItems(
      Object.values(groups)
        .filter(
          (item) =>
            (item.group_name.toLowerCase().includes(filterText.toLowerCase()) ||
              item.group_description
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
              Object.values(users)
                .find((user) => user.email === item.group_members[0].email)
                ?.first_name.concat(
                  " ",
                  Object.values(users).find(
                    (user) => user.email === item.group_members[0].email
                  )?.last_name
                )
                .toLowerCase()
                .includes(filterText.toLowerCase())) &&
            (selectedOptions.length > 0
              ? selectedOptions.includes(item.group_name)
              : true)
        )
        .sort((a, b) => {
          if (filterText) {
            return compareValues(a.group_name, b.group_name, "asc");
          }
          const parser = new DOMParser();
          const parsedHTMLA = parser.parseFromString(
            a.group_description,
            "text/html"
          );
          const parsedHTMLB = parser.parseFromString(
            b.group_description,
            "text/html"
          );
          const textContentA = parsedHTMLA.body.textContent.trim();
          const textContentB = parsedHTMLB.body.textContent.trim();
          switch (sortColumn) {
            case "Name":
              return compareValues(a.group_name, b.group_name, sortDirection);
            case "Description":
              return compareValues(textContentA, textContentB, sortDirection);
            case "Members":
              return compareValues(a.group_owner, b.group_owner, sortDirection);
            default:
              return compareValues(
                a.group_created_at,
                b.group_created_at,
                sortDirection
              );
          }
        })
    );
  }, [groups, filterText, selectedOptions, sortDirection, sortColumn]);

  const subHeaderComponentMemo = useMemo(() => {
    const filteredGroups = Object.values(groups).filter((group) => {
      const group_members = group.group_members;
      return group_members?.some((member) => member.email === user.email);
    });

    return (
      <div className="group-list-header">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search groups"
            onChange={(e) => setFilterText(e.target.value)}
            className="search-input"
          />
          <img
            src="/images/search-icon-gray.svg"
            className="search-icon img-fluid icon-list"
            alt="group"
          />
        </div>
        <FilterDropdown
          setSelectedOptions={setSelectedOptions}
          filterTitle="My groups"
          options={filteredGroups}
          name="groups"
        />
      </div>
    );
  }, [groups, user]);

  useEffect(() => {
    dispatch(getAllGroups()).catch((err) => console.log(err));
  }, [currentGroup]);

  useEffect(() => {
    dispatch(getAllUsers()).catch((err) => console.log(err));
  }, []);

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
    navigate("/groups/view/" + row.id);
  };

  return (
    <>
      <Container className="mw-100">
        <Breadcrumb>
          <Breadcrumb.Item active>Groups</Breadcrumb.Item>
        </Breadcrumb>
        <DataTable
          className="group-list-datatable"
          title={"Group Profiles"}
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

export default GroupList;
