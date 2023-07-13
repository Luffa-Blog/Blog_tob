import React, { useEffect, useState } from "react";
import { Divider, Radio, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { articelSelect, articelUpdate } from "../../api/articel";
import SelectQuery from "../../components/SelectQuery/index";
import { CollectionCreateForm } from "../../components/CollectionCreateFrom/index";

import "./index.less";

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

// 表头
const rts = () => {
  // 修改页面
  const [open, Setopen] = useState<boolean>(false);
  const [formData, setFromData] = useState<DataType>({
    title: "123",
    key: 0,
    id: 0,
    content: "312",
    createDate: "231",
    class: "312",
    type: false,
    img: "321xw",
  });

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    Setopen(false);
  };

  //   修改完毕进行提交

  const update = async ():Promise<boolean> => {
    const date = await articelUpdate(
      {
        title: formData.title,
        content: formData.content,
        createDate: formData.createDate,
        class: formData.class,
        img: formData.img,
      },
      formData.id
    );
    if(date.code==200){

      return true
    } 
    return false

  };
  //   点击修改
  const modify = async (id: number | string) => {
    const resData = await articelSelect("", "", id);

    if (resData.code == 200) {
      const sss = resData.data.map((item: DataType, index: number) => {
        return {
          key: item.id,
          id: item.id,
          title: item.title,
          content: item.content,
          createDate: item.createDate,
          class: item.class,
          type: item.class,
          img: item.img,
        };
      });

      await setFromData(sss[0]);
    }
    await Setopen(true);
  };

  // 标题
  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",

      align: "center",
    },
    {
      title: "标题",
      dataIndex: "title",
      align: "center",
    },
    {
      title: "内容",
      dataIndex: "content",
      align: "center",
    },
    {
      title: "创建时间",
      dataIndex: "createDate",
      align: "center",
    },
    {
      title: "分类",
      dataIndex: "class",
      align: "center",
    },
    {
      title: "封面图",
      dataIndex: "img",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "",
      align: "center",
      render: (_, { id }) => (
        <div className="operate">
          <Button
            type="primary"
            className="btn update"
            onClick={() => {
              modify(id);
            }}
          >
            修改
          </Button>
          <Button
            type="primary"
            danger
            className="btn delete"
            onClick={() => {
              console.log(id);
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];
  // 要渲染到table到数据
  const [datax, setdatax] = useState<DataType[]>();

  const [title, setTitle] = useState<string>("");

  // 查询
  const changeTitle = (text: string) => {
    setTitle(text);
  };

  //修改文章
  const changeData = (valuex: DataType) => {
    setFromData({ ...formData, ...valuex });
  };
  //   修改分类选择
  const changeClass = (value: boolean) => {
    const data: DataType = {
      key: formData.id,
      id: formData.id,
      title: formData.title,
      content: formData.content,
      createDate: formData.createDate,
      class: value ? "技术" : "生活",
      type: value,
      img: formData.img,
    };
    setFromData(data);
  };

  // const [date, setDate] = useState(new Date()); //创建时间x

  // 数据请求渲染
  const articelSelectData = async (title = "", data = "") => {
    const resData = await articelSelect(title, data);

    if (resData.code == 200) {
      const sss = resData.data.map((item: DataType, index: number) => {
        return {
          key: item.id,
          id: item.id,
          title: item.title,
          content: item.content,
          createDate: item.createDate,
          class: item.class ? "生活" : "技术",
          type: item.class,
          img: item.img,
        };
      });

      setdatax(sss);
      // setdatax()
      console.log(datax);
    }
  };

  useEffect(() => {
    articelSelectData();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <CollectionCreateForm
          open={open}
          onCreate={() => onCreate}
          onCancel={() => {
            Setopen(false);
          }}
          formData={formData}
          changeData={changeData}
          update={update}
          //  changeClass={changeClass}
          //   setFromData={setFromData}
        />

        <SelectQuery
          title={title}
          articelSelectData={articelSelectData}
          changeTitle={changeTitle}
        />
      </div>

      <Table columns={columns} dataSource={datax} tableLayout="fixed" />
    </div>
  );
};
export default rts;
