import { useState } from "react";
import { DatePicker, Space, Input, Button } from "antd";
import "./index.less";

type SelectQueryProps = {
  title: string;//文章标题
  changeTitle?: (e: string) => void;//点击改变title
  onAdd?: () => void;//点击添加按钮
  onSearchClick?: () => void;//点击新增按钮
};

const { RangePicker } = DatePicker;

const SelectQuery = ({
  title,
  changeTitle,
  onAdd,
  onSearchClick,
}: SelectQueryProps) => {
  return (
    <div className="SelectQuery_root">
      <div className="from">
        <div className="optionlist">
          <Input
            placeholder="文章标题"
            value={title}
            className="option"
            onChange={(e) => changeTitle && changeTitle(e.target.value)}
          />
          {/* <RangePicker className="option" /> */}
        </div>
        <div className="buttonlist">
          <Button
            type="primary"
            onClick={() => onSearchClick && onSearchClick()}
          >
            搜索
          </Button>
          <Button type="primary" onClick={() => onAdd && onAdd()}>
            添加
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectQuery;
