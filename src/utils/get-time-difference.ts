export function getTimeDifference(sunrise: string, sunset: string) {
  const [sunriseHours, sunriseMinutes] = sunrise.split(":").map(Number);
  const totalSunriseMinutes = sunriseHours * 60 + sunriseMinutes;

  const [sunsetHours, sunsetMinutes] = sunset.split(":").map(Number);
  const totalSunsetMinutes = sunsetHours * 60 + sunsetMinutes;

  const differenceMinutes = totalSunsetMinutes - totalSunriseMinutes;

  const diffHours = Math.floor(differenceMinutes / 60);
  const diffMinutes = differenceMinutes % 60;

  return { hours: diffHours, minutes: diffMinutes };
}
