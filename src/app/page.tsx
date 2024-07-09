"use client";
import { FormEvent, useEffect, useState } from "react";
import {
  DEFAULT_VALUE,
  DISTRIBUTION_CENTER,
  PAYMENT_TYPE,
  PRODUCT_LIST,
} from "@/data";
import { fetchData } from "@/lib/api";
import { Option } from "@/interface/employee";
import { Date, InputText, Modal, Select, TextArea } from "./(components)";
import {
  checkForEmptyFields,
  countTotal,
  rupiahFormatter,
} from "@/lib/function";

export default function Home() {
  const [optionList, setOptionList] = useState<Option[]>([]);
  const [dataForm, setDataForm] = useState(DEFAULT_VALUE);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const options = await fetchData();
      setOptionList(options);
    };

    getData();
  }, []);

  const handleInput = (key: string, value: any) => {
    const product = dataForm.products.map((product, idx) => {
      if (idx === parseInt(key.split(".")[1])) {
        if (key.split(".")[2] === "unit") {
          return {
            ...product,
            unit: value.split("-")[0],
            price: value.split("-")[1],
          };
        } else {
          return {
            ...product,
            [key.split(".")[2]]: value,
          };
        }
      } else {
        return product;
      }
    });
    if (key.includes(".")) {
      setDataForm({ ...dataForm, products: product });
    } else {
      setDataForm({ ...dataForm, [key]: value });
    }

    console.log(dataForm);
  };

  const handleAddProduct = () => {
    setDataForm({
      ...dataForm,
      products: [
        ...dataForm.products,
        { product_name: "", unit: "", quantity: 0, price: 0 },
      ],
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    console.log(dataForm);
  };

  return (
    <main className="max-w-6xl mx-auto pt-32">
      <div className="bg-[#fafafa] w-full p-4 shadow-inner">
        <h1 className="font-bold text-[#616161]">Create Order</h1>
        <form
          onSubmit={onSubmit}
          className="bg-white p-4 rounded mt-2 shadow-lg "
        >
          {/* DETAIL */}
          <div className="sm:flex">
            <h1 className="font-bold text-[#616161] w-1/5">Detail</h1>
            <div className="flex flex-col gap-4 w-full sm:w-4/5">
              <div className="w-3/4">
                <Select
                  name="name"
                  label="Name"
                  handleInput={handleInput}
                  options={optionList}
                  dataValue={dataForm.name}
                />
              </div>
              <div className="w-1/2">
                <Select
                  name="distribution_center"
                  label="Distribution Center"
                  handleInput={handleInput}
                  options={dataForm.name ? DISTRIBUTION_CENTER : []}
                  dataValue={dataForm.distribution_center}
                />
              </div>
              {dataForm.distribution_center && (
                <div className="w-full">
                  <div className="flex gap-2 w-full">
                    <Select
                      name="payment_type"
                      label="Payment Type"
                      handleInput={handleInput}
                      options={PAYMENT_TYPE}
                      dataValue={dataForm.payment_type}
                    />
                    <Date handleInput={handleInput} />
                  </div>
                  <TextArea handleInput={handleInput} />
                </div>
              )}
            </div>
          </div>

          {/* PRODUCTS */}
          <section
            className={`${
              dataForm.distribution_center ? "sm:flex" : "hidden"
            } border-t  mt-4 pt-4 w-full`}
          >
            <h1 className="font-bold text-[#616161] w-1/5">Products</h1>
            <div className="w-full sm:w-4/5">
              {dataForm.products.map((product: any, index: number) => (
                <div className="w-full mb-4" key={index}>
                  <div className="flex gap-2">
                    <div className="w-3/4">
                      <Select
                        name={`product.${index}.product_name`}
                        label="Product"
                        handleInput={handleInput}
                        options={PRODUCT_LIST.map((item) => ({
                          value: item.name,
                          label: item.name,
                        }))}
                        dataValue={product.product_name}
                      />
                    </div>
                    <div className="w-1/4">
                      <Select
                        name={`product.${index}.unit`}
                        label="Unit"
                        handleInput={handleInput}
                        options={
                          PRODUCT_LIST.find(
                            (item) => item.name === product.product_name
                          )?.units?.map((item: any) => ({
                            value: item.name + "-" + item.price,
                            label: item.name,
                          })) ?? []
                        }
                        dataValue={product.unit}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 w-full ">
                    <div className="w-full">
                      <InputText
                        label="Quantity"
                        name={`product.${index}.quantity`}
                        handleInput={handleInput}
                        value={product.quantity}
                      />
                    </div>
                    <div className="w-full">
                      <InputText
                        label="Price"
                        name={`product.${index}.price`}
                        handleInput={handleInput}
                        value={product.price}
                      />
                    </div>
                    <div className="w-full">
                      <InputText
                        label="Total Price"
                        name={`product.${index}.total_price`}
                        handleInput={handleInput}
                        value={product.price * product.quantity}
                      />
                      <div className="flex justify-between mt-4 pt-1 border-t-2">
                        <b>Total Nett Price</b>
                        <b>
                          {rupiahFormatter(product.price * product.quantity)}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddProduct}
                className="bg-yellow-500 p-2 text-white mt-4 rounded shadow-lg"
              >
                New Item +
              </button>{" "}
              <p className="font-bold text-right">
                Total {countTotal(dataForm.products)}
              </p>
            </div>
          </section>

          <div className="flex gap-4 justify-end pt-2 border-t border-slate-300 mt-6 ">
            <button
              type="button"
              className="font-bold text-[#616161] uppercase"
              onClick={() => setDataForm(DEFAULT_VALUE)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${
                checkForEmptyFields(dataForm)
                  ? "bg-[#e0e0e0] text-[#b6b6b6]"
                  : "bg-green-500 text-white "
              }  px-4 py-2 rounded font-bold uppercase`}
              disabled={checkForEmptyFields(dataForm)}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>

      <Modal open={success} onClose={() => setSuccess(false)}>
        <div className="bg-white p-4 rounded-lg w-80">
          <h1 className="text-center">
            Berhasil Menambahkan <br />{" "}
            <span className="font-bold text-2xl text-slate-600">
              {" "}
              {dataForm.name}{" "}
            </span>
            <div className="flex justify-center gap-4 mt-4 text-white">
              <button
                onClick={() => {
                  setDataForm(DEFAULT_VALUE);
                  setSuccess(false);
                }}
                className="py-1 px-3 bg-red-500 rounded"
              >
                Reset
              </button>
              <button
                onClick={() => setSuccess(false)}
                className="py-1 px-3 bg-green-500 rounded"
              >
                Close
              </button>
            </div>
          </h1>
        </div>
      </Modal>
    </main>
  );
}
