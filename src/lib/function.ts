import { Product } from "@/interface/employee";

function isEmpty(value: any): boolean {
  return (
    value === "" || value === 0 || (Array.isArray(value) && value.length === 0)
  );
}

export function checkForEmptyFields(obj: any): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (Array.isArray(value)) {
        if (value.some((item) => checkForEmptyFields(item))) {
          return true;
        }
      } else if (typeof value === "object" && value !== null) {
        if (checkForEmptyFields(value)) {
          return true;
        }
      } else if (isEmpty(value)) {
        return true;
      }
    }
  }
  return false;
}

export const countTotal = (allData: Product[]) => {
  let total = 0;
  allData.forEach((element: Product) => {
    total += element.price * element.quantity;
  });
  const rupiah = new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(total);

  return rupiah;
};

export const filterUnit = (units: any[], choosedUnit: any[]) => {
  const choosedUnitItems = choosedUnit.map((value: Product) => value.unit);

  return units.filter((value: any) => !choosedUnitItems.includes(value.name));
};

export const rupiahFormatter = (angka: number) => {
  const rupiah = new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);

  return rupiah;
};
