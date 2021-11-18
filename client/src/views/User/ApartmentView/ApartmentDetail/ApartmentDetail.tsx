import React from "react";
import Header from "../../../../components/Header/Header";

interface ApartmentDetailProps {
  slug: string;
}

export default function ApartmentDetail(props:ApartmentDetailProps) {

  const {slug} = props;
  console.log("Hello" + slug);

  return (
    <div>
      <Header />
      dkfgjaskljgksldjgklds
    </div>
  );
}
