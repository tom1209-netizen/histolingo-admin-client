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

  const testData = {
    name: test?.name || "",
    status: test?.status === 1 ? "active" : "inactive",
    countryId: test?.countryId || {},
    questionsId: test?.questionsId || [],
    topicId: test?.topicId || {},
    documentationsId: test?.documentationsId || [],
    id: testId || "",
    localeData: test?.localeData || {},
  };

  return <PlayerTestForm typeOfForm="update" testData={testData} />;
};

export default UpdatePlayerTest;
