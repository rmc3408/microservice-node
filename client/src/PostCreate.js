import React from "react";
import { Form, Input, Button, Typography } from "antd";
import axios from "axios";
import { URL_POSTS } from "./queries";

const { Title } = Typography;

function PostCreate() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Success:", values);
    const result = await axios.post(URL_POSTS + "/posts", values);
    console.log("axios results = ", result.data);
    form.setFieldsValue({ title: "" });
  };

  return (
    <div style={{ width: "100%", padding: '1rem' }}>
      <Form
        name="createPost"
        layout="inline"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Title type="success">Create Post</Title>
        <Form.Item
          label="Title"
          name="title"
          labelCol={{ offset: 4 }}
          wrapperCol={{ offset: 1, span: 24 }}
          style={{ marginTop: 'auto', marginBottom: 'auto' }}
        >
          <Input style={{ width: '400px' }} />
          <Button htmlType="submit" style={{ backgroundColor: '#b7eb8f' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PostCreate;
