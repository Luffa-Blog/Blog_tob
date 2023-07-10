import { DatePicker, Space, Input, Button } from "antd";
import "./index.less";

const { RangePicker } = DatePicker;

const SelectQuery = () => {
  return (
    <div className="SelectQuery_root">
      <div className="from">
        <div className="optionlist">
          <Input placeholder="请输入" className="option" />
          <RangePicker className="option" />
        </div>
        <div className="buttonlist">
          <Button type="primary">搜索</Button>
          <Button type="primary" danger>
            删除
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectQuery;
