import React, { useState, useMemo, useEffect, useRef } from "react";
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
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups, getAllUsers, getGroup } from "actions/group";
import CustomPagination from "../layout/CustomPagination";
import {
  editSubscribeModelProfile,
  getAllAccuracy,
  getAllModelVersions,
  getAllSubscribeModelProfile,
  getModel,
  subscribeModelProfile,
  unsubscribeModelProfile,
} from "actions/model";
import DeleteModelModal from "./DeleteModelModal";
import { compareValues, convertDate } from "common/constants";
import EditModelModal from "./EditModelModal";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Dot,
  Label,
} from "recharts";
import "../../styles/ModelProfile.css"; // Import the custom CSS file

/**
 * A module for showing Model profile component
 * @module components/models/ModelProfile
 */

/**
 * Model Profile component
 * @method ModelProfile
 *
 * @return {JSX.Element}
 *
 */
const LinearAreaChart = (props) => {
  const navigate = useNavigate();
  const [graphData, setGraphData] = useState({});
  useEffect(() => {
    if (props?.modelsAccuracy) {
      const result = Object.values(props?.modelsAccuracy?.model_accuracy).map(
        (item) => {
          const modelVersion = Object.values(
            props?.modelsAccuracy?.model_version
          ).find((version) => item.model_file === version.model_file);
          const row = {
            id: item?.model_file,
            version: modelVersion?.version,
            name: modelVersion?.name,
            accuracy: item?.accuracy,
            date_created: modelVersion?.date_created,
            author: modelVersion?.author,
          };
          return row;
        }
      );
      const result1 = result.filter((item) => item?.version !== undefined);
      result1.unshift({ x: 0, y: 0 });
      result1.push({ x: 0, y: 0 });
      setGraphData(result1);
    }
  }, [props?.modelsAccuracy?.model_accuracy]);

  const [activeDot, setActiveDot] = useState(false);
  const [activeDotRadius, setActiveDotRadius] = useState(4);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [name, setName] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [author, setAuthor] = useState("");
  const [id, setID] = useState(0);

  const handleLearnMoreBtn = (id) => {
    navigate("/models/view/version/" + id);
  };

  const CustomTooltip = (props) => {
    return (
      <div
        onMouseEnter={props?.onMouseEnter}
        className="custom-tooltip"
        style={{
          position: "absolute",
          top: position.y + positionY,
          left: position.x + positionX,
        }}
      >
        <p className="semi-bold">{props?.name}</p>
        <span className="d-flex justify-content-between">
          <span>Accuracy:</span>
          <span>{props?.accuracy}%</span>
        </span>
        <span className="d-flex justify-content-between">
          <span>Date created:</span>
          <span>{convertDate(props?.dateCreated)}</span>
        </span>
        <span className="d-flex justify-content-between">
          <span>Author:</span>
          <span>{props?.author}</span>
        </span>
        <div
          className="d-flex justify-content-center align-items-center"
          content={<CustomTooltip />}
        >
          <Button
            className="button custom-button"
            onClick={() => handleLearnMoreBtn(props?.id)}
          >
            Learn more
          </Button>
        </div>
      </div>
    );
  };

  const onMouseEnter = (data, label) => {
    setID(data?.id);
    setName(data?.name);
    setAccuracy(data?.accuracy);
    setDateCreated(data?.dateCreated);
    setAuthor(data?.author);
    setPositionX(data?.cx - 150);
    setPositionY(data?.cy + 25);
    setActiveDot(true);
    setActiveDotRadius(8);
  };

  // Custom dot renderer
  const renderCustomDot = (props) => {
    const { key, cx, cy, r, payload } = props;
    const { y, id, name, accuracy, date_created, author } = payload; // Get the y value of the data point

    let dotRadius = 5; // Default dot radius

    // Customize dot thickness based on y value
    if (y > 25) {
      dotRadius = 7;
    } else if (y > 15) {
      dotRadius = 6;
    }

    return (
      <Dot
        id={id}
        name={name}
        accuracy={accuracy}
        dateCreated={date_created}
        author={author}
        key={key}
        cx={cx}
        cy={cy}
        r={activeDotRadius}
        onMouseEnter={onMouseEnter}
      />
    );
  };
  const elementRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const getElementPosition = () => {
      if (elementRef.current) {
        const elementRect = elementRef.current.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;

        setPosition({
          y: elementRect.top + scrollTop - 210,
          x: elementRect.left + scrollLeft + 10,
        });
      }
    };

    // Call the function once on mount
    getElementPosition();

    // Add an event listener to handle position changes due to resize or scroll
    window.addEventListener("resize", getElementPosition);
    window.addEventListener("scroll", getElementPosition);

    // Clean up the event listeners on unmount
    return () => {
      window.removeEventListener("resize", getElementPosition);
      window.removeEventListener("scroll", getElementPosition);
    };
  }, []);

  const onMouseLeave = () => {
    setActiveDot(false);
  };

  const onMouseEnterCustomToolTip = () => {
    setActiveDot(true);
  };

  return (
    <>
      <div ref={elementRef}>
        <AreaChart
          onMouseLeave={onMouseLeave}
          width={1000}
          height={700}
          data={graphData}
          margin={{ top: 100, right: 30, bottom: 50, left: 100 }}
        >
          {/* Add X and Y axes, and the CartesianGrid */}
          {/* <XAxis dataKey="x" /> */}
          <XAxis dataKey="version" axisLine={false} tickLine={false}>
            <Label value="Version" dy={30} />
          </XAxis>
          {/* <YAxis axisLine={false} tickLine={false} label="accuracy"/> */}
          <YAxis axisLine={false} tickLine={false}>
            <Label value="Accuracy" dx={-50} />
          </YAxis>
          <CartesianGrid
            strokeDasharray="7 3"
            stroke="#969696"
            vertical={false}
          />

          {/* Render the area with the defined gradient */}
          <Area
            type="linear"
            dataKey="accuracy"
            stroke="#262262"
            strokeWidth={5}
            fill="url(#colorGradient)" // Apply the gradient fill here
            isAnimationActive={false}
            dot={renderCustomDot}
          />
          {/* Define the linear gradient */}
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={1} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </div>
      {activeDot && (
        <CustomTooltip
          id={id}
          name={name}
          accuracy={accuracy}
          dateCreated={dateCreated}
          author={author}
          onMouseEnter={onMouseEnterCustomToolTip}
        />
      )}
    </>
  );
};

const ModelProfile = (props) => {
  import("../../styles/ModelProfile.css");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const searchParams = new URLSearchParams(location.search);

  const tab = searchParams.get("tab");
  /**
   * -------------------
   * * Redux store state
   * -------------------
   */
  const { currentModel, modelVersions, modelsAccuracy, subscribedModels } =
    useSelector((state) => state.model);
  const { groups, currentGroup, users } = useSelector((state) => state.group);
  const { user } = useSelector((state) => state.auth);

  const [modelName, setModelName] = useState("");
  const [modelTask, setModelTask] = useState("");
  const [modelDescription, setModelDescription] = useState("");
  const [modelGroup, setModelGroup] = useState("");
  const [modelCreatedBy, setModelCreatedBy] = useState("");
  const [modelDateCreated, setModelDateCreated] = useState("");

  const [filterText, setFilterText] = useState("");
  const [refreshCurrentModelCount, setRefreshCurrentModelCount] = useState(0);
  const [showDeleteModelModal, setShowDeleteModelModal] = useState(false);
  const [showEditModelModal, setShowEditModelModal] = useState(false);
  const [refreshSubscribe, setRefreshSubscribe] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [userAllow, setUserAllow] = useState(false);

  const handleDeleteModelModalClose = () => {
    setShowDeleteModelModal(false);
  };

  const handleEditModelModalClose = () => {
    setShowEditModelModal(false);
  };

  useEffect(() => {
    dispatch(getModel(id)).catch((error) => console.log(error));
    dispatch(getAllModelVersions(id)).catch((error) => console.log(error));
    dispatch(getAllAccuracy(id)).catch((error) => console.log(error));
  }, [id, props?.refreshModelVersionsCount, refreshCurrentModelCount]);

  useEffect(() => {
    // console.log(modelsAccuracy);
  }, [modelsAccuracy]);

  useEffect(() => {
    if (
      currentModel[0]?.model_created_by === user.email ||
      (modelGroup !== "Unassigned" &&
        currentGroup[0]?.group_members &&
        Object.values(currentGroup[0]?.group_members).find(
          (group) => group.email === user.email
        ))
    ) {
      setUserAllow(true);
    } else {
      setUserAllow(false);
    }
  }, [currentModel, currentGroup, modelGroup]);

  useEffect(() => {
    dispatch(getAllSubscribeModelProfile())
      // .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [refreshSubscribe]);

  useEffect(() => {
    setModelName(currentModel[0]?.model_profile_name);
    setModelTask(currentModel[0]?.model_profile_task);
    setModelDescription(currentModel[0]?.model_profile_description);
    const model_user = Object.values(users).find(
      (user) => user.email === currentModel[0]?.model_created_by
    );
    setModelCreatedBy(model_user?.first_name + " " + model_user?.last_name);

    const formattedDate = convertDate(currentModel[0]?.model_date_create);
    setModelDateCreated(formattedDate);

    const groupName =
      Object.values(groups).find(
        (group) =>
          group.id ===
          (currentModel[0]?.model_profile_group_id ||
            currentModel[0]?.model_profile_group)
      )?.group_name || "Unassigned";
    setModelGroup(groupName);

    if (currentModel[0]?.model_profile_group_id) {
      dispatch(getGroup(currentModel[0]?.model_profile_group_id)).catch(
        (error) => console.log(error)
      );
    }
    if (subscribedModels.length > 0) {
      const subscribe = Object.values(
        subscribedModels[0]?.subscribe_model_profile
      ).find((i) => i === currentModel[0]?.id);
      setSubscribed(subscribe ? true : false);
    }
  }, [currentModel, subscribedModels]);

  useEffect(() => {
    setSubscribed(false);
    setModelName("");
    setModelTask("");
    setModelDescription("");
    setModelGroup("");
    setModelCreatedBy("");
    setModelDateCreated("");
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [data, setData] = useState([]); // your data array
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);

  const [sortDirection, setSortDirection] = useState("desc");
  const [sortColumn, setSortColumn] = useState("Date created");
  const [expandedDateCreated, setExpandedDateCreated] = useState(false);
  const [expandedStatus, setExpandedStatus] = useState(false);

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
      case "date_created":
        setExpandedDateCreated(!expandedDateCreated);
        setExpandedStatus(false);
        break;
      case "status":
        setExpandedDateCreated(false);
        setExpandedStatus(!expandedStatus);
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
        className="dropdown-version-list"
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (selectedItemsPerPage) => {
    setCurrentPage(1);
    setItemsPerPage(selectedItemsPerPage);
  };

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search version"
            onChange={(e) => setFilterText(e.target.value)}
            className="search-input"
          />
          <img
            src="/images/search-icon-gray.svg"
            className="search-icon img-fluid icon-list"
            alt="group"
          />
        </div>
        {userAllow && (
          <Button className="button" onClick={() => handleAddVersionBtnClick()}>
            Add version
          </Button>
        )}
      </>
    );
  }, [userAllow]);

  /**
   * Columns template and configuration
   */
  const columns1 = [
    {
      name: <span className="th">No.</span>,
      selector: (row) => row.version,
      width: "10%",
    },
    {
      name: <span className="th">Name</span>,
      selector: (row) => row.name,
      width: "25%",
    },
    {
      name: <span className="th">File</span>,
      selector: (row) => row.file,
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
      selector: (row) => convertDate(row.date_created),
      width: "17%",
    },
    {
      name: <span className="th">Author</span>,
      selector: (row) => row.author,
      width: "17%",
    },
    {
      name: (
        <div
          onClick={() => handleToggleExpand("status")}
          className="w-100 h-100"
        >
          <CustomHeader
            setSortDirection={setSortDirection}
            setSortColumn={setSortColumn}
            columnName="Status"
            expanded={expandedStatus}
          />
        </div>
      ),
      selector: (row) => row.status,
      width: "16%",
    },
  ];

  /**
   * Columns template and configuration
   */
  const columns2 = [
    {
      name: <span className="th">No.</span>,
      selector: (row) => row.version,
      width: "10%",
    },
    {
      name: <span className="th">Name</span>,
      selector: (row) => row.name,
      width: "40%",
    },
    {
      name: <span className="th">File</span>,
      selector: (row) => row.file,
      width: "16%",
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
      selector: (row) => convertDate(row.date_created),
      width: "17%",
    },
    {
      name: <span className="th">Author</span>,
      selector: (row) => row.author,
      width: "17%",
    },
  ];

  const handleAddVersionBtnClick = () => {
    navigate("/models/version/add/" + id);
  };

  useEffect(() => {
    if (modelVersions?.model_file) {
      setFilteredItems(
        Object.values(modelVersions?.model_file)
          .map((model_file) => {
            const details = Object.values(modelVersions?.model_details).find(
              (item) => item.model_file === model_file.id
            );

            const model = Object.values(modelVersions?.model).find(
              (item) => item.model_file === model_file.id
            );

            if (details) {
              const row = {
                id: model_file.id,
                version: !details.version ? "---" : details.version,
                name: !details.name ? "---" : details.name,
                file: !model_file?.file_type ? "---" : model_file?.file_type,
                date_created: details.date_created,
                author: !details.author ? "---" : details.author,
                status: details?.is_archive
                  ? "Archived"
                  : model?.is_publish
                  ? "Published"
                  : "Draft",
              };
              return row;
            } else {
              return;
            }
          })
          .filter((row) => {
            if (row) {
              const formattedDate = convertDate(row.date_created);
              return (
                (row.version.toLowerCase().includes(filterText.toLowerCase()) ||
                  row.name.toLowerCase().includes(filterText.toLowerCase()) ||
                  row?.file?.toLowerCase().includes(filterText.toLowerCase()) ||
                  formattedDate
                    .toLowerCase()
                    .includes(filterText.toLowerCase()) ||
                  row.author.toLowerCase().includes(filterText.toLowerCase()) ||
                  row.status
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) &&
                (!userAllow
                  ? row.status.toLowerCase().includes("published")
                  : (row.status.toLowerCase().includes("draft") ||
                    row.status.toLowerCase().includes("archived") ||
                    row.status.toLowerCase().includes("published")))
              );
            }
          })
          .sort((a, b) => {
            switch (sortColumn) {
              case "Status":
                return sortDirection === "asc"
                  ? a.status.toLowerCase().localeCompare(b.status)
                  : b.status.toLowerCase().localeCompare(a.status);
              default:
                return compareValues(
                  a.date_created,
                  b.date_created,
                  sortDirection
                );
            }
          })
      );
    }
  }, [modelVersions, filterText, sortDirection, sortColumn]);

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

  const handleRowClick = (row) => {
    // Handle row click event and navigate to a different page
    navigate("/models/view/version/" + row.id);
  };

  const handleSubscribe = () => {
    const modelProfileID = parseInt(id);
    if (subscribed) {
      dispatch(unsubscribeModelProfile(subscribedModels[0]?.id, modelProfileID))
        .then((status) => {
          setSubscribed(!subscribed);
          props.setShowToast(true);
          props.setToastStatus(status);
          props.setToastImage("/images/subscription-removed-success.svg");
        })
        .catch((status) => {
          props.setShowToast(true);
          props.setToastStatus(status);
          props.setToastImage(null);
        });
    } else {
      if (!subscribedModels.length) {
        dispatch(subscribeModelProfile(modelProfileID))
          .then((status) => {
            props.setShowToast(true);
            props.setToastStatus(status);
            props.setToastImage("/images/subscription-added-success.svg");
            setSubscribed(!subscribed);
          })
          .catch((status) => {
            props.setShowToast(true);
            props.setToastStatus(status);
            props.setToastImage(null);
          });
      } else {
        const subsArr = Object.values(
          subscribedModels[0]?.subscribe_model_profile
        );
        subsArr.push(modelProfileID);
        dispatch(editSubscribeModelProfile(subscribedModels[0]?.id, subsArr))
          .then((status) => {
            props.setShowToast(true);
            props.setToastStatus(status);
            props.setToastImage("/images/subscription-added-success.svg");
            setSubscribed(!subscribed);
          })
          .catch((status) => {
            props.setShowToast(true);
            props.setToastStatus(status);
            props.setToastImage(null);
          });
      }
    }
  };

  return (
    <>
      {currentModel[0] && currentModel[0]?.model_created_by === user.email && (
        <>
          <DeleteModelModal
            modelID={id}
            showDeleteModelModal={showDeleteModelModal}
            handleDeleteModelModalClose={handleDeleteModelModalClose}
            setShowToast={props?.setShowToast}
            setToastStatus={props?.setToastStatus}
            setToastImage={props?.setToastImage}
          />
          <EditModelModal
            modelID={id}
            modelName={currentModel[0]?.model_profile_name}
            modelTask={currentModel[0]?.model_profile_task}
            modelDescription={currentModel[0]?.model_profile_description}
            modelGroup={currentModel[0]?.model_profile_group_id}
            showEditModelModal={showEditModelModal}
            handleEditModelModalClose={handleEditModelModalClose}
            setShowToast={props?.setShowToast}
            setToastStatus={props?.setToastStatus}
            setToastImage={props?.setToastImage}
          />
        </>
      )}
      <Container className="mw-100">
        <Breadcrumb>
          <Breadcrumb.Item active>Models</Breadcrumb.Item>
          <Breadcrumb.Item
            className="link"
            linkAs={Link}
            linkProps={{ to: "/models" }}
          >
            Model Profiles
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex justify-content-between">
          <p className="model-name-profile">{modelName}</p>
          <span className="d-flex align-items-center">
            <OverlayTrigger
              placement="left"
              overlay={
                <Tooltip>{subscribed ? "Unsubscribe" : "Subscribe"}</Tooltip>
              }
              trigger={["hover", "focus"]}
            >
              <Button
                onClick={handleSubscribe}
                className="three-dot-dropdown"
                variant="secondary"
              >
                <img
                  src={
                    subscribed
                      ? "/images/subscribed.svg"
                      : "/images/not-subscribed.svg"
                  }
                  className="img-fluid heart-20p"
                  alt="subscribe"
                />
              </Button>
            </OverlayTrigger>
            {currentModel[0]?.model_created_by === user.email && (
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

                <Dropdown.Menu className="three-dot-dropdown-menu">
                  <Dropdown.Item onClick={() => setShowEditModelModal(true)}>
                    <img
                      src="/images/edit.svg"
                      className="img-fluid icon-list"
                      alt="edit"
                    />
                    Edit profile card
                  </Dropdown.Item>
                  {(filteredItems?.find(
                    (item) => item.status === "Published"
                  ) === undefined ||
                    filteredItems.length === 0) && (
                    <Dropdown.Item
                      onClick={() => setShowDeleteModelModal(true)}
                    >
                      <img
                        src="/images/trash.svg"
                        className="img-fluid icon-list"
                        alt="discard"
                      />
                      Delete profile
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </span>
        </div>
        <div className="d-flex labels">
          <div>
            <span>{modelTask}</span>
          </div>
          <div>
            <span>{modelGroup}</span>
          </div>
          <div>
            <span>
              <img
                src="/images/user_list.svg"
                className="img-fluid icon-list"
                alt="user"
              />
              {modelCreatedBy}
            </span>
          </div>
          <div>
            <span>{modelDateCreated}</span>
          </div>
        </div>
        <Tabs
          defaultActiveKey={
            tab === "2" ? "model-files-and-versions" : "model-profile-card"
          }
          id="model-tabs"
          className="mb-3"
        >
          <Tab
            eventKey="model-profile-card"
            tabClassName="tabs"
            title="Profile card"
          >
            <p className="bold">Description</p>
            <div className="ql-snow">
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{
                  __html: modelDescription,
                }}
              ></div>
            </div>
          </Tab>
          <Tab
            eventKey="model-files-and-versions"
            tabClassName="tabs"
            title="Files and versions"
          >
            <p className="bold">Versions</p>
            <Container className="mw-100">
              <DataTable
                className="model-versions-datatable"
                columns={userAllow ? columns1 : columns2}
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
            {/* <p className="bold">Linear graph</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              euismod bibendum laoreet. Proin gravida dolor sit amet lacus
              accumsan et viverra justo commodo. Proin sodales pulvinar sic
              tempor. Sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
              vulputate, felis tellus mollis orci, sed rhoncus pronin sapien
              nunc accuan eget.
            </p>
            {modelsAccuracy?.model_accuracy?.length > 1 && (
              <div>
                <LinearAreaChart modelsAccuracy={modelsAccuracy} />
              </div>
            )} */}
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default ModelProfile;
