import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-haml";
import { Button, message } from "antd";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { copyToClipboard, uppercaseFL } from "yazz/utils/helpers";

export default function Routes({ data }) {
  const [code, setCode] = useState(``);

  useEffect(() => {
    let modelCamelCase = uppercaseFL(data.model_name, 1);
    let resultCode = `const checkToken = require("../helpers/checkToken");

module.exports = (app) => {
  const Controller = require("../controllers/${modelCamelCase}Controller.js");
  const router = require("express").Router();

  router.get("/", checkToken, Controller.getAll);
  router.get("/get", checkToken, Controller.getOne);
  router.post("/store", checkToken, Controller.store);
  router.delete("/destroy", checkToken, Controller.destroy);
  router.post("/update", checkToken, Controller.update);

  app.use("/api/${data.model_name.split("_").join("-")}", router);
};
    `;
    setCode(resultCode);
  }, [data]);

  return (
    <div className="fontf-code">
      <div className="flex justify-between">
        <p>{uppercaseFL(data.model_name, 1)}.js (Routes)</p>
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
