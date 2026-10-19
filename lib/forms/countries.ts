/**
 * Country calling codes for the phone field, with the accepted length of the
 * national number (digits after the country code, without a leading trunk 0).
 * Lengths follow each country's numbering plan; `min`/`max` cover both mobile
 * and landline numbers. UAE is the default (Level141 is headquartered in Dubai).
 */
export type Country = { iso: string; name: string; dial: string; min: number; max: number };

export const DEFAULT_COUNTRY = "AE";

export const countries: readonly Country[] = [
  { iso: "AR", name: "Argentina", dial: "54", min: 10, max: 11 },
  { iso: "AU", name: "Australia", dial: "61", min: 9, max: 9 },
  { iso: "AT", name: "Austria", dial: "43", min: 7, max: 13 },
  { iso: "BH", name: "Bahrain", dial: "973", min: 8, max: 8 },
  { iso: "BD", name: "Bangladesh", dial: "880", min: 10, max: 10 },
  { iso: "BE", name: "Belgium", dial: "32", min: 8, max: 9 },
  { iso: "BR", name: "Brazil", dial: "55", min: 10, max: 11 },
  { iso: "CA", name: "Canada", dial: "1", min: 10, max: 10 },
  { iso: "CL", name: "Chile", dial: "56", min: 9, max: 9 },
  { iso: "CN", name: "China", dial: "86", min: 10, max: 11 },
  { iso: "CO", name: "Colombia", dial: "57", min: 10, max: 10 },
  { iso: "CY", name: "Cyprus", dial: "357", min: 8, max: 8 },
  { iso: "DK", name: "Denmark", dial: "45", min: 8, max: 8 },
  { iso: "EG", name: "Egypt", dial: "20", min: 9, max: 10 },
  { iso: "FI", name: "Finland", dial: "358", min: 6, max: 11 },
  { iso: "FR", name: "France", dial: "33", min: 9, max: 9 },
  { iso: "DE", name: "Germany", dial: "49", min: 7, max: 12 },
  { iso: "GH", name: "Ghana", dial: "233", min: 9, max: 9 },
  { iso: "GR", name: "Greece", dial: "30", min: 10, max: 10 },
  { iso: "HK", name: "Hong Kong", dial: "852", min: 8, max: 8 },
  { iso: "IN", name: "India", dial: "91", min: 10, max: 10 },
  { iso: "ID", name: "Indonesia", dial: "62", min: 9, max: 12 },
  { iso: "IQ", name: "Iraq", dial: "964", min: 10, max: 10 },
  { iso: "IE", name: "Ireland", dial: "353", min: 7, max: 9 },
  { iso: "IL", name: "Israel", dial: "972", min: 8, max: 9 },
  { iso: "IT", name: "Italy", dial: "39", min: 6, max: 11 },
  { iso: "JP", name: "Japan", dial: "81", min: 9, max: 10 },
  { iso: "JO", name: "Jordan", dial: "962", min: 8, max: 9 },
  { iso: "KZ", name: "Kazakhstan", dial: "7", min: 10, max: 10 },
  { iso: "KE", name: "Kenya", dial: "254", min: 9, max: 9 },
  { iso: "KW", name: "Kuwait", dial: "965", min: 8, max: 8 },
  { iso: "LB", name: "Lebanon", dial: "961", min: 7, max: 8 },
  { iso: "MY", name: "Malaysia", dial: "60", min: 9, max: 10 },
  { iso: "MX", name: "Mexico", dial: "52", min: 10, max: 10 },
  { iso: "MA", name: "Morocco", dial: "212", min: 9, max: 9 },
  { iso: "NP", name: "Nepal", dial: "977", min: 8, max: 10 },
  { iso: "NL", name: "Netherlands", dial: "31", min: 9, max: 9 },
  { iso: "NZ", name: "New Zealand", dial: "64", min: 8, max: 10 },
  { iso: "NG", name: "Nigeria", dial: "234", min: 8, max: 10 },
  { iso: "NO", name: "Norway", dial: "47", min: 8, max: 8 },
  { iso: "OM", name: "Oman", dial: "968", min: 8, max: 8 },
  { iso: "PK", name: "Pakistan", dial: "92", min: 9, max: 10 },
  { iso: "PE", name: "Peru", dial: "51", min: 8, max: 9 },
  { iso: "PH", name: "Philippines", dial: "63", min: 9, max: 10 },
  { iso: "PL", name: "Poland", dial: "48", min: 9, max: 9 },
  { iso: "PT", name: "Portugal", dial: "351", min: 9, max: 9 },
  { iso: "QA", name: "Qatar", dial: "974", min: 8, max: 8 },
  { iso: "RO", name: "Romania", dial: "40", min: 9, max: 9 },
  { iso: "RU", name: "Russia", dial: "7", min: 10, max: 10 },
  { iso: "SA", name: "Saudi Arabia", dial: "966", min: 8, max: 9 },
  { iso: "SG", name: "Singapore", dial: "65", min: 8, max: 8 },
  { iso: "ZA", name: "South Africa", dial: "27", min: 9, max: 9 },
  { iso: "KR", name: "South Korea", dial: "82", min: 8, max: 10 },
  { iso: "ES", name: "Spain", dial: "34", min: 9, max: 9 },
  { iso: "LK", name: "Sri Lanka", dial: "94", min: 9, max: 9 },
  { iso: "SE", name: "Sweden", dial: "46", min: 7, max: 10 },
  { iso: "CH", name: "Switzerland", dial: "41", min: 9, max: 9 },
  { iso: "TW", name: "Taiwan", dial: "886", min: 8, max: 9 },
  { iso: "TZ", name: "Tanzania", dial: "255", min: 9, max: 9 },
  { iso: "TH", name: "Thailand", dial: "66", min: 8, max: 9 },
  { iso: "TR", name: "Türkiye", dial: "90", min: 10, max: 10 },
  { iso: "UA", name: "Ukraine", dial: "380", min: 9, max: 9 },
  { iso: "AE", name: "United Arab Emirates", dial: "971", min: 8, max: 9 },
  { iso: "GB", name: "United Kingdom", dial: "44", min: 9, max: 10 },
  { iso: "US", name: "United States", dial: "1", min: 10, max: 10 },
  { iso: "VN", name: "Vietnam", dial: "84", min: 9, max: 10 },
];

export const findCountry = (iso: string) => countries.find((c) => c.iso === iso);

/**
 * Reduces a typed number to its national digits: strips spaces, dashes, dots
 * and brackets, a pasted "+<dial>" or "00<dial>" prefix, and a trunk "0".
 */
export function nationalDigits(raw: string, country?: Country): string {
  let d = raw.replace(/[\s().-]/g, "");
  if (country) {
    if (d.startsWith(`+${country.dial}`)) d = d.slice(country.dial.length + 1);
    else if (d.startsWith(`00${country.dial}`)) d = d.slice(country.dial.length + 2);
  }
  return d.replace(/^0+/, "");
}
