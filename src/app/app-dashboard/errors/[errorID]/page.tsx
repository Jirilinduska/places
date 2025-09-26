import { AppDashboardWrapper } from "@/components/AppDashboardWrapper";
import { ErrorLogItem } from "@/components/ErrorLogItem";
import { IErrorLog } from "@/interfaces/interfaces";
import { ErrorLog } from "@/models/ErrorLog";
import { Typography } from "@mui/material";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ errorID: string }>;
};

export default async function AppDashboardReportIDPage({ params }: Props) {
  const { errorID } = await params;

  const errorLogDB = await ErrorLog.findById(errorID).lean<IErrorLog>();

  if (!errorLogDB) {
    return notFound(); // TODO 
  }

  const errorLog = {
    ...errorLogDB,
    _id: errorLogDB._id?.toString(),
    context: {
      ...errorLogDB.context,
      input: JSON.stringify(errorLogDB.context.input),
    },
  };

  return (
    <AppDashboardWrapper>
      <Typography mb={2} variant="h6" fontWeight={600}>
        Error: {errorLog._id}
      </Typography>

      <ErrorLogItem
        _id={errorLog._id || ""}
        createdAt={errorLog.createdAt}
        env={errorLog.env}
        message={errorLog.message}
        action={errorLog.context.action}
        component={errorLog.context.component}
        input={errorLog.context.input}
        route={errorLog.context.route}
        url={errorLog.context.url}
        userID={errorLog.context.userID}
        isSolved={errorLog.isSolved}
        showFull
      />
    </AppDashboardWrapper>
  );
}
