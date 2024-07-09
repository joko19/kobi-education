import { Employee, Option } from "@/interface/employee";

export const fetchData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}`).then((res) =>
    res.json()
  );
  const options: Option[] = res.data.map((item: Employee) => ({
    label: item.employee_name,
    value: item.employee_name,
  }));
  return options;
};
