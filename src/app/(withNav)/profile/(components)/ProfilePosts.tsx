import FavouritePostCard from '@/components/Component/FavouritePostcard/FavouritePostCard';
import PostCard from '@/components/Component/PostCard/PostCard';
import PostCreate from '@/components/Component/PostCreate/PostCreate';
import React from 'react';

const ProfilePosts = ({isYou,postData,userData}) => {
    return (
          <div
            data-aos="fade-down"
            className="lg:w-[60%] w-full overflow-hidden"
          >
            {/* create a post section */}

            {isYou && <PostCreate userData={userData} />}

            {/* favourite posts. */}
            {isYou && (
              <section className="bg-white mt-4 rounded-xl shadow-lg p-4">
                <h1 className="text-xl font-bold">Favourite Posts</h1>
                <div className="grid grid-cols-2 lg:grid-cols-3 mt-4 gap-5">
                  {postData?.data?.favourite?.map((item, idx) => (
                    <FavouritePostCard
                      data-aos="fade-up"
                      key={idx}
                      data={item}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* post cards. */}

            <section>
              <div className="grid grid-cols-1 mt-4 gap-5">
                {postData?.data?.all?.map((item, idx) => (
                  <PostCard data-aos="fade-up" key={idx} data={item} />
                ))}
              </div>
            </section>
          </div>
    );
};

export default ProfilePosts;