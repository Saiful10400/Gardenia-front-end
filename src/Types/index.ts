export type Tuser = {
  _id: string;
  name: string;
  img: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user"; // Assuming there are predefined roles
  coverImg: string;
  bio: string;
  profession: string | null;
  educationInstitute: string;
  address: string;
  socialLinks: string[]; // Array of strings for social links
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  verifyed: boolean;
  isBlocked: boolean;
};

export interface TtableData {
  mode?: "admin" | "vendor";
  name: string;
  tittle: string;
  createRoute: string;
  keyValue: {
    [key: string]: string;
  };
}

export type Tfrind= {
  _id: string;
  sender: {
    _id: string;
    name: string;
    img: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    coverImg: string;
    bio: string;
    profession: string | null;
    educationInstitute: string;
    address: string;
    socialLinks: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    verifyed: boolean;
    isBlocked: boolean;
  };
  receiver: {
    _id: string;
    name: string;
    img: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    coverImg: string;
    bio: string;
    profession: string | null;
    educationInstitute: string;
    address: string;
    verifyed: boolean;
    socialLinks: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    isBlocked: boolean;
  };
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};




export type TfriendRequestAccept = {
  _id: string;
  receiver: string;
  sender: {
      _id: string;
      name: string;
      img: string;
      email: string;
      password: string;
      phone: string;
      role: string;
      coverImg: string;
      bio: string;
      profession: string | null;
      educationInstitute: string;
      address: string;
      socialLinks: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
      verifyed: boolean;
      isBlocked: boolean;
  };
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};



export interface Tnotification {
  _id: string;
  for: {
    _id: string;
    name: string;
    img: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    coverImg: string;
    bio: string;
    profession: string | null;
    educationInstitute: string;
    address: string;
    socialLinks: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    verifyed: boolean;
    isBlocked: boolean;
  };
  by: string;
  type: "follow" | "like" | "comment"; // You can adjust these values based on expected types.
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TdashboardData = {
  cardData: {
    totalPayment: number;
    totalPost: number;
    totalUser: number;
  };
  pieChartData: {
    verifyedUser: number;
    unVerifyedUser: number;
  };
  barChartData: {
    deletedPost: number;
    paidPost: number;
    freePost: number;
    blockPost: number;
  };
};



export type Tpost = {
  _id: {
    $oid: string;
  };
  content: string;
  img: string;
  creator: {
    $oid: string;
  };
  vote: number;
  isBlock: boolean;
  isDeleted: boolean;
  isGroupPost: boolean;
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  __v: number;
};





// Main Root Type
export interface TpostCard {
  post: Post;
  reaction: Reaction[];
  comments: Comment[];
  favourite: Favourite[];
}

// ------------------- Post -------------------
export interface Post {
  isGroupPost: boolean;
  _id: string;
  group:Group;
  content: string;
  img: string;
  creator: Creator;
  category: string;
  costing: string;
  vote: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isBlock: boolean;
}

// ------------------- Creator -------------------
export interface Creator {
  _id: string;
  name: string;
  img: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  coverImg: string;
  bio: string;
  profession: string | null;
  educationInstitute: string;
  address: string;
  verifyed: boolean;
  socialLinks: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  isBlocked: boolean;
}

// ------------------- Reaction -------------------
export interface Reaction {
  _id: string;
  post: string;
  reactor: string;
  reactionType: "up" | "down" | "like" | "love" | string; // can extend if you support more types
  __v: number;
}

// ------------------- Comment -------------------
export interface Comment {
  _id: string;
  commentor: Commentor;
  comment: string;
  post: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ------------------- Commentor -------------------
export interface Commentor {
  _id: string;
  name: string;
  img: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  coverImg: string;
  bio: string;
  profession: string | null;
  educationInstitute: string;
  address: string;
  socialLinks: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  verifyed: boolean;
  isBlocked: boolean;
}

// ------------------- Favourite -------------------
export interface Favourite {
  _id: string;
  postId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



// ---------------------group-----------------------
export interface Group {
  _id: string;
  admin: string; // admin user ID reference
  logo: string;
  coverImg: string;
  isRead: boolean;
  name: string;
  description: string;
  privacy: "public" | "private" | string; // allow other privacy values if needed
  createdAt: string;
  updatedAt: string;
  __v: number;
}
