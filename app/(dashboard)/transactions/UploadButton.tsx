/* eslint-disable @typescript-eslint/no-explicit-any */
import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";
import { Button } from "@/components/ui/button";

type Props = {
  onUpload: (results: any) => void;
}

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button
          {...getRootProps()}
          className="w-full lg:w-auto"
          size="sm"
        >
          <Upload className="size-4 mr-2" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};
