export interface SearchParams {
    q: string;
    days?: number;
    temp_unit?: "c" | "f";
    wind_unit?: "kph" | "mph";
}