import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TopicForm from "./TopicForm";
import { getIndividualTopic } from "../../api/topic";

const UpdateTopic = () => {
  const { topicId } = useParams<{ topicId?: string }>();
  const [topic, setTopic] = React.useState<any>();
  useEffect(() => {
    if (topicId) {
      const fetchCountry = async () => {
        try {
          const response = await getIndividualTopic(topicId);
          const topic = response.data.data.topic;
          console.log(topic);
          setTopic(topic);
        } catch (error) {
          console.error("Failed to get individual topic:", error);
        }
      };
      fetchCountry();
    }
  }, [topicId]);

  console.log(topic, "topic");

  const topicData = {
    image: topic?.image || "",
    name: topic?.name || "",
    description: topic?.description || "",
    localeData: topic?.localeData || {},
    id: topicId || "",
    countryId: topic?.countryId,
    status: topic?.status
  };

  console.log(topicData, "data passed in");

  return <TopicForm typeOfForm="update" topicData={topicData} />;
};

export default UpdateTopic;
