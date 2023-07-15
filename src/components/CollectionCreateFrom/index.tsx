import {
  Form,
  Input,
  Modal,
  Radio,
  DatePicker,
  type DatePickerProps,
  RadioChangeEvent,
} from "antd";
import MyEditor from "../WangEditor/index";
import "./index.less";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useState, useEffect } from "react";
import {DataType} from "../../pages/articel/index"

interface Values {
  title: string;
  description: string;
  modifier: string;
}


interface CollectionCreateFormProps {
  open: boolean;
  initialValues?: DataType;
  onCancel: () => void;
  changeData: (data: any) => void;
  onFinish?: (values: any) => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  initialValues,
  onFinish,
  onCancel,
  changeData,
}) => {
  const [form] = Form.useForm();
  console.log(initialValues)
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {

       changeData({ createDate: date});
    console.log(date, dateString);
  };
  // const changeClassRadio = (e: RadioChangeEvent) => {

  //   changeClass(e.target.value);
  // };



  return (
    <Modal
      className="modal"
      open={open}
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={async () => {
        form.submit();
      }}
    >
      <Form
        className="from"
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onValuesChange={(_, allValues) => {
          console.log(allValues, "");
        }}
        onFinish={onFinish}
      >
        <div className="row1">
          <Form.Item
            className="fromItem"
            label="标题"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
            name="title"
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="封面图" className="fromItem" name="img">
            <Input placeholder="请输入封面图" />
          </Form.Item>
        </div>
        <div className="row1">
          <Form.Item label="创建时间" className="fromItem" name='createDate'>
             {/* defaultValue={dayjs(getDate(), 'YYYY-MM-DD')}  */}
            <DatePicker className="datepicker" />
          </Form.Item>
          <Form.Item label="分类" className="fromItem" name='class'>
            <Radio.Group className="classification">
              <Radio value={false}>技术</Radio>
              <Radio value={true}>生活</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <Form.Item label="deitors" name='content'>
          <MyEditor />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { CollectionCreateForm };
