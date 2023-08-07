import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  Tab,
  Breadcrumb,
  Tabs,
  Button,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroup } from "actions/group";
import CustomPagination from "../layout/CustomPagination";
import AddMemberModal from "./AddMemberModal";
import EditGroupModal from "./EditGroupModal";
import RemoveMemberModal from "./RemoveMemberModal";
import DeleteGroupModal from "./DeleteGroupModal";
import { compareValues, convertDate } from "common/constants";
import { getAllModels } from "actions/model";

/**
 * A module for showing Group profile component
 * @module components/groups/GroupProfile
 */

/**
 * Group Profile component
 * @method GroupProfile
 *
 * @return {JSX.Element}
 *
 */

const GroupProfile = (props) => {
  import("../../styles/GroupProfile.css");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  /**
   * -------------------
   * * Redux store state
   * -------------------
   */
  const { models } = useSelector((state) => state.model);
  const { users, currentGroup } = useSelector((state) => state.group);
  const { user } = useSelector((state) => state.auth);

  const [modelName, setModelName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [refreshCurrentGroupCount, setRefreshCurrentGroupCount] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);

  const [sortDirection, setSortDirection] = useState("desc");
  const [sortColumn, setSortColumn] = useState("Date added");
  const [expandedName, setExpandedName] = useState(false);
  const [expandedAddedBy, setExpandedAddedBy] = useState(false);
  const [expandedDateAdded, setExpandedDateAdded] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

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
        setExpandedAddedBy(false);
        setExpandedDateAdded(false);
        break;
      case "added_by":
        setExpandedName(false);
        setExpandedAddedBy(!expandedAddedBy);
        setExpandedDateAdded(false);
        break;
      case "date_added":
        setExpandedName(false);
        setExpandedAddedBy(false);
        setExpandedDateAdded(!expandedDateAdded);
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
        className="dropdown-member-list"
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
            {props?.columnName === "Date added" ? "Older to newer" : "A to Z"}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortToggle("desc")}>
            {props?.columnName === "Date added" ? "Newer to older" : "Z to A"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const handleEditGroupModalClose = () => {
    setShowEditGroupModal(false);
  };

  const handleDeleteGroupModalClose = () => {
    setShowDeleteGroupModal(false);
  };

  const handleAddMemberModalClose = () => {
    setShowAddMemberModal(false);
  };

  const handleRemoveMemberModalClose = () => {
    setShowRemoveMemberModal(false);
  };

  const handleRemoveMemberModalShow = (name, email) => {
    setMemberEmail(email);
    setMemberName(name);
    setShowRemoveMemberModal(true);
  };

  useEffect(() => {
    dispatch(getGroup(id)).catch((error) => console.log(error));
    dispatch(getAllModels()).catch((error) => console.log(error));
  }, [id, refreshCurrentGroupCount]);

  useEffect(() => {
    setGroupName(currentGroup[0]?.group_name);
    setGroupDescription(currentGroup[0]?.group_description);
  }, [currentGroup]);

  useEffect(() => {
    setGroupName("");
    setGroupDescription("");
  }, []);

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
      selector: (row) => row.name,
      width: "50%",
      cell: (row) => (
        <div key={row.name} className="flex d-flex justify-content-between">
          <div>
            <img
              src="/images/user_list.svg"
              className="img-fluid icon-list"
              alt="user"
            />
            {row.name}
          </div>
          {currentGroup[0]?.group_owner === user.email &&
            currentGroup[0]?.group_owner !== row.email && (
              <Dropdown drop="end">
                <Dropdown.Toggle
                  variant="secondary"
                  className="three-dot-dropdown-table"
                >
                  <img
                    src="/images/three_dot_menu.svg"
                    className="img-fluid"
                    alt="menu"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      handleRemoveMemberModalShow(row.name, row.email)
                    }
                  >
                    Remove member
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
        </div>
      ),
    },
    {
      name: (
        <div
          onClick={() => handleToggleExpand("added_by")}
          className="w-100 h-100"
        >
          <CustomHeader
            setSortDirection={setSortDirection}
            setSortColumn={setSortColumn}
            columnName="Added by"
            expanded={expandedAddedBy}
          />
        </div>
      ),
      selector: (row) => {
        let added_by = "";
        const icon = (
          <img
            src="/images/user_list.svg"
            className="img-fluid icon-list"
            alt="user"
          />
        );

        added_by = (
          <span key={`addedByKey${row.id}`}>
            {icon} {row.added_by}
          </span>
        );

        return added_by;
      },
      width: "30%",
    },
    {
      name: (
        <div
          onClick={() => handleToggleExpand("date_added")}
          className="w-100 h-100"
        >
          <CustomHeader
            setSortDirection={setSortDirection}
            setSortColumn={setSortColumn}
            columnName="Date added"
            expanded={expandedDateAdded}
          />
        </div>
      ),
      selector: (row) => convertDate(row.added_date),
      width: "20%",
    },
  ];

  useEffect(() => {
    setModelName(
      Object.values(models).find(
        (model) => model?.model_profile_group === currentGroup[0]?.id
      )?.model_profile_name
    );
    if (currentGroup[0] && Object.keys(users).length > 0) {
      setFilteredItems(
        Object.values(currentGroup[0]?.group_members)
          .map((member) => {
            const name = Object.values(users).filter(
              (user) => user.email === member.email
            );
            const added_by = Object.values(users).filter(
              (user) => user.email === member.added_by
            );
            const row = {
              name: name.length
                ? name[0].first_name + " " + name[0].last_name
                : "---",
              email: member.email,
              added_by: added_by.length
                ? added_by[0].first_name + " " + added_by[0].last_name
                : "---",
              added_date: member.added_date,
            };
            return row;
          })
          .filter((row) => {
            const formattedDate = convertDate(row.date_created);
            return (
              row.name.toLowerCase().includes(filterText.toLowerCase()) ||
              row.added_by.toLowerCase().includes(filterText.toLowerCase()) ||
              formattedDate.toLowerCase().includes(filterText.toLowerCase())
            );
          })
          .sort((a, b) => {
            switch (sortColumn) {
              case "Name":
                return compareValues(a.name, b.name, sortDirection);
              case "Added by":
                return sortDirection === "asc"
                  ? a.added_by.toLowerCase().localeCompare(b.added_by)
                  : b.added_by.toLowerCase().localeCompare(a.added_by);
              default:
                return sortDirection === "asc"
                  ? a.added_date.toLowerCase().localeCompare(b.added_date)
                  : b.added_date.toLowerCase().localeCompare(a.added_date);
            }
          })
      );
    }
  }, [currentGroup[0], filterText, users, sortDirection, sortColumn, models]);

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search members"
            onChange={(e) => setFilterText(e.target.value)}
            className="search-input"
          />
          <img
            src="/images/search-icon-gray.svg"
            className="search-icon img-fluid icon-list"
            alt="group"
          />
        </div>
        {currentGroup[0]?.group_owner === user.email && (
          <Button
            className="button"
            onClick={() => setShowAddMemberModal(true)}
          >
            Add members
          </Button>
        )}
      </>
    );
  }, [currentGroup[0]]);

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
  }, [filteredItems]);

  useEffect(() => {
    let slicedData = data;
    if (itemsPerPage !== totalItems) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      slicedData = data.slice(start, end);
    }
    setPaginatedData(slicedData);
  }, [currentPage, itemsPerPage, data, totalItems]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
  return (
    <>
      {currentGroup[0] && currentGroup[0]?.group_owner === user.email && (
        <>
          <AddMemberModal
            groupID={id}
            groupName={currentGroup[0]?.group_name}
            groupOwner={currentGroup[0]?.group_owner}
            groupMembers={currentGroup[0]?.group_members}
            showAddMemberModal={showAddMemberModal}
            handleAddMemberModalClose={handleAddMemberModalClose}
            setShowToast={props?.setShowToast}
            setToastStatus={props?.setToastStatus}
            setToastImage={props?.setToastImage}
            setRefreshCurrentGroupCount={setRefreshCurrentGroupCount}
            refreshCurrentGroupCount={refreshCurrentGroupCount}
          />

          <EditGroupModal
            groupID={id}
            groupName={currentGroup[0]?.group_name}
            groupDescription={currentGroup[0]?.group_description}
            groupMembers={currentGroup[0]?.group_members}
            showEditGroupModal={showEditGroupModal}
            handleEditGroupModalClose={handleEditGroupModalClose}
            setShowToast={props?.setShowToast}
            setToastStatus={props?.setToastStatus}
          />

          <RemoveMemberModal
            groupID={id}
            groupName={currentGroup[0]?.group_name}
            memberName={memberName}
            memberEmail={memberEmail}
            showRemoveMemberModal={showRemoveMemberModal}
            handleRemoveMemberModalClose={handleRemoveMemberModalClose}
            setShowToast={props?.setShowToast}
            setToastStatus={props?.setToastStatus}
            setToastImage={props?.setToastImage}
            setRefreshCurrentGroupCount={setRefreshCurrentGroupCount}
            refreshCurrentGroupCount={refreshCurrentGroupCount}
          />
          <DeleteGroupModal
            groupID={id}
            showDeleteGroupModal={showDeleteGroupModal}
            handleDeleteGroupModalClose={handleDeleteGroupModalClose}
            setShowToast={props?.setShowToast}
            setToastStatus={props?.setToastStatus}
          />
        </>
      )}
      <Container className="mw-100">
        <Breadcrumb>
          <Breadcrumb.Item active>Groups</Breadcrumb.Item>
          <Breadcrumb.Item
            className="link"
            linkAs={Link}
            linkProps={{ to: "/groups" }}
          >
            Group Profiles
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex justify-content-between">
          <p className="group-name-profile">{groupName}</p>
          {currentGroup[0]?.group_owner === user.email && (
            <Dropdown>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>More</Tooltip>}
                trigger={["hover", "focus"]}
              >
                <Dropdown.Toggle
                  variant="secondary"
                  className="three-dot-dropdown"
                >
                  <img
                    src="/images/three_dot_menu.svg"
                    className="img-fluid"
                    alt="menu"
                  />
                </Dropdown.Toggle>
              </OverlayTrigger>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setShowEditGroupModal(true)}>
                  Edit group card
                </Dropdown.Item>
                {!modelName && (
                  <Dropdown.Item onClick={() => setShowDeleteGroupModal(true)}>
                    Delete group
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        {modelName && (
          <div className="d-flex labels">
            <div>
              <span>{modelName}</span>
            </div>
          </div>
        )}
        <Tabs defaultActiveKey="group-card" className="mb-3">
          <Tab eventKey="group-card" tabClassName="tabs" title="Group card">
            <p className="bold">Description</p>
            <div className="ql-snow">
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{
                  __html: groupDescription,
                }}
              ></div>
            </div>
          </Tab>
          <Tab
            eventKey="group-members"
            tabClassName="tabs"
            title="Group members"
          >
            <p className="bold">Members</p>
            <Container className="mw-100">
              <DataTable
                className="group-members-datatable"
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
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default GroupProfile;
