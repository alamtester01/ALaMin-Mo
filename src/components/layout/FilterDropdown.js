import { compareValues } from "common/constants";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormCheck,
  Dropdown,
  Button,
} from "react-bootstrap";

const FilterDropdown = (props) => {
  import("../../styles/FilterDropdown.css");
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [showFullList, setShowFullList] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [emptyListMessage, setEmptyListMessage] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (selectedOptions.length === 0 && !expanded) {
      setSearchTerm("");
      setShowFullList(false);
      setStartIndex(0);
    }
  }, [selectedOptions.length, expanded]);

  const handleToggleExpand = (e) => {
    setExpanded(!expanded);
  };

  const handleToggleFullList = () => {
    setShowFullList(true);
    setStartIndex(0);
  };

  const handleNextPage = () => {
    const nextPageIndex = startIndex + 10;
    setStartIndex(nextPageIndex);
  };

  const handlePrevPage = () => {
    const prevPageIndex = startIndex - 10;
    setStartIndex(prevPageIndex);
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleClearSelection = () => {
    setSelectedOptions([]);
  };

  useEffect(() => {
    if (props?.name === "created_by") {
      const resultsArray = Object.values(selectedOptions).map(
        (option) =>
          Object.values(props?.options).find((opt) => opt.created_by === option)
            ?.email
      );
      props?.setSelectedOptions(resultsArray);
    } else {
      props?.setSelectedOptions(selectedOptions);
    }
  }, [selectedOptions]);

  useEffect(() => {
    if (props?.options) {
      if (props?.name === "groups") {
        setFilteredOptions(
          Object.values(props?.options)
            .filter((option) =>
              option.group_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item) => item.group_name)
            .sort((a, b) => {
              return compareValues(a, b, "asc");
            })
        );
      } else if (props?.name === "created_by") {
        setFilteredOptions(
          Object.values(props?.options)
            .filter((option) =>
              option.created_by.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item) => item.created_by)
            .sort((a, b) => {
              return compareValues(a, b, "asc");
            })
        );
      } else {
        setFilteredOptions(
          Object.values(props?.options)
            .filter((option) =>
              option.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
              return compareValues(a, b, "asc");
            })
        );
      }
    }
  }, [props?.options, searchTerm]);

  useEffect(() => {
    if (props?.name === "groups") {
      setEmptyListMessage("You don't have any groups.");
    } else if (props?.name === "subscriptions") {
      setEmptyListMessage("You have no model subscriptions");
    } else {
      setEmptyListMessage("No results.");
    }
  }, [props?.name]);

  useEffect(() => {
    if (props?.options.length < 1) {
      setSelectedOptions([]);
    } else {
      const updatedSelectedOptions = selectedOptions.filter((selected) =>
        props?.options.find((option) => option === selected)
      );
      setSelectedOptions(updatedSelectedOptions);
    }
  }, [props?.options]);

  const totalOptions = filteredOptions.length;
  const pageSize = 10;
  const visibleOptions = showFullList
    ? filteredOptions.slice(0, startIndex + pageSize)
    : filteredOptions.slice(0, 5);

  return (
    <Dropdown
      show={expanded}
      onToggle={handleToggleExpand}
      className="my-groups-dropdown"
    >
      <Dropdown.Toggle
        variant="outline-primary"
        className={expanded ? "button" : "my-groups-btn btn-outline-light"}
        id="dropdown-filter-toggle"
      >
        {props?.filterTitle}
        {selectedOptions[0] && ": " + selectedOptions[0]}
        {selectedOptions.length > 1 && (
          <span className="plus-filters-count">
            +{selectedOptions.length - 1}
          </span>
        )}
        <img
          src={
            expanded ? "/images/arrow_down_white.svg" : "/images/arrow_down.svg"
          }
          className="arrow-down img-fluid"
          alt="arrow down"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu className="my-groups-dropdown-menu">
        <Form>
          {filteredOptions.length === 0 ? (
            <p className="m-5 text-center">
              {props.options.length === 0
                ? emptyListMessage
                : "No matched results"}
            </p>
          ) : (
            <>
              <FormControl
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="input-search"
              />
              <div className="group-list-checkboxes">
                {visibleOptions.map((option) => (
                  <FormCheck
                    key={option}
                    label={option}
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                ))}
              </div>
              {totalOptions > 2 && !showFullList && (
                <div className="show-full-list">
                  <Button
                    variant="link"
                    className="gray-link"
                    onClick={handleToggleFullList}
                  >
                    Show full list
                  </Button>
                </div>
              )}
              {showFullList && (
                <div className="show-more">
                  {/* {startIndex > 0 && (
                    <Button variant="link" onClick={handlePrevPage}>
                      Show previous
                    </Button>
                  )} */}
                  {startIndex + pageSize < totalOptions && (
                    <Button
                      variant="link"
                      className="gray-link"
                      onClick={handleNextPage}
                    >
                      Show more
                    </Button>
                  )}
                </div>
              )}
              <div className="options-footer d-flex justify-content-between">
                <div>
                  {selectedOptions.length > 0 && (
                    <Button
                      variant="link"
                      className="gray-link"
                      onClick={handleClearSelection}
                    >
                      Clear Selection
                    </Button>
                  )}
                </div>
                {showFullList && (
                  <p className="showing-items">
                    {/* Showing {0 + 1} -{" "} */}
                    {Math.min(startIndex + pageSize, totalOptions)} of{" "}
                    {totalOptions}
                  </p>
                )}
              </div>
            </>
          )}
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default FilterDropdown;
