import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-haml";
import { Button, message } from "antd";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  copyToClipboard,
  uppercaseFL,
  handleDonwloadFile,
} from "yazz/utils/helpers";

export default function Controller({ data }) {
  const [code, setCode] = useState(``);

  useEffect(() => {
    let modelCamelCase = uppercaseFL(data.model_name, 1);
    let resultCode = `const tbl = require("../models");
const Model = tbl.${modelCamelCase};

${
  data.read
    ? `exports.getAll = async (req, res) => {
  try {
    let data = await Model.findAll();
    if (data) {
      return res.json({
        success: true,
        data: data,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error,
    });
  }
};

exports.getOne = async (req, res) => {
  let { id } = req.query;

  try {
    let data = await Model.findOne({
      where: { id },
    });
    if (data) {
      return res.json({
        success: true,
        data: data,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error,
    });
  }
};
`
    : ""
}
${
  data.create
    ? `exports.store = async (req, res) => {
  let data = {
    ${data.columns
      .map((d) => {
        if (d.column_name !== "id") {
          return `${d.column_name}: req.body.${d.column_name},`;
        }
      })
      .join("\n\t")}
  }

  try {
    let data = await Model.create(data);
    if (data) {
      return res.json({
        success: true,
        message: "Berhasil menambah ${modelCamelCase}",
        data: data,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error,
    });
  }
};
`
    : ""
}
${
  data.update
    ? `exports.update = async (req, res) => {
  let data = {
    ${data.columns
      .map((d) => {
        return `${d.column_name}: req.body.${d.column_name},`;
      })
      .join("\n\t")}
  }

  try {
    let data = await Model.update(data, { where: { data.id } });
    if (data) {
      return res.json({
        success: true,
        message: "Berhasil mengubah ${modelCamelCase}",
        data,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error,
    });
  }
};
`
    : ""
}
${
  data.delete
    ? `exports.destroy = async (req, res) => {
  let { id } = req.query;
  try {
    let data = await Model.destroy({
      where: {
        id: id,
      },
    });
    if (data) {
      return res.json({
        success: true,
        message: "Berhasil menghapus ${modelCamelCase}",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error,
    });
  }
};
`
    : ""
}
    `;
    setCode(resultCode);
  }, [data]);

  return (
    <div className="fontf-code">
      <div className="flex justify-between">
        <p>{uppercaseFL(data.model_name, 1)}Controller.js (Controller)</p>
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
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        className="text-sm border border-dashed bg-code-editor rounded"
      />
    </div>
  );
}
