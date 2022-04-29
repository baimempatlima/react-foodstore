import React, { useEffect, useState } from "react";

export default function Tags({ tagsData, setTagSend }) {
  const [tags, setTags] = useState([]);
  const tagToogle = (tag) => {
    try {
      let newTagsData = tagsData;
      if (tagsData.find((item) => item._id === tag._id)) {
        const status = tags.filter((item) => item._id === tag._id);

        if (status.length === 0) {
          newTagsData = [...tags, tag];
        } else {
          newTagsData = tags.filter((item) => item._id !== tag._id);
        }
      } else {
        newTagsData = [...tags];
      }

      setTags(newTagsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTagSend(tags);
  }, [setTagSend, tags]);
  return (
    <div className="flex-container items-center mx-auto justify-content-center">
      {tagsData.map((tag) => (
        <button key={tag._id} type="button" style={{ fontSize: "12px", borderRadius: "15px" }} className={`${tags.find((item) => item._id === tag._id) ? "btn bg-warning" : "btn btn-outline-dark"} m-2 `} onClick={() => tagToogle(tag)}>
          {tag.name}
        </button>
      ))}
    </div>
  );
}
