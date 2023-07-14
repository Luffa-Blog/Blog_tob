import {
  Form,
  Input,
  Modal,
  Radio,
  DatePicker,
  type DatePickerProps,
  RadioChangeEvent,
  message,
} from "antd";
import MyEditor from "../WangEditor/index";
import "./index.less";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useState, useEffect } from "react";
import {articeladd} from "../../api/articel"

interface Values {
  title: string;
  description: string;
  modifier: string;
}
interface DataType {
  key: React.Key;
  id: number;
  title: string;
  content: string;
  createDate: string;
  class: string;
  type: boolean;
  img: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  formData: DataType;
  changeData: (data: any) => void;
  Initiator: string;
  update: () => Promise<boolean>;
  addlist: () => Promise<boolean>;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  Initiator,
  onCancel,
  formData,
  changeData,
  update,
  addlist,
}) => {
  const [form] = Form.useForm();

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    changeData({ createDate: date });
    console.log(date, dateString);
  };
  // const changeClassRadio = (e: RadioChangeEvent) => {

  //   changeClass(e.target.value);
  // };

  useEffect(() => {
    console.log(formData);
  }, []);

  return (
    <Modal
      className="modal"
      open={open}
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={async () => {
       
        switch (Initiator) {
          case "add":
            const addres = await addlist();
             if (addres) {
               message.success('添加成功');
               onCancel();
             } else {
               message.error("添加失败");
               onCancel();
             }
            return;
          case "update":
            const res = await update();
            if (res) {
              message.success("修改成功");
              onCancel();
            } else {
              message.error("修改失败");
              onCancel();
            }

            return;
        }
      }}
    >
      <Form
        className="from"
         name="formData"
        form={form}
        layout="vertical"
        initialValues={{ modifier: "public" }}
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
          >
            <Input
              placeholder="请输入名称"
              value={formData.title}
              onChange={(e) => {
                changeData({ title: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="封面图" className="fromItem">
            <Input
              placeholder="请输入封面图"
              value={formData.img}
              onChange={(e) => {
                changeData({ img: e.target.value });
              }}
            />
          </Form.Item>
        </div>
        <div className="row1">
          <Form.Item label="创建时间" className="fromItem">
            {/*  defaultValue={dayjs(getDate(), 'YYYY-MM-DD')}  */}
            <DatePicker
              onChange={onChange}
              value={dayjs(formData.createDate)}
              className="datepicker"
            />
          </Form.Item>

          <Form.Item label="分类" className="fromItem">
            <Radio.Group
              className="classification"
              value={formData.type}
              onChange={(e) => {
                changeData({ type: e.target.value });
              }}
            >
              <Radio value={false}>技术</Radio>
              <Radio value={true}>生活</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <Form.Item label="封面图" name="content">
          <MyEditor   />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { CollectionCreateForm };
