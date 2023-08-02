export const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    // ["link", "image"],
    ["clean"], // remove formatting button
  ],
};

export const formats = [
  "background",
  "bold",
  "color",
  "font",
  "code",
  "italic",
  "link",
  "size",
  "strike",
  "script",
  "underline",
  "blockquote",
  "header",
  "intent",
  "list",
  "align",
  "direction",
  "code-block",
  "formula",
  // "image",
  // "video",
];

export const compareValues = (a, b, sortDirection) => {
  const regex = /(\D+)|(\d+)/g; // Regular expression to match non-digits and digits globally
  const partsA = a.match(regex); // Extract all non-digit and digit parts from string 'a'
  const partsB = b.match(regex); // Extract all non-digit and digit parts from string 'b'

  // Compare each part separately
  for (let i = 0; i < Math.min(partsA.length, partsB.length); i++) {
    const partA = partsA[i];
    const partB = partsB[i];

    const isDigitA = !isNaN(parseInt(partA)); // Check if partA is a digit
    const isDigitB = !isNaN(parseInt(partB)); // Check if partB is a digit

    if (isDigitA && isDigitB) {
      const intA = parseInt(partA);
      const intB = parseInt(partB);

      if (intA !== intB) {
        return sortDirection === "asc" ? intA - intB : intB - intA; // Compare numeric parts
      }
    } else if (!isDigitA && !isDigitB) {
      const cmp =
        sortDirection === "asc"
          ? partA.localeCompare(partB)
          : partB.localeCompare(partA);

      if (cmp !== 0) {
        return cmp; // Compare non-numeric parts
      }
    } else {
      // Numeric parts should come before non-numeric parts
      return (sortDirection === "asc" ? isDigitA : isDigitB) ? -1 : 1;
    }
  }

  // If all parts are the same, compare the original strings
  return sortDirection === "asc" ? a.localeCompare(b) : b.localeCompare(a);
};

export const convertDate = (param) => {
  const dateString = param;
  const date = new Date(dateString);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear());

  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
};
