import { useEffect } from "react";


const NotFound = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.assign("/");
    }, 3000);
  }, []);

  return <p>Error 404: Sorry, this page was not found. We&#39;ll send you back to the home page</p>;
};

export default NotFound;
