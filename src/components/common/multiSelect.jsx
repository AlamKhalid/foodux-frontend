import React, { useState, useEffect } from "react";
import $ from "jquery";
import MultiSelect from "react-multi-select-component";

const MultiSelectPopup = ({
  options,
  setOutput,
  label,
  id,
  name = "food",
  allLabel = "Entire Menu",
  value = [],
  storeId = false,
  edit = false,
}) => {
  const [refinedOptions, setRefinedOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    $(document).on("show.bs.modal", ".modal", function () {
      var zIndex = 1040 + 10 * $(".modal:visible").length;
      $(this).css("z-index", zIndex);
      setTimeout(function () {
        $(".modal-backdrop")
          .not(".modal-stack")
          .css("z-index", zIndex - 1)
          .addClass("modal-stack");
      }, 0);
    });
  }, []);

  useEffect(() => {
    setRefinedOptions(
      options.map((option) => {
        return { label: option.name, value: option._id };
      })
    );
  }, [options]);

  useEffect(() => {
    if (edit) {
      const key = storeId ? "value" : "label";
      setSelectedItems(
        refinedOptions.filter((option) => value.indexOf(option[key]) > -1)
      );
    }
  }, [edit, storeId, refinedOptions, value]);

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={`${id}Title`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title w-100 text-center text-uppercase add-spacing ml-5"
              id={`${id}Title`}
            >
              {label}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
          </div>
          <div
            className="modal-body"
            style={{ minHeight: "40vh", overflowY: "auto" }}
          >
            <MultiSelect
              options={refinedOptions}
              onChange={setSelectedItems}
              value={selectedItems}
              labelledBy={label}
              selectAllLabel={allLabel}
              overrideStrings={{
                selectSomeItems: label,
                allItemsAreSelected: allLabel,
                selectAll: allLabel,
                search: `Search ${name}...`,
              }}
            />
          </div>
          <div className="modal-footer">
            <button data-dismiss="modal" className="btn btn-secondary">
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => {
                if (storeId) setOutput(selectedItems.map((li) => li.value));
                else setOutput(selectedItems.map((li) => li.label));
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectPopup;
