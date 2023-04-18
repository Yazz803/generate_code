import React, { useEffect, useState, useRef } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-haml";
import { Button, message } from "antd";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  copyToClipboard,
  handleDonwloadFile,
  uppercaseFL,
} from "yazz/utils/helpers";

export default function Model({ data }) {
  const [code, setCode] = useState(``);
  const textAreaRef = useRef(null);

  useEffect(() => {
    let resultCode = `module.exports = (sequelize, Sequelize) => {
  const Table = sequelize.define("${data.model_name}", {${data.columns
      .map((d) => {
        let data_type;
        switch (d.data_type) {
          case "character varying":
            data_type = "Sequelize.STRING,";
            break;
          case "character varying[]":
            data_type = "Sequelize.ARRAY(Sequelize.STRING),";
            break;
          case "text":
            data_type = "Sequelize.TEXT,";
            break;
          case "text[]":
            data_type = "Sequelize.ARRAY(Sequelize.TEXT),";
            break;
          case "date":
            data_type = "Sequelize.DATE,";
            break;
          case "date[]":
            data_type = "Sequelize.ARRAY(Sequelize.DATE),";
            break;
          case "integer":
            data_type = "Sequelize.INTEGER,";
            break;
          case "integer[]":
            data_type = "Sequelize.ARRAY(Sequelize.INTEGER),";
            break;
          case "bigint":
            data_type = "Sequelize.BIGINT,";
            break;
          case "bigint[]":
            data_type = "Sequelize.ARRAY(Sequelize.BIGINT),";
            break;
          case "boolean":
            data_type = "Sequelize.BOOLEAN,";
            break;
          case "boolean[]":
            data_type = "Sequelize.ARRAY(Sequelize.BOOLEAN),";
            break;
          case "double precision":
            data_type = "Sequelize.DOUBLE,";
            break;
          case "double precision[]":
            data_type = "Sequelize.ARRAY(Sequelize.DOUBLE),";
            break;
          default:
            break;
        }
        let autoIncrement = "";
        let primaryKey = "";
        let allowNull = "";
        let defaultValue = "";
        if (d.pk) {
          primaryKey = d.pk ? "\n\t\tprimaryKey: true," : "";
          autoIncrement = d.pk ? "\n\t\tautoIncrement: true," : "";
        }

        if (d.not_null) {
          allowNull = "\n\t\tallowNull: false,";
        }

        if (d.defaultValue) {
          defaultValue = `\n\t\tdefaultValue: "${d.defaultValue}",`;
          if (d.defaultValue === "false") {
            defaultValue = `\n\t\tdefaultValue: false,`;
          }
          if (d.defaultValue === "true") {
            defaultValue = `\n\t\tdefaultValue: true,`;
          }
          if (d.defaultValue.match(/^[0-9]+$/)) {
            defaultValue = `\n\t\tdefaultValue: ${d.defaultValue},`;
          }
        }

        return `
      ${d.column_name}: {
        ${"type: " + data_type + primaryKey + autoIncrement + allowNull + defaultValue}
      },`;
      })
      .join("")}
  },
  {
    freezeTableName: true,
  });
  return Table;
};
    `;
    setCode(resultCode);
  }, [data]);

  return (
    <div className="fontf-code">
      <div className="flex justify-between">
        <p>{uppercaseFL(data.model_name, 1)}.js (Model)</p>
        <div className="flex gap-2">
          <Button
            className="flex justify-end items-center mb-4 text-white"
            type="dashed"
            onClick={() =>
              handleDonwloadFile(code, uppercaseFL(data.model_name, 1))
            }
            icon={<DownloadOutlined />}
          >
            Download File
          </Button>
          <Button
            className="flex justify-end items-center mb-4 text-white"
            type="dashed"
            onClick={() => copyToClipboard(code)}
            icon={<CopyOutlined />}
          >
            Copy Code
          </Button>
        </div>
      </div>
      <Editor
        ref={textAreaRef}
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        className="text-sm border border-dashed bg-code-editor rounded"
      />
    </div>
  );
}
