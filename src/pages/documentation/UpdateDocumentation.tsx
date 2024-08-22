import React, { useEffect, useState } from "react";
import DocumentationForm from "./DocumentationForm";
import { useParams } from "react-router-dom";
import { getIndividualDocument } from "../../api/documentation";
import { localeData } from "../../../../histolingo-server/localization";

const UpdateDocumentation = () => {
  const { documentationId } = useParams<{ documentationId?: string }>();
  const [documentation, setDocumentation] = useState<any>();
  useEffect(() => {
    if (documentationId) {
      const fetchDocumentation = async () => {
        try {
          const response = await getIndividualDocument(documentationId);
          const data = response.data.data.documentation;
          console.log(response, "response");
          setDocumentation(data);
        } catch (error) {
          console.error("Failed to get individual documentation:", error);
        }
      };
      fetchDocumentation();
    }
  }, [documentationId]);

  console.log(documentation, "documentation");

  const documentationData = {
    name: documentation?.name || "",
    content: documentation?.content || "",
    id: documentationId || "",
    localeData: documentation?.localeData || {},
    status: documentation?.status === 1 ? "active" : "inactive",
    source: documentation?.source || "",
    country: documentation?.countryId._id || "",
    topic: documentation?.topicId._id || "",
  }

  // export interface DocumentationFormProps {
  //   typeOfForm: string;
  //   documentationData?: {
  //     name: string;
  //     content: string;
  //     source: string;
  //     countryId: string;
  //     topicId: string;
  //     id: string;
  //     status: number;
  //     localeData: {
  //       "en-US": { name: string; content: string };
  //       "ja-JP": { name: string; content: string };
  //       "vi-VN": { name: string; content: string };
  //     };
  //   };
  // }
    
  return <DocumentationForm typeOfForm="update" documentationData={documentationData} />;
};

export default UpdateDocumentation;
