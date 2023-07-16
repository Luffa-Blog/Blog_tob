import React, { useEffect, useState } from "react";
import { Divider, Radio, Table, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { articelSelect, articelUpdate, articelDelete } from "../../api/articel";
import SelectQuery from "../../components/SelectQuery/index";
import { CollectionCreateForm } from "../../components/CollectionCreateFrom/index";

import "./index.less";
import dayjs from "dayjs";

export interface DataType {
  key?: React.Key;
  id: number;
  title: string;
  content: string;
  createDate: string;
  class: string;
  type?: boolean;
  img: string;
}

const tableList_operate = () => {
  return;
};

// 表头
const rts = () => {
  const [formState, setFormState] = useState<{
    open: boolean;
    formdata?: any;
  }>({
    open: false,
  });

  const [loading,setLoading]=useState<boolean>(false)

  // 修改页面
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
         id: formData.id
      },
      formData.id
    );
    if (date.code == 200) {
      return true;
    }
    return false;
  };

  //   点击添加按钮

  const add = ():void => {
    //   Setopen(true);

    const data = {
      title: "",
      content: "",

      class: false,
      type: false,
      img: "",
    };
   //  setFromData(data as any);
  };
  //   点击修改按钮
  const modify = async (id: number | string) => {
    const resData = await articelSelect("", "", id);


    if (resData.code == 200) {
      const sss = resData.data?.map((item) => {
        return {
          key: item.id,
          id: item.id,
          title: item.title,
          content: item.content,
          createDate: dayjs(item.createDate, "YYYY-MM-DD"),
          class: item.class,
          type: item.class,
          img: item.img,
        };
      });
      setFormState({
        open: true,
        formdata: sss?.[0],
      });
    }
  };
  // 点击删除按钮
  const Delete = async (id: number) => {
    const res = await articelDelete(id);
    articelSelectData();

    // 重新触发查询更新
    return res.code === 200
      ? message.success("删除成功")
      : message.error("删除失败");
  };

  // 标题
  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",

      align: "center",
    },
    {
      title: <div>xxxx</div>,
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
      // render(_,row){
      //    enum TypeEnum  {
      //       Life = 'Life',
      //       Code = 'Code'
      //    }
      //    const typeEunmText = {
      //       [TypeEnum.Life]: '生活',
      //       [TypeEnum.Code]: '技术',
      //    } 
      //    return typeEunmText[row.class]
      // }
    },
    {
      title: "封面图",
      dataIndex: "img",
      align: "center",
      // render()
    },
    {
      title: "操作",
      dataIndex: "",
      align: "center",
      render: (_, { id }) => {
        const a = () => {
          console.log();
        };
      return(  <div className="operate">
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
              Delete(id);
            }}
          >
            删除
          </Button>
        </div>
        )
      },
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
    const data = { ...formData, ...valuex };

   //  setFormState({ open, formdata: data });
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
    const a = {
      a: 1,
      b: {
        c: 1,
      },
    };
    setFormState({ ...formState, formdata: { ...data } });
  };

  // const [date, setDate] = useState(new Date()); //创建时间x

  // 数据请求渲染
  const articelSelectData = async (title = "", data = "") => {
     setLoading(true)
    const resData = await articelSelect(title, data);
    

    if (resData.code == 200) {
      const sss = resData.data?.map((item: DataType):DataType => {
        return {
           id:item.id,
          title: item.title,
          content: item.content,
          createDate: item.createDate,
          class: item.class ? "生活" : "技术",
          img: item.img,
        };
      });

      setdatax(sss);
      setLoading(false);
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
          open={formState.open}
          initialValues={formState.formdata}
          onCancel={() => {
            setFormState({ open: false });
          }}
          onFinish={(value) => {
            setFormState({ ...formState, open: false });
          }}
        />

        <SelectQuery
          title={title}
          onSearchClick={articelSelectData}
          changeTitle={changeTitle}
          onAdd={add}
        />
      </div>

      <Table loading={loading} columns={columns} dataSource={datax} tableLayout="fixed" />
    </div>
  );
};
export default rts;
