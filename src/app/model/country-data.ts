

export interface CountryInfo {
    flag?: string;
    iso2?: string;
    // iso3?: string;
    // lat?: number;
    // long?: number;
    // _id?: number;
}
export interface CountryData {
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    country: string;
    countryInfo: CountryInfo;
    updated: Date;
}