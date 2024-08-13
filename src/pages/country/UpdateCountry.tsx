import React, { useEffect, useState } from "react";
import CountryForm from "./CountryForm";
import { useParams } from "react-router-dom";
import { getIndividualCountry } from "../../api/country";

const UpdateCountry = () => {
  const { countryId } = useParams<{ countryId?: string }>();
  const [country, setCountry] = React.useState<any>();
  useEffect(() => {
    if (countryId) {
      const fetchCountry = async () => {
        try {
          const response = await getIndividualCountry(countryId);
          const data = response.data.data;
          console.log(data);
          setCountry(data);
        } catch (error) {
          console.error("Failed to get individual country:", error);
        }
      };
      fetchCountry();
    }
  }, [countryId]);

  const countryData = {
    image: country?.image || "",
    name: country?.name || "",
    description: country?.description || "",
    localeData: country?.localeData || {},
    id: countryId || "",
    status: country?.status,
  };

  return <CountryForm typeOfForm="update" countryData={countryData} />;
};

export default UpdateCountry;
