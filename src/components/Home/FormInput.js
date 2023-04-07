import React from "react";
import { Button, Form, Input, Switch, Select, message } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { optionDataTypes } from "./DataType";

export default function FormInput({ setResultFormInput }) {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    setResultFormInput(values);
    console.log(values);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinishFailed={() => message.warning("Ada yang salah masbro")}
      onFinish={(values) => onSubmit(values)}
    >
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
          className="lg:w-[50%] costum-ui-input focus:border-none"
          placeholder="Nama Model"
          autoComplete="off"
        />
      </Form.Item>
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
                <Form.Item className="w-[35%] text-white">
                  <p>Name</p>
                </Form.Item>
                <Form.Item className="w-[35%] text-white">
                  <p>Data Type</p>
                </Form.Item>

                <Form.Item className="text-white">
                  <p>Not Null?</p>
                </Form.Item>
                <Form.Item className="text-white">
                  <p>Primary Key?</p>
                </Form.Item>
              </div>

              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="lg:flex mb-0 w-full gap-5 items-center"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "column_name"]}
                    className="lg:w-[35%] m-0"
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
                    className="lg:w-[35%] m-0"
                    rules={[
                      {
                        required: true,
                        message: "Missing Data Type",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select a person"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      className="border-none"
                      options={optionDataTypes}
                    />
                  </Form.Item>

                  <Form.Item {...restField} name={[name, "not_null"]}>
                    <Switch
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                      style={{
                        backgroundColor: "rgb(17 24 39)",
                      }}
                      className="text-white mr-6 mt-5"
                    />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "pk"]}>
                    <Switch
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                      style={{
                        backgroundColor: "rgb(17 24 39)",
                      }}
                      className="text-white mr-6 mt-5"
                    />
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
        <div className="flex justify-end mt-16">
          <Button htmlType="submit" className="text-white">
            Generate Code
          </Button>
        </div>
      </div>
    </Form>
  );
}
