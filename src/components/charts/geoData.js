let data = {
  "AL": 504.38,
  "AM": 6.5,
  "AO": 2.98,
  "AR": 0.32,
  "AT": 10.9,
  "AU": 5.02,
  "AZ": 17.38,
  "BA": 24.45,
  "BD": 13.4,
  "BE": 12.06,
  "BF": 93.37,
  "BG": 1.68,
  "BI": 0.95,
  "BJ": 93.36,
  "BR": 49.42,
  "BT": 10.03,
  "BY": 26.16,
  "CA": 0.96,
  "CD": 69.71,
  "CF": 4.57,
  "CG": 19.7,
  "CH": 6.19,
  "CI": 14.1,
  "CL": 1.4,
  "CM": 41.26,
  "CN": 2.6,
  "CO": 4.48,
  "CY": 7.69,
  "CZ": 23.09,
  "DK": 1.58,
  "EE": 9.91,
  "EG": 0.63,
  "ES": 4.96,
  "FI": 3.27,
  "FR": 43.26,
  "GA": 3.03,
  "GB": 14.3,
  "GE": 809.09,
  "GH": 39.78,
  "GM": 2.45,
  "GN": 45.98,
  "GQ": 23.74,
  "GR": 154.42,
  "HR": 5.46,
  "HU": 1.44,
  "ID": 16.87,
  "IE": 17.56,
  "IL": 412.24,
  "IN": 47.85,
  "IQ": 12.96,
  "IR": 1.13,
  "IT": 44.29,
  "JP": 3.27,
  "KE": 16.8,
  "KG": 253.37,
  "KH": 0.44,
  "KM": 1.26,
  "KZ": 116.3,
  "LA": 1.33,
  "LK": 0.53,
  "LR": 692.27,
  "LS": 5.9,
  "LT": 14.44,
  "LU": 6.95,
  "LV": 6.09,
  "MA": 0.2,
  "MD": 83.75,
  "ME": 319.75,
  "MG": 2386.35,
  "MK": 28.83,
  "ML": 48.68,
  "MM": 40.31,
  "MN": 0.66,
  "MR": 14.65,
  "MT": 11.65,
  "MV": 9.35,
  "MX": 0.04,
  "MY": 86.41,
  "MZ": 13.49,
  "NA": 12.9,
  "NE": 80.88,
  "NG": 31.44,
  "NL": 1.47,
  "NO": 2.47,
  "NP": 10.8,
  "NZ": 9.23,
  "PE": 1.29,
  "PK": 159.14,
  "PL": 8.24,
  "PT": 16.68,
  "RO": 63.05,
  "RS": 473.46,
  "RU": 14.24,
  "RW": 5.45,
  "SE": 2.64,
  "SG": 8.18,
  "SI": 3.37,
  "SK": 112.78,
  "SN": 3.37,
  "SO": 8.03,
  "SS": 19.3,
  "TD": 75.63,
  "TG": 34.84,
  "TH": 81.02,
  "TL": 9.46,
  "TN": 7.8,
  "TR": 7.08,
  "UA": 1439.02,
  "UG": 62.55,
  "US": 1.32,
  "UZ": 0.99,
  "VE": 179.55,
  "ZA": 3.09,
  "ZM": 9.82,
  "ZW": 0.06
}

export default function(){
    for(let country in data){
        data[country] = Math.round(Math.random() * 100)
    }

    data["SA"] = 100;

    return data;
}