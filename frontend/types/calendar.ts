export interface Event {
    _id: string;
    title: string;
    description: string;
    start: Date;
    end: Date;
    calendarId: string;
  }
  
  export interface Calendar {
    _id: string;
    title: string;
    userId: string;
    eventsIds: Event[];
  }
  
  export type ListProps = {
    items: Calendar[];
  };