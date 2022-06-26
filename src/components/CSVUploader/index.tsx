import { useCSVReader } from "react-papaparse";

const Index = ({ getResults = () => {} }: { getResults: any }) => {
  const { CSVReader } = useCSVReader();
  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        console.log("---------------------------");
        getResults(results.data);
        console.log("---------------------------");
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          <div className="flex flex-col gap-1 items-center">
            <ProgressBar />
            <button
              type="button"
              className="cursor-pointer p-3 border-solid border-slate-50 rounded bg-indigo-500 text-white font-poppins w-36 "
              {...getRootProps()}
            >
              Browse file
            </button>
            <div>{acceptedFile && acceptedFile.name}</div>
            {acceptedFile && (
              <button
                className="cursor-pointer p-1 border-solid border-slate-50 rounded bg-indigo-500 text-white font-poppins w-24"
                {...getRemoveFileProps()}
              >
                Remove
              </button>
            )}
          </div>
        </>
      )}
      {/* 
    <input
      type={"file"}
      className="text-slate-500 file:rounded-full file:border-0 file:px-4 file:py-4  
      file:bg-indigo-50 file:text-indigo-700 font-poppins cursor-pointer	"
    /> */}
    </CSVReader>
  );
};

export default Index;
