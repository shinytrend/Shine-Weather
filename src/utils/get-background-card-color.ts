export const getBackgroundColor = (code: number): string => {
  switch (code) {
    case 1000:
      return "linear-gradient(135deg, #FFD700, #FFA500)"; // Sunny
    case 1003:
      return "linear-gradient(135deg, #FFFFCC, #D1D1A0)"; // Partly cloudy
    case 1006:
      return "linear-gradient(135deg, #D3D3D3, #A9A9A9)"; // Cloudy
    case 1009:
      return "linear-gradient(135deg, #A9A9A9, #808080)"; // Overcast
    case 1030:
      return "linear-gradient(135deg, #C0C0C0, #A6A6A6)"; // Mist
    case 1063:
      return "linear-gradient(135deg, #87CEEB, #00BFFF)"; // Patchy rain possible
    case 1066:
      return "linear-gradient(135deg, #ADD8E6, #87CEEB)"; // Patchy snow possible
    case 1069:
      return "linear-gradient(135deg, #B0E0E6, #87CEEB)"; // Patchy sleet possible
    case 1072:
      return "linear-gradient(135deg, #B0C4DE, #87CEEB)"; // Patchy freezing drizzle possible
    case 1087:
      return "linear-gradient(135deg, #FFA07A, #FF6347)"; // Thundery outbreaks possible
    case 1114:
      return "linear-gradient(135deg, #B0E0E6, #87CEEB)"; // Blowing snow
    case 1117:
      return "linear-gradient(135deg, #4682B4, #4169E1)"; // Blizzard
    case 1135:
      return "linear-gradient(135deg, #D3D3D3, #A9A9A9)"; // Fog
    case 1147:
      return "linear-gradient(135deg, #E0FFFF, #B0C4DE)"; // Freezing fog
    case 1150:
      return "linear-gradient(135deg, #B0E0E6, #87CEEB)"; // Patchy light drizzle
    case 1153:
      return "linear-gradient(135deg, #87CEEB, #00BFFF)"; // Light drizzle
    case 1168:
      return "linear-gradient(135deg, #AFEEEE, #87CEEB)"; // Freezing drizzle
    case 1171:
      return "linear-gradient(135deg, #87CEFA, #1E90FF)"; // Heavy freezing drizzle
    case 1180:
      return "linear-gradient(135deg, #B0C4DE, #87CEEB)"; // Patchy light rain
    case 1183:
      return "linear-gradient(135deg, #87CEFA, #1E90FF)"; // Light rain
    case 1186:
      return "linear-gradient(135deg, #6495ED, #4169E1)"; // Moderate rain at times
    case 1189:
      return "linear-gradient(135deg, #1E90FF, #0000FF)"; // Moderate rain
    case 1192:
      return "linear-gradient(135deg, #4169E1, #0000FF)"; // Heavy rain at times
    case 1195:
      return "linear-gradient(135deg, #0000FF, #000080)"; // Heavy rain
    case 1198:
      return "linear-gradient(135deg, #AFEEEE, #87CEEB)"; // Light freezing rain
    case 1201:
      return "linear-gradient(135deg, #87CEEB, #1E90FF)"; // Moderate or heavy freezing rain
    case 1204:
      return "linear-gradient(135deg, #87CEFA, #1E90FF)"; // Light sleet
    case 1207:
      return "linear-gradient(135deg, #1E90FF, #0000FF)"; // Moderate or heavy sleet
    case 1210:
      return "linear-gradient(135deg, #B0E0E6, #87CEEB)"; // Patchy light snow
    case 1213:
      return "linear-gradient(135deg, #87CEEB, #4682B4)"; // Light snow
    case 1216:
      return "linear-gradient(135deg, #6495ED, #4169E1)"; // Patchy moderate snow
    case 1219:
      return "linear-gradient(135deg, #1E90FF, #0000FF)"; // Moderate snow
    case 1222:
      return "linear-gradient(135deg, #4169E1, #000080)"; // Patchy heavy snow
    case 1225:
      return "linear-gradient(135deg, #0000FF, #000080)"; // Heavy snow
    case 1237:
      return "linear-gradient(135deg, #B0C4DE, #87CEEB)"; // Ice pellets
    case 1240:
      return "linear-gradient(135deg, #87CEFA, #1E90FF)"; // Light rain shower
    case 1243:
      return "linear-gradient(135deg, #1E90FF, #0000FF)"; // Moderate or heavy rain shower
    case 1246:
      return "linear-gradient(135deg, #0000FF, #000080)"; // Torrential rain shower
    case 1249:
      return "linear-gradient(135deg, #87CEEB, #4682B4)"; // Light sleet showers
    case 1252:
      return "linear-gradient(135deg, #6495ED, #4169E1)"; // Moderate or heavy sleet showers
    case 1255:
      return "linear-gradient(135deg, #87CEFA, #1E90FF)"; // Light snow showers
    case 1258:
      return "linear-gradient(135deg, #1E90FF, #0000FF)"; // Moderate or heavy snow showers
    case 1261:
      return "linear-gradient(135deg, #87CEEB, #4682B4)"; // Light showers of ice pellets
    case 1264:
      return "linear-gradient(135deg, #6495ED, #4169E1)"; // Moderate or heavy showers of ice pellets
    case 1273:
      return "linear-gradient(135deg, #87CEFA, #1E90FF)"; // Patchy light rain with thunder
    case 1276:
      return "linear-gradient(135deg, #1E90FF, #0000FF)"; // Moderate or heavy rain with thunder
    case 1279:
      return "linear-gradient(135deg, #87CEEB, #4682B4)"; // Patchy light snow with thunder
    case 1282:
      return "linear-gradient(135deg, #6495ED, #4169E1)"; // Moderate or heavy snow with thunder
    default:
      return "#FFFFFF"; // Default background color
  }
};
