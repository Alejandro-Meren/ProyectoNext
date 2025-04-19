declare module 'react-big-calendar' {
    import { ComponentType } from 'react';
  
    export interface CalendarProps<TEvent = object, TResource = object> {
      localizer: any;
      events: TEvent[];
      startAccessor: keyof TEvent | ((event: TEvent) => Date);
      endAccessor: keyof TEvent | ((event: TEvent) => Date);
      style?: React.CSSProperties;
      messages?: Record<string, string>;
      components?: Record<string, ComponentType<any>>;
      className?: string;
    }
  
    export const Calendar: ComponentType<CalendarProps>;
    export const dateFnsLocalizer: (config: any) => any;
  }