import { Button, Carousel, Modal } from "antd";
import React from "react";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";

import apartmentApi from "../../../../api/ApartmentApi";
import apartmentTypeApi from "../../../../api/AprtmentTypeApi";
import Header from "../../../../components/Header/Header";
import { Apartment } from "../../../../models/Apartment/Apartment";
import { ApartmentDetail } from "../../../../models/ApartmentDetail/ApartmentDetail";
import { ApartmentType } from "../../../../models/ApartmentType/ApartmentType";
import { Feedback } from "../../../../models/Feedback/Feedback";

export default function ApartmentMaster() {
  const [data, setData] = React.useState<Apartment>();
  const [apartmentType, setApartmentType] = React.useState<ApartmentType>();
  const [apartment, setApartment] = React.useState<Apartment>();
  const [apartmentDetail, setApartmentDetail] =
    React.useState<ApartmentDetail>();
  const [apartmentSlug, setApartmentSlug] = React.useState("");
  const [countApartment, setCountApartment] = React.useState();
  const [isVisibleAprtment, setVisibleAprtment] = React.useState(true);
  const [sortType, setSortType] = React.useState("");
  const [apartmentRelated, setApartmentRelated] = React.useState<Apartment>();
  const [checkOrder, setCheckOrder] = React.useState(false);
  const [feedback, setFeedback] = React.useState<Feedback>();

  let { slug } = useParams();

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = React.useCallback((e) => {
    let temp = e.target.value;
    setApartmentSlug(temp);
    setIsModalVisible(true);
  }, []);

  React.useEffect(() => {
    const fetchData = () => {
      apartmentApi.list().then((result: Apartment) => {
        setData(result);
      });
      apartmentApi.sort(sortType).then((result: Apartment) => {
        setData(result);
      });
      apartmentApi.count().then((result) => {
        setCountApartment(result.count);
      });
      apartmentApi.get(apartmentSlug).then((result: ApartmentDetail) => {
        setApartmentDetail(result);
      });
      apartmentApi.relate(slug, apartmentSlug).then((result: Apartment) => {
        setApartmentRelated(result);
      });
      apartmentApi.checkOrder(apartmentSlug).then((result) => {
        setCheckOrder(result.available);
      });
      apartmentApi.getFeedback(apartmentSlug).then((result: Feedback) => {
        setFeedback(result);
      });

      apartmentTypeApi.list().then((result: ApartmentType) => {
        setApartmentType(result);
      });
      apartmentTypeApi.get(slug).then((result: Apartment) => {
        setApartment(result);
      });
    };
    fetchData();
  }, [slug, apartmentSlug, sortType]);

  const handleApartmentType = React.useCallback(() => {
    setVisibleAprtment(true);
  }, []);

  const handleApartmenttAll = React.useCallback(() => {
    setVisibleAprtment(false);
  }, []);

  // modal order

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSortUp = React.useCallback(() => {
    setSortType("asc");
  }, []);

  const handleSortDown = React.useCallback(() => {
    setSortType("desc");
  }, []);

  return (
    <div>
      <Header />
      <div className="button-group">
        <Button onClick={handleApartmenttAll} type="dashed">
          <Link to="">All</Link>
        </Button>
        {apartmentType?.apartment_types?.map((item) => {
          return (
            <div className={item._id}>
              <Button type="dashed" onClick={handleApartmentType}>
                <Link to={`${item.slug}`}>{item.name}</Link>
              </Button>
            </div>
          );
        })}
      </div>
      <div>
        <Button type="dashed" onClick={handleSortUp}>
          Tang
        </Button>
        <Button type="dashed" onClick={handleSortDown}>
          Giam
        </Button>
      </div>

      {isVisibleAprtment && (
        <div>
          {apartment &&
            apartment.apartments?.map((ap) => {
              return (
                <div key={ap._id}>
                  <>
                    <button
                      /* type="primary" */ value={ap.slug}
                      onClick={showModal}
                    >
                      {ap.name}
                    </button>
                    <Modal
                      title="Basic Modal"
                      visible={isModalVisible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      {apartmentDetail && apartmentDetail.apartment?.name}
                      {checkOrder && (
                        <Button disabled={false}>Order</Button>
                      )}
                      {!checkOrder && (
                        <Button disabled={true}>Het phong</Button>
                      )}

                      <div>
                        {" "}
                        Cac can tuong tu:
                        {apartmentRelated &&
                          apartmentRelated.apartments?.map((item) => {
                            return <div>{item.name}</div>;
                          })}
                      </div>
                      {feedback &&
                        feedback.feedbacks?.map((item) => {
                          return (
                            <div>
                              {item.cus_name}
                              <img src={item.cus_avatar} alt="error"></img>
                              {/* <Moment > */}
                              {item.createdAt}
                              {/* </Moment> */}
                              {item.comment}
                            </div>
                          );
                        })}
                    </Modal>
                  </>
                </div>
              );
            })}
        </div>
      )}

      {!isVisibleAprtment && (
        <div>
          <div>
            <h1>So luong can ho: {countApartment}</h1>
            {data &&
              data.apartments?.map((item) => {
                return (
                  <div key={item._id}>
                    {item.name}
                    <button value={item.slug}>
                      <Link to={`${item.slug}`}>Click</Link>
                    </button>
                    <Carousel>
                      {" "}
                      {item.images?.map((img) => {
                        return (
                          <div>
                            {" "}
                            <img src={img} alt="error" />
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
        </div>
      )}
    </div>
  );
}
