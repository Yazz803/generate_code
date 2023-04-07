import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-haml";
import { Model } from "./Model";
import { Routes } from "./Routes";
import { Controller } from "./Controller";
import { Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";

export default function ResultCode({ data, type }) {
  let codingan;

  // return console.log(<Model />);
  switch (type) {
    case "model":
      codingan = Model;
      break;
    case "routes":
      codingan = Routes;
      break;
    case "controller":
      codingan = Controller;
      break;
    default:
      break;
  }
  const [code, setCode] = useState(codingan);

  useEffect(() => {
    setCode(codingan);
  }, [data, codingan]);

  return (
    <div className="fontf-code">
      <div className="flex justify-between">
        <p>
          {data.model_name}.js ({type})
        </p>
        <Button
          className="flex justify-end items-center mb-4 text-white"
          type="dashed"
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
        className="text-sm border border-dashed bg-gray-950 rounded"
      />
    </div>
  );
}
