import { ArrowDownOutlined } from "@ant-design/icons";
import FormInput from "./Home/FormInput";
import { useState } from "react";
import Model from "./Home/Model";
import Routes from "./Home/Routes";
import Controller from "./Home/Controller";

export default function Home() {
  const [resultFormInput, setResultFormInput] = useState({});
  console.log(resultFormInput);
  return (
    <section class="body-font text-white">
      <div class="max-w-5xl pt-20 pb-24 mx-auto">
        <h1 class="text-3xl text-center font-4 lh-6 ld-04 font-bold mb-6">
          Generate CRUD Express JS API with Sequelize ORM
        </h1>
        <h2 class="text-xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-700 text-center">
          Buat Project pribadi doang hehe
        </h2>
        <h3 className="flex justify-center items-center gap-2 text-xl font-semibold mb-32">
          Scroll Down <ArrowDownOutlined />
        </h3>

        <div className="border rounded p-5 mb-10">
          <FormInput setResultFormInput={setResultFormInput} />
        </div>

        {resultFormInput.columns && (
          <>
            <p className="text-red-500 text-center">
              Jangan lupa define Model dan route nya di file index.js (Model)
              dan app.js(Route)
            </p>

            <div className="border rounded p-5 mb-8">
              <Model data={resultFormInput} />
            </div>

            <div className="border rounded p-5 mb-8">
              <Routes data={resultFormInput} />
            </div>

            <div className="border rounded p-5">
              <Controller data={resultFormInput} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
