import React from "react";
import { Link } from "react-router-dom";
import apartmentApi from "../../../../api/ApartmentApi";
import Header from "../../../../components/Header/Header";
import { Apartments } from "../../../../models/Apartments/Apartments";
import { ApartmentData } from "../../../../models/Apartments/ApartmentsData";

export default function Apartment() {
  const [data, setData] = React.useState<Apartments>();

  const handleGetApartmentDetail = React.useCallback(
    (apartment: ApartmentData) => {
      apartmentApi.get(apartment.slug).then((result) => {
        console.log(result);
      });
    },
    []
  );

  React.useEffect(() => {
    const fetchData = () => {
      apartmentApi.list().then((result: Apartments) => {
        setData(result);
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {data &&
        data.apartments?.map((item) => {
          return (
            <div key={item._id}>
              {item.name}
              <button
                value={item.slug}
                onClick={() => handleGetApartmentDetail}
              >
                <Link to="/apartments-detail">Click</Link>
              </button>
              {item.images?.map((img) => {
                return (
                  <div>
                    {" "}
                    <img src={img} alt="error"></img>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
