import { ShortEventType } from "@/utils/sanity/types/event";

export function getPastEvents(
  events: Array<ShortEventType>,
): Array<ShortEventType> {
  const currentDate = new Date();

  if (!events) return [];

  // Set the current date to the start of the day for comparison
  currentDate.setHours(0, 0, 0, 0);

  // Filter out events where either dataInicial or dataFinal is before the current date
  const pastEvents = events.filter((event) => {
    return event?.datas?.some((data) => {
      
      const dataInicial = new Date(data.dataInicial);
      const dataFinal = data.dataFinal ? new Date(data.dataFinal) : undefined;
      // Set the dates to the start of the day for comparison
      dataInicial.setHours(0, 0, 0, 0);
      data.dataFinal && dataFinal && dataFinal.setHours(0, 0, 0, 0);

      return (dataFinal && dataFinal < currentDate) ||  (!dataFinal && dataInicial < currentDate);
    });
  });


  // Sort the past events in descending order based on the most recent dataInicial
  pastEvents.sort((a, b) => {
    const dateA = new Date(a.datas[0].dataInicial);
    const dateB = new Date(b.datas[0].dataInicial);

    // Sort in descending order
    return dateB.getTime() - dateA.getTime();
  });

  return pastEvents;
}

export function getUpcomingEvents(
  events: Array<ShortEventType>,
): Array<ShortEventType> {
  const currentDate = new Date();

  // Set the current date to the start of the day for comparison
  currentDate.setHours(0, 0, 0, 0);

  if (!events) return [];

  // Filter out events where either dataInicial or dataFinal is the current date or later
  const upcomingEvents = events.filter((event) => {
    return event?.datas?.some((data) => {
      const dataInicial = new Date(data.dataInicial);
      const dataFinal = new Date(data.dataFinal);

      // Set the dates to the start of the day for comparison
      dataInicial.setHours(0, 0, 0, 0);
      dataFinal.setHours(0, 0, 0, 0);

      return dataInicial >= currentDate || dataFinal >= currentDate;
    });
  });

  // Sort the upcoming events in ascending order based on the earliest dataInicial
  upcomingEvents.sort((a, b) => {
    const dateA = new Date(a.datas[0].dataInicial);
    const dateB = new Date(b.datas[0].dataInicial);

    // Sort in ascending order
    return dateA.getTime() - dateB.getTime();
  });

  return upcomingEvents;
}
