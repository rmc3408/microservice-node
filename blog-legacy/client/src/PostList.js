import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL_EVENT_QUERY } from "./queries";
import { Row, Col } from "antd";
import CommentsCreate from "./CommentsCreate";
import CommentsList from "./CommentsList";

function PostList() {
  const [list, setList] = useState({});

  const getList = async () => {
    const result = await axios.get(URL_EVENT_QUERY);
    setList(result.data);
  };

  useEffect(() => {
    getList();
    
  }, []);

  return (
    <Row className="postList-container" gutter={[32, 32]} align="middle">
      {Object.values(list).map(({ id, title, comments }) => (
        <Col span={5} key={id} className="postList-post">
          <h3>{title}</h3>
          <CommentsList commentsList={comments}/>
          <CommentsCreate postID={id}/>
        </Col>
      ))}
    </Row>
  );
}

export default PostList;
