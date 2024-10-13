"use client";
import Tocenter from "@/components/Helper/Tocenter";
import Banner from "@/components/Page/Home/Banner";
import NewsFeedCard from "@/components/Shared/NewsFeedCard/NewsFeedCard";
import { useNewsfeedPostQuery } from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import React, { useEffect, useState } from "react";

const Home = () => {
  const { data } = useNewsfeedPostQuery(null);
  const dbNews = data?.data;
  console.log(dbNews, "nesearray");

  // this is the middle resting state.
  const [restingState, setRestingState] = useState(dbNews);
  const [visibleData, setVisibleData] = useState(dbNews);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (dbNews) {
      setRestingState(dbNews);
      setVisibleData(dbNews?.slice(0, 3));
    }
  }, [dbNews]);

  // infinite scroll functionaly.

  useEffect(() => {
    if (page > 1 && restingState) {
      console.log(page, ":pageNumber");
      setVisibleData((p) => {
        if (visibleData.length < restingState.length) {
          return [...p, ...restingState?.slice((page - 1) * 3, page * 3)];
        } else {
          return p;
        }
      });
    }
  }, [page]);

  const scrollfung = () => {
    const val1 = document.documentElement.scrollHeight;
    const val2 = window.innerHeight;
    const val3 = document.documentElement.scrollTop;
    if (val1 === val2 + val3) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollfung);

    return () => window.removeEventListener("scroll", scrollfung);
  }, []);

  console.log(visibleData?.length, "x", restingState?.length);

  //available catgory.
  let availabelCatagory: string[] = [];
  dbNews?.forEach((item) => {
    if (!availabelCatagory.includes(item?.post.category)) {
      availabelCatagory.push(item?.post.category);
    }
  });
  availabelCatagory = ["All", ...availabelCatagory];

  const [showCancel, setShowCancel] = useState(false);
  const [searchText, setSearchText] = useState("");

  // handle catagroy

  const [clickedCategory, setClickedCategory] = useState("All");
  const [selectedPlan, setSelectedPlan] = useState("Free");

  /// main poserhouse.

  const { loggedInUser } = useAppSelector((e) => e.authStore);

  const canYousee = loggedInUser?.verifyed ? true : false;

  const [isPayFake, setIspayFake] = useState(false);
  const [iscatFake, setIscatFake] = useState(false);
  useEffect(() => {
    if (!dbNews || isPayFake) return;
    if (clickedCategory === "All") {
      setRestingState(dbNews);
      setVisibleData(dbNews.slice(0, 3));
      setPage(1);
    } else {
      const queryItems = dbNews.filter(
        (item) => item.post.category === clickedCategory
      );
      setRestingState(queryItems);
      setVisibleData(queryItems.slice(0, 3));
      setPage(1);
    }
  }, [clickedCategory]);

  // manage plan.

  //get the search functionality text.

  const searchFormHandle = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.searchText.value;

    const queryItems = dbNews.filter((item) => {
      const name = item.post.content.toUpperCase();
      // const brand = item.brand.toUpperCase();
      const searchText = input.toUpperCase();
      if (name.indexOf(searchText) !== -1) {
        return true;
      }
      return false;
    });

    setRestingState(queryItems);
    setVisibleData(queryItems.slice(0, 3));
    setIspayFake(true);
    setIscatFake(true);
    setClickedCategory("All");
    setSelectedPlan(canYousee?"All":"Free");
  };

  useEffect(() => {
    if (!dbNews || iscatFake) return;

    if (selectedPlan === "Free") {
      const queryItems = dbNews.filter((item) => item.post.costing === "Free");
      setRestingState(queryItems);
      setVisibleData(queryItems.slice(0, 3));
      setPage(1);
    } else if (selectedPlan === "Paid") {
      const queryItems = dbNews.filter((item) => item.post.costing === "Paid");
      setRestingState(queryItems);
      setVisibleData(queryItems.slice(0, 3));
      setPage(1);
    } else if (selectedPlan === "All") {
      setRestingState(dbNews);
      setVisibleData(dbNews.slice(0, 3));
      setPage(1);
    }
  }, [selectedPlan]);

  return (
    <Tocenter>
      <Banner />

      <div className="flex gap-4 flex-col-reverse lg:flex-row mt-4 justify-start">
        <div className="w-full lg:w-[60%]">
          <NewsFeedCard data={visibleData} />
        </div>

        <div className="lg:w-[40%] w-full h-max pb-6 lg:sticky top-[100px] right-0">
          <h1 className="text-2xl font-bold">Sort</h1>

          {/* search */}

          <section className="pl-7 mt-5">
            <form onSubmit={searchFormHandle} className="flex gap-3">
              <input
                value={searchText}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  setSearchText(target.value);
                  if (target.value.length >= 1) {
                    setShowCancel(true);
                  } else {
                    setShowCancel(false);
                  }
                }}
                type="text"
                name="searchText"
                placeholder="type here.."
                className="focus:outline-none border border-black text-lg py-2 px-2 rounded-lg"
              />
              <button className="text-xl py-2 rounded-lg  px-2 bg-[#19f123] text-white hover:bg-[#29cc31]">
                Search
              </button>
              {showCancel && (
                <button
                  onClick={() => {
                    setShowCancel(false); 
                    setSearchText("");
                    setRestingState(dbNews);
                    setVisibleData(dbNews.slice(0, 3));
                    setPage(1)
                    setIspayFake(true);
                    setIscatFake(true);
                    setClickedCategory("All");
                    setSelectedPlan(canYousee?"All":"Free");

                  }}
                  type="reset"
                  className="text-xl py-2 rounded-lg  px-2 bg-[#e72929] text-white hover:bg-[#aa2727]"
                >
                  Cancel
                </button>
              )}
            </form>

            <div className="mt-5">
              <h1 className="text-xl mt-5 font-normal">Select Plan :</h1>

              <div className="flex gap-4 mt-4">
                <button
                  disabled={!canYousee}
                  onClick={() => {
                    setIspayFake(true);
                    setPage(1)
                    setIscatFake(false);
                    setClickedCategory("All");
                    setSelectedPlan("All");
                  }}
                  className={`text-xl py-2 rounded-lg  px-2  ${
                    selectedPlan === "All" ? "bg-[#19f123]" : "bg-gray-300"
                  } text-white `}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setIspayFake(true);
                    setPage(1)
                    setIscatFake(false);
                    setClickedCategory("All");
                    setSelectedPlan("Free");
                  }}
                  className={`text-xl py-2 rounded-lg  px-2  ${
                    selectedPlan === "Free" ? "bg-[#19f123]" : "bg-gray-300"
                  } text-white `}
                >
                  Free
                </button>
                <button
                  disabled={!canYousee}
                  onClick={() => {
                    setIspayFake(true);
                    setPage(1)
                    setIscatFake(false);
                    setClickedCategory("All");
                    setSelectedPlan("Paid");
                  }}
                  className={`text-xl py-2 rounded-lg  px-2  ${
                    selectedPlan === "Paid" ? "bg-[#19f123]" : "bg-gray-300"
                  } text-white `}
                >
                  Premium
                </button>
              </div>
            </div>

            <div className="mt-5">
              <h1 className="text-xl mt-5 font-normal">Availabe categorys :</h1>

              <div className="flex flex-wrap gap-4 mt-4">
                {availabelCatagory?.map((item) => (
                  <button
                    onClick={() => {
                      setIspayFake(false);
                      setIscatFake(true);
                      if (canYousee) {
                        setSelectedPlan(canYousee?"All":"Free");
                      } else {
                        setSelectedPlan("Free");
                      }
                      setPage(1)
                      setClickedCategory(item);
                    }}
                    key={item}
                    className={`text-base py-2 rounded-lg text-white px-3 ${
                      clickedCategory === item
                        ? "bg-[#19f123] hover:bg-[#29cc31]"
                        : "bg-[#d1d5db] hover:bg-[#d1d5db]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Tocenter>
  );
};

export default Home;
