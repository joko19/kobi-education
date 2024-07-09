export const DISTRIBUTION_CENTER = [
  {
    label: "DC Tangerang",
    value: "DC Tangerang",
  },
  {
    label: "DC Cikarang",
    value: "DC Cikarang",
  },
];

export const PAYMENT_TYPE = [
  {
    label: "Cash H+1",
    value: "Cash H+1",
  },
  {
    label: "Cash H+3",
    value: "Cash H+3",
  },
  {
    label: "Cash H+7",
    value: "Cash H+7",
  },
  {
    label: "Transfer H+1",
    value: "Transfer H+1",
  },
  {
    label: "Transfer H+3",
    value: "Transfer H+3",
  },
  {
    label: "Transfer H+7",
    value: "Transfer H+7",
  },
];

export const PRODUCT_LIST = [
  {
    name: "Morning Dew Milk",
    units: [
      {
        name: "Karton",
        price: 50000,
      },
      {
        name: "pak",
        price: 20000,
      },
      {
        name: "pcs",
        price: 7000,
      },
    ],
  },
  {
    name: "Le Minerale 600ml",
    units: [
      {
        name: "Karton",
        price: 50000,
      },
      {
        name: "pak",
        price: 20000,
      },
    ],
  },
];

export const DEFAULT_VALUE = {
  name: "",
  distribution_center: "",
  payment_type: "",
  products: [
    {
      product_name: "",
      unit: "",
      price: 0,
      quantity: 0,
    },
  ],
};
