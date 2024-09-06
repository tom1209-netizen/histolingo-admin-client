import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIndividualPlayerTest } from "../../api/playerTest";
import PlayerTestForm from "./PlayerTestForm";

const UpdatePlayerTest = () => {
  const { testId } = useParams<{ testId?: string }>();
  const [test, setTest] = useState<any>();

  useEffect(() => {
    if (testId) {
      const fetchTest = async () => {
        try {
          const response = await getIndividualPlayerTest(testId);
          const data = response.data.data.test;
          console.log(data);
          setTest(data);
        } catch (error) {
          console.error("Failed to get individual test:", error);
        }
      };
      fetchTest();
    }
  }, [testId]);
  console.log(test, "test");

  const testData = {
    name: test?.name || "",
    status: test?.status,
    country: test?.countryId._id || "",
    topic: test?.topicId._id || "",
    questionsId: test?.questionsId,
    documentationsId: test?.documentationsId || [],
    id: testId || "",
    localeData: test?.localeData || {},
  };
 console.log(testData, "testData passed in");
  return <PlayerTestForm typeOfForm="update" testData={testData} />;
};

export default UpdatePlayerTest;
