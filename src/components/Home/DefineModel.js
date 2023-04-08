import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-haml";
import { Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { copyToClipboard, uppercaseFL } from "yazz/utils/helpers";

export default function DefineModel({ data }) {
  const [code, setCode] = useState(``);

  useEffect(() => {
    let modelCamelCase = uppercaseFL(data.model_name, 1);
    let resultCode = `db.${modelCamelCase} = require('./${modelCamelCase}.js')(sequelize, Sequelize)`;
    setCode(resultCode);
  }, [data]);

  return (
    <div className="fontf-code">
      <div className="flex justify-between">
        <p>index.js (Define Model)</p>
        <Button
          className="flex justify-end items-center mb-4 text-white"
          type="dashed"
          onClick={() => copyToClipboard(code)}
          icon={<CopyOutlined />}
        >
          Copy Code
        </Button>
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
