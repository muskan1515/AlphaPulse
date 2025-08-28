const formatTimePublished = (rawTime: string) => {
  const year = rawTime.slice(0, 4);
  const month = rawTime.slice(4, 6);
  const day = rawTime.slice(6, 8);
  const hour = rawTime.slice(9, 11);
  const minute = rawTime.slice(11, 13);
  const second = rawTime.slice(13, 15);

  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);

  return date.toISOString().replace("T", " ").slice(0, 19);
}

export default formatTimePublished