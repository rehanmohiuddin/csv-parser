import React, { useRef, useState } from "react";
import { MagnifyingGlass, XCircle } from "phosphor-react";

function Header({ textInput }: { textInput: any }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const clearText = () => {
    inputRef.current && (inputRef.current.value = "");
    textInput("");
  };
  return (
    <div className="flex flex-row justify-between w-full shadow-lg p-2 shadow-gray-100 bg-white box-border">
      <h2 className="text-3xl p-1 tracking-wide uppercase">CSV Parser</h2>
      <div className="p-2 flex flex-row border-solid items-center border-slate-200 w-80 ">
        <MagnifyingGlass size={20} />
        <input
          ref={inputRef}
          onChange={(e) => textInput(e.target.value)}
          className="mx-1 p-1 border-0 outline-0 font-poppins"
          placeholder="Search By Name"
        />
        {inputRef.current && inputRef.current?.value.length > 0 && (
          <XCircle className="cursor-pointer" onClick={clearText} size={20} />
        )}
      </div>
    </div>
  );
}

export default Header;
