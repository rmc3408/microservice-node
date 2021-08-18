import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL_COMMENTS } from "./queries";
//import { Row, Col } from "antd";

function CommentsList({postID}) {
  const [list, setList] = useState({});

  const getList = async () => {
    const result = await axios.get(`${URL_COMMENTS}/posts/${postID}/comments`);
    setList(result.data);
  };

  useEffect(() => {
    getList(); // eslint-disable-next-line
  }, []); 

  return (
    <div className="commentsList-container">
      {Object.values(list).map(({ id, content }) => (
        <ul key={id} className="commentsList-post">
          <li>{content}</li>
        </ul>
      ))}
    </div>
  );
}

export default CommentsList;
