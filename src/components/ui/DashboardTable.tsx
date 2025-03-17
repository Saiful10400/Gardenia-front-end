/* eslint-disable react-hooks/rules-of-hooks */
 "use client"

import { TtableData } from "../../Types";
 
 
 
 
import formateDate from "@/utils/formateDate";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import Image from "next/image";
import { useAdminPanalAllNotificationQuery, useAllPaymentHistoryQuery, useGetAllCategoryQuery, useGetAllMusicQuery, useGetPostQuery } from "@/Redux/api/api";
const DashboardTable = ({ data }: { data: TtableData }) => {
   const { loggedInUser } = useAppSelector((s) => s.authStore);
  const headers = Object.keys(data.keyValue);
  const keys = Object.values(data.keyValue);

 
 
 

  let fetchedData;

  if (data.name === "Content") {
    
    fetchedData = useGetPostQuery(null)
  }

  if (data.name === "payments") {
    
    fetchedData = useAllPaymentHistoryQuery(null)
  }
  if (data.name === "category") {
    
    fetchedData = useGetAllCategoryQuery(null)
  }
  if (data.name === "notification") {
    
    fetchedData = useAdminPanalAllNotificationQuery(null)
  }
  if (data.name === "story") {
    
    fetchedData = useGetAllMusicQuery(null)
  }

 
  const typeFormate = (key: string, item) => {
    if (key === "logo" || key === "image"|| key === "img"|| key === "userPhoto" ||key==="musicArt") {
      return (
        <td className="border-none lg:py-5 pl-4 " key={key}>
          <Image height={60} width={60}
            className="w-[60px] h-[40px] rounded-md object-contain"
            src={item[key]}
            alt="photo"
          />
        </td>
      );
    } 
    else if (key === "isGroupPost"||key==="isBlock" || key==="isDeleted" || key==="isRead") {
      return (
        <td className="border-none lg:py-5  pl-4 " key={key}>
          {item[key]?"Yes":"No"}
        </td>
      );
    } 
    else if (key === "updated"||key === "created") {
      return (
        <td className="border-none lg:py-5  pl-4 " key={key}>
          {formateDate(item[key])}
        </td>
      );
    } 
    else if (key === "updated"||key === "createdAt") {
        return (
          <td className="border-none lg:py-5  pl-4 " key={key}>
            {formateDate(item[key])}
          </td>
        );
      }
   
    else {
      return (
        <td className="border-none lg:py-5 pl-4 " key={key}>
          {item[key]}
        </td>
      );
    }
  };

  // console.log(fetchedData?.data?.data?.result[0]);




  // pagination logics.
//   const totalPage = Math.ceil(fetchedData?.data?.data?.total / 10);
//   const [currentPage, setCurrentPage] = useState(1);
//   useEffect(() => {
//     setPagination({ offset: (currentPage - 1) * 10, limit: 10 });
//   }, [currentPage]);



let FetchedData=[]

if(data.name==="Content"){
    FetchedData=fetchedData?.data?.data?.map(item=>item.post)
}
if(data.name==="payments"||data.name==="category"||data.name==="notification" || data.name==="story"){
    FetchedData=fetchedData?.data?.data
}
 console.log(FetchedData)
  return (  
    <div className="border bg-white rounded-lg pb-6">
      <div className="flex justify-between border-b py-4 lg:px-5">
        <h1 className="text-base font-bold">{data.tittle}</h1>
       
      </div>

      {/* <div className="py-4 lg:px-5 flex justify-start gap-2 items-center">
        <input
          type="text"
          placeholder="search here..."
          className="focus:outline-[#f97316] border py-1 rounded-md pl-2 w-[250px]"
        /> <button className="bg-[#f97316] text-white font-medium rounded-md py-1 px-2">Search</button>
      </div> */}

      <div className="lg:px-5 overflow-auto">
        <table className="w-full text-base ">
          <thead className="">
            <tr className="border  bg-[#f1f5f9] font-semibold">
              {headers?.map((item) => (
                <th
                  className="h-12 px-4 border-none text-left font-semibold text-gray-600    "
                  key={item}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {FetchedData?.map((item) => (
              <tr key={item.brandId} className="border">
                {keys.map((key) => typeFormate(key, item))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="lg:px-5 text-sm flex justify-between items-center">
        <h1 className="font-semibold text-gray-400">
          {(currentPage - 1) * 10 + fetchedData?.data?.data?.result?.length} of{" "}
          {fetchedData?.data?.data?.total} row(s)
        </h1>

        <div className="flex items-center gap-10">
          <h1 className="font-bold">
            Page {currentPage} of {totalPage}
          </h1>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`border p-1 rounded-md hover:bg-gray-200 ${
                currentPage === 1 && "opacity-40"
              }`}
            >
              <ChevronLeft height={20} width={20} />
            </button>
            <button
              disabled={currentPage === totalPage}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`border p-1 rounded-md hover:bg-gray-200 ${
                currentPage === totalPage && "opacity-40"
              }`}
            >
              <ChevronRight height={20} width={20} />
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardTable;
