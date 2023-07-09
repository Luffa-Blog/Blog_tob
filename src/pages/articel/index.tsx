import React, { useEffect, useState } from "react"
import { Divider, Radio, Table,Button } from "antd"
import type { ColumnsType } from 'antd/es/table';
import { articelSelect } from "../../api/articel"

interface DataType {
   key: React.Key;
   id: number;
   title: string;
   content: string;
   createDate: string;
   class: string;
   img: string;
}

// 表头
const columns: ColumnsType<DataType> = [
   {
      title: "Id",
      dataIndex: 'id',
   },
   {
      title: "标题",
      dataIndex: 'title',
   },
   {
      title: "内容",
      dataIndex: 'content',
   },
   {
      title: "创建时间",
      dataIndex: 'string',
   },
   {
      title: "分类",
      dataIndex: 'class',
   },
   {
      title: "封面图",
      dataIndex: 'img',
   }
]



const data: DataType[] = [];



const rts = () => {
   const articelSelectData = async () => {
      const resData = await articelSelect("", "")

      if (resData.code == 200) {

       return  resData.data.filter((item: DataType, index: number) => data.push(
            {
               key: index,
               id: item.id,
               title: item.title,
               content: item.content,
               createDate: item.createDate,
               class: item.class,
               img: item.img
            }
         ))


      }

   }



   useEffect(() => {
      const resdata = articelSelectData()

   }, [])



   return (
      <div>
         <div style={{ marginBottom: 16 }}>
            {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
               Reload
            </Button>
            <span style={{ marginLeft: 8 }}>
               {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span> */}
         </div>
         <Table columns={columns} dataSource={data} />
      </div>
   )
}
export default rts