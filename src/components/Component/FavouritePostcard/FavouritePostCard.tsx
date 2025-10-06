'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import parser from 'html-react-parser';
import blueTick from '../../../assets/profile/blueTick.png';
// import { MessageCircle, Heart, Share2 } from 'lucide-react';

const FavouritePostCard = ({ data }) => {
  const post = data?.postId;
  const creator = post?.creator;
  const profileLink = creator?._id ? `/profile?id=${creator._id}` : '#';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col gap-3 lg:h-[420px] hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4">
        <Link href={profileLink} className="shrink-0">
          <Image
            src={creator?.img || '/default-avatar.png'}
            alt="Profile"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover border border-gray-200 hover:opacity-90 transition-opacity duration-200"
          />
        </Link>

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Link
              href={profileLink}
              className="font-semibold text-gray-900 text-sm hover:text-blue-600 transition-colors duration-200"
            >
              {creator?.name || 'Unknown User'}
            </Link>

            {data?.userId?.verifyed && (
              <Image
                src={blueTick}
                alt="Verified"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            )}
          </div>
          <div className="text-xs text-gray-500">
            10h
             {/* {post?.costing || 'Free'} */}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4  overflow-hidden">
        <p className="text-gray-700 text-sm leading-relaxed mb-2 line-clamp-4 h-16">
          {parser(post?.content || '')}
        </p>

        {post?.img && (
          <div className="relative w-full h-16 lg:h-56  rounded-sm overflow-hidden">
            <Image
              src={post?.img}
              alt="Post"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500  rounded-md"
            />
          </div>
        )}
      </div>

      {/* Footer (optional) */}
      {/* <div className="flex items-center justify-around border-t border-gray-100 px-4 py-2">
        {[{ icon: <Heart className="w-5 h-5" />, label: 'Like' }, { icon: <MessageCircle className="w-5 h-5" />, label: 'Comment' }, { icon: <Share2 className="w-5 h-5" />, label: 'Share' }].map((item, i) => (
          <button
            key={i}
            className="flex items-center gap-2 text-gray-600 text-sm py-2 px-3 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-all duration-200"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default FavouritePostCard;
