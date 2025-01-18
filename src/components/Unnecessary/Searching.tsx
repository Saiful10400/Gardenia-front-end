import React from 'react';

const Searching = () => {
    return (
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
    );
};

export default Searching;