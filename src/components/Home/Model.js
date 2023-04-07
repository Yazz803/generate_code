import React, { useEffect, useState, useRef } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-haml";
import { Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { uppercaseFL } from "yazz/utils/helpers";

export default function Model({ data }) {
  const [code, setCode] = useState(``);
  const textAreaRef = useRef(null);

  useEffect(() => {
    let resultCode = `
module.exports = (sequelize, Sequelize) => {
  const ${uppercaseFL(data.model_name.split("_"), 1).join(
    ""
  )} = sequelize.define("${data.model_name}", {
    ${data.columns
      .map((d) => {
        let data_type;
        switch (d.data_type) {
          case "character varying":
            data_type = "Sequelize.STRING";
            break;
          case "character varying[]":
            data_type = "Sequelize.ARRAY(Sequelize.STRING)";
            break;
          case "text":
            data_type = "Sequelize.TEXT";
            break;
          case "text[]":
            data_type = "Sequelize.ARRAY(Sequelize.TEXT)";
            break;
          case "date":
            data_type = "Sequelize.DATE";
            break;
          case "date[]":
            data_type = "Sequelize.ARRAY(Sequelize.DATE)";
            break;
          case "integer":
            data_type = "Sequelize.INTEGER";
            break;
          case "integer[]":
            data_type = "Sequelize.ARRAY(Sequelize.INTEGER)";
            break;
          case "bigint":
            data_type = "Sequelize.BIGINT";
            break;
          case "bigint[]":
            data_type = "Sequelize.ARRAY(Sequelize.BIGINT)";
            break;
          case "boolean":
            data_type = "Sequelize.BOOLEAN";
            break;
          case "boolean[]":
            data_type = "Sequelize.ARRAY(Sequelize.BOOLEAN)";
            break;
          case "double precision":
            data_type = "Sequelize.DOUBLE";
            break;
          case "double precision[]":
            data_type = "Sequelize.ARRAY(Sequelize.DOUBLE)";
            break;
          default:
            break;
        }
        let autoIncrement = "";
        let primaryKey = "";
        let allowNull = "";
        if (d.pk) {
          primaryKey = d.pk ? "\n\t\t\tprimaryKey: true," : "";
          autoIncrement = d.pk ? "\n\t\t\tautoIncrement: true," : "";
        }

        if (d.not_null) {
          allowNull = "\n\t\t\tallowNull: false,";
        }

        return `
      ${d.column_name}: {
        ${"type: " + data_type + primaryKey + autoIncrement + allowNull}
      },
      `;
      })
      .join("")}
  });
  return ${uppercaseFL(data.model_name.split("_"), 1).join("")};
};
    `;
    setCode(resultCode);
  }, [data]);

  const copyToClipboard = () => {
    // Copy the content of the Editor component to the clipboard
    navigator.clipboard.writeText(code).then(
      () => {
        message.success("Code copied to clipboard");
      },
      () => {
        message.error("Failed to copy code to clipboard");
      }
    );
  };

  return (
    <div className="fontf-code">
      <div className="flex justify-between">
        <p>{uppercaseFL(data.model_name.split("_"), 1).join("")}.js (Model)</p>
        <Button
          className="flex justify-end items-center mb-4 text-white"
          type="dashed"
          onClick={copyToClipboard}
          icon={<CopyOutlined />}
        >
          Copy Code
        </Button>
      </div>
      <Editor
        ref={textAreaRef}
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        className="text-sm border border-dashed bg-gray-950 rounded"
      />
    </div>
  );
}
