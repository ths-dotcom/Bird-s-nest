import React from "react";
import apartmentApi from "../../../api/ApartmentApi";

export interface Data {
  status: boolean;
  
  name: string;
  area: string;
  price: number;
  description: string;
  ultilities_img: string;
}

export default function Apartment() {
  const [data, setData] = React.useState<Data[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apartmentApi.get();
        console.log(response);
        setData(response.data.apartments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {data.map((item) => {
        return <>{item.name}</>;
      })}
    </div>
  );
}
