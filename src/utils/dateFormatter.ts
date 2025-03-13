const dateFormatter = (createdAt: string): string => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
  
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 172800) return "yesterday";
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  
    return postDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };


  export default dateFormatter