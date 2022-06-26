import React, { useCallback, useMemo, useRef, useState } from "react";
import FileUploader from "./components/CSVUploader";
import "./styles.css";
import HomeContainer from "./components/HomeContainer";
import { getNearestDate, isEmpty, parseDate } from "./Util";
import { v4 as uuid } from "uuid";
import DataRow from "./components/Row";
import { ProductProp } from "./types";
import { ArrowLeft, ArrowRight } from "phosphor-react";

function App() {
  const [products, setProducts] = useState<ProductProp>({});
  const [filteredProducts, setFilteredProducts] = useState<ProductProp>({});
  const [page, setPage] = useState<number>(1);
  const inputRef = useRef();
  const handleProductsParsed = ([, ...res]: string[]) => {
    let _products: ProductProp = {};
    res.forEach((product) => {
      const [code, name, batch, stock, deal, free, mrp, rate, exp]: any =
        product;
      const _product = {
        _id: uuid(),
        name,
        batch,
        stock,
        deal,
        free,
        mrp,
        rate,
        exp: parseDate(exp),
      };
      if (_products[name]) {
        const {
          _id,
          Name,
          Batch,
          stock: Stock,
          deal: Deal,
          free: Free,
          mrp: Mrp,
          rate: Rate,
          exp: Exp,
        }: any = _products[name]["all"];
        _products = {
          ..._products,
          [name]: {
            ..._products[name],
            [batch]: _product,
            all: {
              ..._products[name]["all"],
              stock: Number(stock) + Number(Stock),
              deal: Math.min(Number(deal), Number(Deal)),
              free: Math.min(Number(free), Number(Free)),
              mrp: Math.max(Number(mrp), Number(Mrp)),
              rate: Math.max(Number(rate), Number(Rate)),
              exp: getNearestDate(exp, Exp),
            },
          },
        };
      } else {
        _products[name] = {
          [batch]: _product,
          all: {
            ..._product,
          },
        };
      }
    });
    setProducts({ ..._products });
    setPage(1);
  };
  // console.log({ len: Math.floor(productsKeys.length / 50) });
  const getPaginatedProducts = useCallback(
    (products: ProductProp) => {
      let nextPage = 1,
        nextStart = 49;
      let _paginatedProducts: { [key: number]: ProductProp } = { 1: {} };
      Object.keys(products).forEach((key, index) => {
        if (index < nextStart) {
          _paginatedProducts[nextPage] = {
            ..._paginatedProducts[nextPage],
            [key]: products[key],
          };
        } else {
          nextPage = nextPage + 1;
          nextStart = nextStart + 50;
          _paginatedProducts[nextPage] = {
            ..._paginatedProducts[nextPage],
            [key]: products[key],
          };
        }
      });
      return _paginatedProducts;
    },
    [products]
  );

  const debounce = (fn: Function) => {
    let timer: number = 0;
    return (query: string) => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        fn(query);
      }, 300);
    };
  };

  const handleClearSearch = () => {
    setFilteredProducts({});
    setPage(1);
  };

  const handleSearch = (text: string) => {
    if (text.length === 0) handleClearSearch();
    const _filteredProducts: ProductProp = {};
    const filteredProductsKeys = Object.keys(products).filter((key) => {
      return products[key]["all"].name
        .toLowerCase()
        .includes(text.toLowerCase());
    });

    filteredProductsKeys.forEach((key) => {
      _filteredProducts[key] = products[key];
    });
    setFilteredProducts(_filteredProducts);
  };

  const search = debounce(handleSearch);

  const paginatedProducts = useMemo(() => {
    return Object.keys(filteredProducts).length > 0
      ? getPaginatedProducts(filteredProducts)
      : getPaginatedProducts(products);
  }, [products, filteredProducts]);

  const productsKeys = paginatedProducts[page]
    ? Object.keys(paginatedProducts[page])
    : [];

  return (
    <HomeContainer textInput={search}>
      <div className="flex flex-row w-full justify-center p-2 box-border">
        <FileUploader getResults={handleProductsParsed} />
      </div>
      <div className="flex flex-col justify-center w-full h-full min-h-full	 p-2 box-border">
        {!isEmpty(products) && (
          <div className="relative flex flex-row justify-between w-full h-10 p-1">
            {page > 1 && (
              <button
                onClick={() => setPage(Math.abs(page - 1))}
                className={`absolute left-0 cursor-pointer bg-slate-400 p-2 border-solid border-slate-50 rounded-3xl text-white flex flex-row justify-center items-center gap-1 text-md box-border hover:bg-indigo-600 cursor-pointer
              `}
              >
                <ArrowLeft size={18} /> <div>Prev</div>
              </button>
            )}
            {Object.keys(products).length > 50 && (
              <button
                onClick={() => setPage(Math.abs(page + 1))}
                className={
                  "absolute right-0 top-0 cursor-pointer bg-slate-400 p-2 border-solid border-slate-50 rounded-3xl text-white flex flex-row justify-center items-center gap-1 text-md box-border hover:bg-indigo-600 cursor-pointer" +
                  `${page > 1 ? "visibility:visible" : "hidden"}`
                }
              >
                <div>Next</div> <ArrowRight size={18} />
              </button>
            )}
          </div>
        )}
        <div className="grid grid-flow-row-dense grid-cols-8 gap-1 w-full p-2 justify-center bg-gray-200 items-center">
          <div className="col-span-1">Name</div>
          <div>Batch</div>
          <div>Stock</div>
          <div>Deal</div>
          <div>Free</div>
          <div>MRP</div>
          <div>Rate</div>
          <div>Exp</div>
        </div>
        {isEmpty(products) ? (
          <div className="p-2 text-center font-bold text-indigo-600">
            Please Upload File
          </div>
        ) : (
          productsKeys.map((key, index) => {
            return <DataRow product={products[key]} />;
          })
        )}
      </div>
    </HomeContainer>
  );
}

export default App;
