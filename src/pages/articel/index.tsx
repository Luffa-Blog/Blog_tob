import React, { useEffect, useState } from "react";
import { Divider, Radio, Table, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  articelSelect,
  articelUpdate,
  articeladd,
  articeldel,
} from "../../api/articel";
import SelectQuery from "../../components/SelectQuery/index";
import { CollectionCreateForm } from "../../components/CollectionCreateFrom/index";

import "./index.less";
import dayjs from "dayjs";

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
    title: "",
    key: 0,
    id: 0,
    content: "",
    createDate: dayjs(new Date()).toString(),
    class: "",
    type: false,
    img: "",
  });

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    Setopen(false);
  };

  //   修改完毕进行提交

  const update = async (): Promise<boolean> => {
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
    if (date.code == 200) {
      return true;
    }
    return false;
  };
  // 新增数据
  const addlist = async (): Promise<boolean> => {
    const date = await articeladd({
      title: formData.title,
      content: formData.content,
      createDate: formData.createDate,
      class: formData.class,
      img: formData.img,
    });
    if (date.code == 200) {
      return true;
    }
    return false;
  };

  //   删除数据
  const del = async (id: number): Promise<boolean> => {
    const res = await articeldel(id);

    if ((res.code = 200)) {
      return true;
    }
    return false;
  };

  //   点击新增

  const add = async () => {
    await setInitiator("add");
    const data = {
      title: "",
      key: 0,
      id: 0,
      content: "",
      createDate: dayjs(new Date()).toString(),
      class: "",
      type: false,
      img: "",
    };

    await setFromData({ ...formData, ...data });

    await Setopen(true);
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

      await setFromData({ ...formData, ...sss[0] });

      // await setFromData({ ...formData,...{content:"<p> 123312123</p>"} });
      await Setopen(true);
      console.log(formData);
      setInitiator("update");
    }
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
            onClick={async () => {
              const res = await del(id);
              if (res) {

                 articelSelectData();
               return  message.success("删除成功");
              }
              return message.error("删除失败");
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

  const [Initiator, setInitiator] = useState<string>("update");

  // 查询
  const changeTitle = (text: string) => {
    setTitle(text);
  };

  //修改文章
  const changeData = (valuex: DataType) => {
    setFromData({ ...formData, ...valuex });
  };

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
          Initiator={Initiator}
          onCreate={() => onCreate}
          onCancel={() => {
            Setopen(false);
          }}
          formData={formData}
          changeData={changeData}
          update={update}
          addlist={addlist}
          //  changeClass={changeClass}
          //   setFromData={setFromData}
        />

        <SelectQuery
          title={title}
          articelSelectData={articelSelectData}
          changeTitle={changeTitle}
          add={add}
        />
      </div>

      <Table columns={columns} dataSource={datax} tableLayout="fixed" />
    </div>
  );
};
export default rts;
