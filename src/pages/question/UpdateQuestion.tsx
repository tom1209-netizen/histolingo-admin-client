import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import { useParams } from "react-router-dom";
import { getIndividualQuestion } from "../../api/question";

const UpdateQuestion = () => {
  const { questionId } = useParams<{ questionId?: string }>();
  const [question, setQuestion] = useState<any>();
  useEffect(() => {
    if (questionId) {
      const fetchQuestion = async () => {
        try {
          const response = await getIndividualQuestion(questionId);
          const data = response.data.data.question;
          console.log(response, "response");
          setQuestion(data);
        } catch (error) {
          console.error("Failed to get individual question:", error);
        }
      };
      fetchQuestion();
    }
  }, [questionId]);

  console.log(question, "question");

  const questionData = {
    ask: question?.ask || "",
    topicId: question?.topicId._id || {},
    countryId: question?.countryId._id || {},
    answer: question?.answer,
    questionType: Number(question?.questionType),
    localeData: question?.localeData || {},
    id: questionId || "",
    status: question?.status,
  };

  console.log(questionData, "data passed in");

  return <QuestionForm typeOfForm="update" questionData={questionData} />;
};

export default UpdateQuestion;
