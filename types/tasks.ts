export interface newtaskprops {
  data: Array<{
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
  }>;
}

export interface alltaskprops {
  data: Array<{
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
  }>;
}

export interface taskItem {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}
