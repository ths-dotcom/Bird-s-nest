import React from "react";
import apartmentTypeApi from "../../../../api/AprtmentTypeApi";
import Header from "../../../../components/Header/Header";
import "./ApartmentTypeMaster.scss";
import { ApartmentType } from "../../../../models/ApartmentType/ApartmentType";

export default function ApartmentTypeMaster() {
  const [data, setData] = React.useState<ApartmentType>();

  React.useEffect(() => {
    const fetchData = () => {
      apartmentTypeApi.list().then((result: ApartmentType) => {
        setData(result);
      });
    };
    fetchData();
  }, []);

 

  return (
    <div>
      <Header />
      <div className="breadcrumb">
        <img
          src="https://www.tphcm.city/wp-content/uploads/2021/10/dau-tu-homestay-1.jpg"
          alt="error"
        />
        <div className="text-header">
          <h3>CHIM TRÊN CÂY HOMESTAY</h3>
          <h5>
            Một ngôi làng cheo veo trên triền đồi với những chiếc tổ được làm
            bằng gỗ, phủ đầy hoa lá, cách trung tâm Đà Lạt khoảng 2km. Nếu bạn
            yêu thiên nhiên, thích sự mộc mạc, giản tiện và tự phục vụ thì đây
            hẳn là một thiên đường dành cho bạn.
          </h5>
        </div>
      </div>
      <div className="container">
        {data &&
          data.apartment_types?.map((item) => {
            return (
              <div  key={item._id}>
                <div className="">
                  <img src={item.image} alt="error" />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <h5>{item.price}</h5>
                  <h5>{item.description}</h5>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
