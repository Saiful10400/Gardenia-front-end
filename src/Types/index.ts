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