import React from "react";
//import axios from "axios";
//import { URL_COMMENTS } from "./queries";

const statusC = {
  AP: "",
  RJ: "This comment is rejected",
  PD: "Under analysis",
};

function CommentsList({ commentsList }) {
  // const [list, setList] = useState({});

  // const getList = async () => {
  //   const result = await axios.get(`${URL_COMMENTS}/posts/${postID}/comments`);
  //   setList(result.data);
  // };

  // useEffect(() => {
  //   getList(); // eslint-disable-next-line
  // }, []);
  const noticeRJ = {
    color: "red",
    fontSize: "1rem",
    fontWeight: "100",
  };
  const noticeAP = {
    fontSize: "1rem",
    fontWeight: "500",
  };

  return (
    <div className="commentsList-container">
      <ul className="commentsList-post">
        {commentsList.map(({ id, content, status }) => (
          <div key={id}>
            <span style={status === "REJECTED" ? noticeRJ : noticeAP}>
              <li>{content}</li>
              {status === "PENDING"
                ? statusC.PD
                : status === "APPROVED"
                ? statusC.AP
                : statusC.RJ}
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default CommentsList;
