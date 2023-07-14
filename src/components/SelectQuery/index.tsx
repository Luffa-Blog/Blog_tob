import { useState } from "react";
import { DatePicker, Space, Input, Button } from "antd";
import "./index.less";
import rq from "../../utils/axios/index";

const { RangePicker } = DatePicker;

const SelectQuery = (props: any) => {
    return (
      <div className="SelectQuery_root">
        <div className="from">
          <div className="optionlist">
            <Input
              placeholder="文章标题"
              value={props.title}
              className="option"
              onChange={(e) => props.changeTitle(e.target.value)}
            />
            {/* <RangePicker className="option" /> */}
          </div>
          <div className="buttonlist">
            <Button
              type="primary"
              onClick={() => props.articelSelectData(props.title)}
            >
              搜索
            </Button>

            <Button
              type="primary"
              className="add"
              onClick={() => props.add()}
            >
              新增
            </Button>
          </div>
        </div>
      </div>
    );
};

export default SelectQuery;
