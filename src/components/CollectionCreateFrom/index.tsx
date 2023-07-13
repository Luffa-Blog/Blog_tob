import { Form, Input, Modal, Radio, DatePicker, type DatePickerProps } from "antd";
import MyEditor from "../WangEditor/index"
import "./index.less"
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useState,useEffect} from "react";
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
   img: string;
}

interface CollectionCreateFormProps {

  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  formData:DataType
}

const getDate = (): string => {
  const date = new Date();

  
  const formattedDate = date.toISOString().slice(0, 10);

  return formattedDate;
};

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  formData,

}) => {
  const [form] = Form.useForm();



  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    
    console.log(date, dateString);
  };

  useEffect(()=>{
    console.log(formData,123123);
    
  },[])

  return (
    <Modal
      className="modal"
      open={open}

      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
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
            
            <Input placeholder="请输入名称" value={12312312}  />
          </Form.Item  >
          <Form.Item label="封面图"   className="fromItem">
            <Input placeholder="请输入封面图" value={formData.img} />
          </Form.Item>
        </div>
        <div className="row1">
          <Form.Item label="创建时间" className="fromItem" >
            {/*  defaultValue={dayjs(getDate(), 'YYYY-MM-DD')}  */}
            <DatePicker onChange={onChange} className="datepicker"/>
          </Form.Item>
          <Form.Item
            label="分类"
            className="fromItem"
          >
            <Radio.Group className="classification" >
              <Radio value="public">技术</Radio>
              <Radio value="private">生活</Radio>
            </Radio.Group>
          </Form.Item>
        </div>


        <Form.Item label="封面图">

          <MyEditor />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { CollectionCreateForm };
