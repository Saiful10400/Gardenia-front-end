import NavBar from "@/components/Component/NavBar/NavBar";
import React from "react";
const layout = ({ children }: { children: React.ReactChild }) => {
  
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default layout;
