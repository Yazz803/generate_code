import React, { useState, useEffect } from "react";
import { Popover, Button, message } from "antd";
import { HistoryOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash/core";

export default function HistoryCode(props) {
  const [historyCode, setHistoryCode] = useState([]);
  useEffect(() => {
    getHistoryCode();
  }, [props.resultFormInput]);
  const getHistoryCode = () => {
    setHistoryCode(JSON.parse(localStorage.getItem("historyCode")) || []);
  };
  return (
    <Popover
      content={
        <>
          <div className="overflow-scroll h-[150px]">
            {!_.isEmpty(historyCode) ? (
              historyCode
                .map((d, key) => (
                  <div className="mb" key={key}>
                    <button className="flex items-center justify-between gap-3">
                      <DeleteOutlined
                        className="text-red-600"
                        onClick={() => {
                          // delete history code from local storage
                          let historyCode = JSON.parse(
                            localStorage.getItem("historyCode")
                          );
                          historyCode.splice(key, 1);
                          localStorage.setItem(
                            "historyCode",
                            JSON.stringify(historyCode)
                          );
                          getHistoryCode(
                            JSON.parse(localStorage.getItem("historyCode"))
                          );
                          message.warning("History Code Deleted");
                        }}
                      />{" "}
                      <p
                        className="m-0"
                        onClick={() => {
                          props.setResultFormInput(d);
                          props.setSingleHistory(d);
                          message.success("History Code Loaded");
                        }}
                      >
                        Model : {d.model_name}
                      </p>
                    </button>
                    <br />
                  </div>
                ))
                .reverse()
            ) : (
              <p className="text-center">No History Code</p>
            )}
          </div>
        </>
      }
      placement="bottomRight"
      trigger="click"
    >
      <Button className="text-white flex items-center">
        <HistoryOutlined /> History Code
      </Button>
    </Popover>
  );
}
