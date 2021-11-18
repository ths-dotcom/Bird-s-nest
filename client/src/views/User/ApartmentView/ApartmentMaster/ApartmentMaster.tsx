import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import apartmentApi from "../../../../api/ApartmentApi";
import Header from "../../../../components/Header/Header";
import { Apartment } from "../../../../models/Apartment/Apartment";
import { Carousel } from "antd";
import ApartmentDetail from "../ApartmentDetail/ApartmentDetail";

export default function ApartmentMaster() {
  const [data, setData] = React.useState<Apartment>();
  const [countApartment, setCountApartment] = React.useState();
  const [slug, setSlug] = React.useState("");

  const link: string = "http://localhost:3001/";

  React.useEffect(() => {
    const fetchData = () => {
      apartmentApi.list().then((result: Apartment) => {
        setData(result);
      });
      apartmentApi.count().then((result) => {
        setCountApartment(result.count);
      });
    };
    fetchData();
  }, []);

  const handleGetApartmentSlug = React.useCallback((e) => {
    setSlug(e.target.value);
    // apartmentApi.get(apartment.slug).then((result) => {
    //   console.log(result);
    // });
  }, []);

  return (
    <div>
      <Header />
      <h1>So luong can ho: {countApartment}</h1>
      {data &&
        data.apartments?.map((item) => {
          return (
            <div key={item._id}>
              {item.name}
              <button value={item.slug} onClick={handleGetApartmentSlug}>
                <Link to="/apartment-detail">Click</Link>
              </button>
              <Carousel>
                {" "}
                {item.images?.map((img) => {
                  return (
                    <div>
                      {" "}
                      <img src={link + img} alt="error" />
                    </div>
                  );
                })}
              </Carousel>
              <div>
                <h3>{item.name}</h3>
                <h5>{item.price}</h5>
              </div>
            </div>
          );
        })}
    </div>
  );
}
