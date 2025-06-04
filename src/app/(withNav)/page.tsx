"use client";
import Tocenter from "@/components/Helper/Tocenter";
import Banner from "@/components/Page/Home/Banner";
import LeftAside from "@/components/Page/Home/LeftAside";
import RightAsiide from "@/components/Page/Home/RightAsiide";
import NewsFeed from "@/components/Shared/NewsFeedCard/NewsFeed";
 
import { useNewsfeedPostQuery } from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import React, { useEffect, useState } from "react";

const Home = () => {
  const { data } = useNewsfeedPostQuery(null);
  const dbNews = data?.data;

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

  //available catgory.
  let availabelCatagory: string[] = [];
  dbNews?.forEach((item) => {
    if (!availabelCatagory.includes(item?.post.category)) {
      availabelCatagory.push(item?.post.category);
    }
  });
  availabelCatagory = ["All", ...availabelCatagory];


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
    setSelectedPlan(canYousee ? "All" : "Free");
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
      <div className="flex gap-4 flex-col-reverse lg:flex-row justify-between bg-[#f2f4f7]  min-h-[calc(100vh-72px)]">
       <LeftAside />
        <div className="w-full lg:w-[40%] mt-5">
           <NewsFeed />
        </div>
        <RightAsiide />
      </div>
    </Tocenter>
  );
};

export default Home;
