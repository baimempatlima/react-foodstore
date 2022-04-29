import React, { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";

const categoryInit = [{ name: "Default" }];
export default function Category({ categoryData, setCategorySend }) {
  const [categorySelect, setCategorySelect] = useState(categoryInit[0]);

  useEffect(() => {
    setCategorySend(categorySelect);
  }, [setCategorySend, categorySelect]);
  return (
    <div>
      <Listbox as="div" value={categorySelect} onChange={setCategorySelect}>
        <Listbox.Button className="btn-lg " style={{ fontSize: "14px", display: "inline" }}>
          {categorySelect.name}
          {categorySelect.name === categoryInit[0].name ? (
            <div style={{ display: "inline" }} className="marginx">
              <i className="fa-solid fa-caret-down"></i>
            </div>
          ) : (
            <div style={{ display: "inline" }} className="marginx" onClick={() => setCategorySelect(categoryInit[0])}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          )}
        </Listbox.Button>
        <Listbox.Options className=" text-start dropdownop">
          {categoryData.map((category) => (
            <Listbox.Option key={category._id} value={category} className="text-start dropdownopop">
              {category.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
