import React, { useState, useEffect } from "react";

import { Column } from "@ant-design/plots";

const DemoColumn = ({data}) => {
  console.log(data)

  const config = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: "type",
      },
      value: {
        alias: "sales",
      },
    },
  };
  return <Column {...config} />;
};

export default DemoColumn;