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
  update:()=>Promise<boolean>;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  formData,
  changeData,
  update,
}) => {
  const [form] = Form.useForm();

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {

       changeData({ createDate: date});
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
      onOk={async() => {
       const res=await update()

       console.log(res,"23112s");
       
        onCancel()
      }}
    >
      <Form
        className="from"
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
            <Radio.Group className="classification" value={formData.type} onChange={(e)=>{
               changeData({ type: e.target.value });
            }}>
              <Radio value={false}>技术</Radio>
              <Radio value={true}>生活</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <Form.Item label="封面图">
          <MyEditor content={formData.content} changeData={changeData} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { CollectionCreateForm };
