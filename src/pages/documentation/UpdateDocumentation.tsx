import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIndividualDocument } from "../../api/documentation";
import DocumentationForm from "./DocumentationForm";

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
    status: documentation?.status,
    source: documentation?.source || "",
    country: documentation?.countryId._id || "",
    topic: documentation?.topicId._id || "",
    image: documentation?.image || ""
  }
    
  return <DocumentationForm typeOfForm="update" documentationData={documentationData} />;
};

export default UpdateDocumentation;
