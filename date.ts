/**
 * convert YYYY MM DD -> DD MM YYYY
 * @param dateString date string value
 * @param separator separator string - or /
 */
export function dateSpliter(
  dateString: string,
  inputSeparator: string = '-',
  outputSeparator: string = '-'
) {
  const parts = dateString.split(inputSeparator);
  if (parts.length === 3) {
    return `${parts[2]}${outputSeparator}${parts[1]}${outputSeparator}${parts[0]}`;
  } else {
    return dateString;
  }
}
export function dateHourParser(date1: Date, date2: Date) {
  // Supposons que date1 et date2 soient des objets Date

  // Extraire l'année, le mois et le jour de date1
  const year = date1.getFullYear();
  const month = date1.getMonth() + 1; // Les mois sont indexés à partir de 0, donc +1
  const day = date1.getDate();

  // Extraire l'heure et les minutes de date2
  const hours = date2.getHours();
  const minutes = date2.getMinutes();

  // Construire une nouvelle date en combinant date1 et date2
  const combinedDate = new Date(year, month - 1, day, hours, minutes);

  // Formatter la date au format YYYY-MM-dd HH:mm
  const formattedDate = `${combinedDate.getFullYear()}-${(
    combinedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${combinedDate
    .getDate()
    .toString()
    .padStart(2, '0')} ${combinedDate
    .getHours()
    .toString()
    .padStart(2, '0')}:${combinedDate
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  return formattedDate; // Affiche la date finale au format YYYY-MM-dd HH:mm
}
