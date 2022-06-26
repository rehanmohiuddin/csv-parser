import { useState } from "react";
import { ProductProp } from "../types";

const DataRow = ({ product }: { product: any }) => {
  const [Batch, setBatch] = useState<string>("all");
  const { _id, name, batch, stock, deal, free, mrp, rate, exp }: any =
    product[Batch];
  const _batches = Object.keys(product);
  return (
    <div
      key={_id}
      className="grid grid-flow-row-dense grid-cols-8  gap-1 w-full p-2 justify-center bg-slate-50"
    >
      <div className="col-span-1">{name}</div>
      <select
        onChange={(e) => setBatch(e.target.value)}
        value={Batch}
        className="border-1 border-indigo-500/100 uppercase font-poppins"
      >
        {_batches.map((key) => (
          <option value={product[Batch][key]}>{key}</option>
        ))}
      </select>
      <div className="  border-2 border-slate-50">{stock}</div>
      <div className="  border-2 border-slate-50">{deal}</div>
      <div className="  border-2 border-slate-50">{free}</div>
      <div className="  border-2 border-slate-50">{mrp}</div>
      <div className="  border-2 border-slate-50">{rate}</div>
      <div className="  border-2 border-slate-50">{exp}</div>
    </div>
  );
};

export default DataRow;
