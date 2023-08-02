import { useState } from "react";

const CustomHeader = (props) => {
  const [currentSort, setCurrentSort] = useState('');

  const handleSortChange = (value) => {
    setCurrentSort(value);
    props?.sort(props?.column.selector, value);
  };

  return (
    <div>
      {props?.column.name}
      <select value={currentSort} onChange={(e) => handleSortChange(e.target.value)}>
        <option value="">Sort from A to Z</option>
        <option value="asc">Sort from A to Z</option>
        <option value="desc">Sort from Z to A</option>
      </select>
    </div>
  );
};


export default CustomHeader;