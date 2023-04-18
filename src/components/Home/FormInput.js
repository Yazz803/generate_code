import React, { useState, useEffect } from "react";
import { Button, Form, Input, Switch, Select, message, Popover } from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  HistoryOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { optionDataTypes } from "./DataType";
import HistoryCode from "./HistoryCode";

export default function FormInput({ resultFormInput, setResultFormInput }) {
  const [form] = Form.useForm();
  const [historyCode, setHistoryCode] = useState([]);
  const [singleHistory, setSingleHistory] = useState({});

  const onSubmit = (values) => {
    if (values.columns.length === 0) return;
    values = {
      ...values,
      create: values.create ?? true,
      read: values.read ?? true,
      update: values.update ?? true,
      delete: values.delete ?? true,
    };

    setResultFormInput(values);
    message.success("Generate Code Successfully!");

    // simpan histroy code ke local storage dan jika terdapat model_name yang sama maka akan di replace
    let historyCode = JSON.parse(localStorage.getItem("historyCode")) || [];
    let index = historyCode.findIndex(
      (d) => d.model_name === values.model_name
    );
    if (index !== -1) {
      historyCode.splice(index, 1);
    }
    historyCode.push(values);
    localStorage.setItem("historyCode", JSON.stringify(historyCode));

    console.log("bang", values);

    // form.resetFields();
  };

  const initialValues = {
    ...singleHistory,
    create: singleHistory.create,
    read: singleHistory.read,
    update: singleHistory.update,
    delete: singleHistory.delete,
  };

  useEffect(() => form.resetFields(), [form, singleHistory]);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinishFailed={() => message.warning("Ada yang salah masbro")}
      onFinish={(values) => onSubmit(values)}
      initialValues={initialValues}
    >
      <div className="flex items-baseline justify-between">
        <Form.Item
          required
          label="Masukan Nama Model (eg: users, contact_groups)"
          name="model_name"
          rules={[
            {
              required: true,
              message: "Missing Model Name",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || value.match(/^[a-zA-Z_]+$/)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "Model Name hanya boleh mengandung huruf dan underscore"
                  )
                );
              },
            }),
          ]}
        >
          <Input
            className=" costum-ui-input focus:border-none"
            placeholder="Nama Model"
            autoComplete="off"
          />
        </Form.Item>

        <HistoryCode
          resultFormInput={resultFormInput}
          setResultFormInput={setResultFormInput}
          setSingleHistory={setSingleHistory}
          singleHistory={singleHistory}
        />
      </div>
      <div className="border border-dashed rounded p-5 ">
        <Form.List name="columns">
          {(fields, { add, remove }) => (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-xl">Columns</p>
                <Button
                  className="text-white"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                />
              </div>

              <div className="flex mb-0 w-full gap-5 align-baseline">
                <Form.Item className="w-[32%] text-white">
                  <p>Name</p>
                </Form.Item>
                <Form.Item className="w-[32%] text-white">
                  <p>Data Type</p>
                </Form.Item>

                <Form.Item className=" text-white">
                  <p>Not Null?</p>
                </Form.Item>
                <Form.Item className=" text-white">
                  <p>Primary Key?</p>
                </Form.Item>
                <Form.Item className="w-[28%] text-white">
                  <p>Default</p>
                </Form.Item>
              </div>

              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="md:flex mb-0 w-full gap-5 items-center"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "column_name"]}
                    className="md:w-[35%] m-0"
                    rules={[
                      {
                        required: true,
                        message: "Missing Column Name",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || value.match(/^[a-zA-Z_]+$/)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "Column Name hanya boleh mengandung huruf dan underscore"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input
                      placeholder="Name Column"
                      className="costum-ui-input"
                      autoComplete="off"
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "data_type"]}
                    className="md:w-[35%] m-0 text-white"
                    rules={[
                      {
                        required: true,
                        message: "Missing Data Type",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select Data Type"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={optionDataTypes}
                      dropdownRender={(menu) => {
                        return (
                          <div className="bg-gray-900 text-white">{menu}</div>
                        );
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "not_null"]}
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                      style={{
                        backgroundColor: "rgb(17 24 39)",
                      }}
                      className="text-white mr-6 mt-5"
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "pk"]}
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                      style={{
                        backgroundColor: "rgb(17 24 39)",
                      }}
                      className="text-white mr-6 mt-5"
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "defaultValue"]}
                    className="md:w-[25%] m-0"
                  >
                    <Input className="costum-ui-input" autoComplete="off" />
                  </Form.Item>
                  <MinusCircleOutlined
                    className="text-red-600 text-2xl"
                    onClick={() => remove(name)}
                  />
                </div>
              ))}
            </>
          )}
        </Form.List>
        <div className="md:flex justify-between mt-16">
          <p className="text-xl">
            Set Controller <ArrowRightOutlined />
          </p>
          <div className="flex">
            <Form.Item label="Create" name="create" valuePropName="checked">
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                defaultChecked={true}
                style={{
                  backgroundColor: "rgb(17 24 39)",
                }}
                className="text-white mr-6 mt-5"
              />
            </Form.Item>
            <Form.Item label="Read" name="read" valuePropName="checked">
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                defaultChecked={true}
                style={{
                  backgroundColor: "rgb(17 24 39)",
                }}
                className="text-white mr-6 mt-5"
              />
            </Form.Item>
            <Form.Item label="Update" name="update" valuePropName="checked">
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                defaultChecked={true}
                style={{
                  backgroundColor: "rgb(17 24 39)",
                }}
                className="text-white mr-6 mt-5"
              />
            </Form.Item>
            <Form.Item label="Delete" name="delete" valuePropName="checked">
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                defaultChecked={true}
                style={{
                  backgroundColor: "rgb(17 24 39)",
                }}
                className="text-white mr-6 mt-5"
              />
            </Form.Item>
          </div>
          <Button htmlType="submit" className="text-white">
            Generate Code
          </Button>
        </div>
      </div>
    </Form>
  );
}
