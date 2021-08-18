import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { URL_COMMENTS } from "./queries";

function CommentsCreate({ postID }) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    //console.log("Successful comment:", values);
    await axios.post(
      `${URL_COMMENTS}/posts/${postID}/comments`,
      values
    );
    form.setFieldsValue({ content: "" });
  };

  return (
    <div>
      <Form
        name="createComment"
        layout="inline"
        size="small"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="New Comment"
          name="content"
          style={{ width: "80%" }}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ width: "10%" }}>
          <Button htmlType="submit" style={{ backgroundColor: "#b7eb8f" }}>
            send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CommentsCreate;
