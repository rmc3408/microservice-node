import React from "react";
//import axios from "axios";
//import { URL_COMMENTS } from "./queries";

function CommentsList({ commentsList }) {
  // const [list, setList] = useState({});

  // const getList = async () => {
  //   const result = await axios.get(`${URL_COMMENTS}/posts/${postID}/comments`);
  //   setList(result.data);
  // };

  // useEffect(() => {
  //   getList(); // eslint-disable-next-line
  // }, []);

  return (
    <div className="commentsList-container">
      <ul className="commentsList-post">
        {commentsList.map(({ id, content }) => (
          <li key={id}>{content}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommentsList;
