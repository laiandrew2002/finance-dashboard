/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { convertAmountMiliunits } from "@/lib/utils";
import { format, parse } from "date-fns";
import{
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImportTable } from "./ImportTable";


const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = [
  'amount',
  'date',
  'payee',
];

interface SelectedColumnState {
  [key: string]: string | null;
}

type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export const ImportCard = ({
  data, onCancel, onSubmit,
}: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>({});
  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };
      
      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === 'skip') {
        value = null;
      }
      newSelectedColumns[`column_ ${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split(' ')[1];
    };

    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_ ${index}`);
        return selectedColumns[`column_ ${columnIndex}`] || null;
      }),
      body: body.map((row) => {
        const transfromedRow = row.map((cell, index) => {
          const columnIndex = getColumnIndex(`column_ ${index}`);
          return selectedColumns[`column_ ${columnIndex}`] ? cell : null;
        });

        return transfromedRow.every((item) =>  item === null)
          ? []
          : transfromedRow;
      }).filter((row) => row.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];
        if (header !== null) {
          acc[header] = cell;
        }
        return acc;
      }, {});
    });

    const formatedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountMiliunits(item.amount),
      date: format(parse(item.date.trim(), dateFormat, new Date()), outputFormat),
    }));

    onSubmit(formatedData);
  };

  return (
    <div className="max-w-screen-2xl mx-auto pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gay-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Import Transaction</CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <Button
              size="sm"
              onClick={onCancel}
              className="w-full lg:w-auto"
            >
              Cancel
            </Button>
            <Button
              disabled={progress <requiredOptions.length}
              size="sm"
              onClick={handleContinue}
              className="w-full lg:w-auto"
            >
              Continue ({progress}/{requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};