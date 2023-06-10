import { Typography } from "antd";
import qs from "query-string";
import { useQuery, QueryFunctionContext } from "react-query";
import { axios } from "./utils/axios-instance";

import SearchBar from "./components/SearchBar/SearchBar";

import { SearchParams, WeatherQueryResponse } from "./common/interfaces";

import "./App.css";

const { Title, Text } = Typography;

function App() {

	const searchForWeather = async (queryData: QueryFunctionContext) => {

		const searchParams = qs.parse(queryData.queryKey[1] as string) as unknown as SearchParams;

		const queries = `?q=${searchParams.q}&days=3`;

		try {

			const { data } = await axios.get<WeatherQueryResponse>(
				`/forecast.json${queries}`
			);

			return data;

		} catch (err) {
			// TODO: Handle error				
			throw err;
		}
	};

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["weather", window.location.search],
		queryFn: searchForWeather,
		retry: false,
		refetchOnMount: false,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		enabled: qs.parse(window.location.search).q !== undefined,
	});

	return (
		<div className="App">
			<Title level={1}>Weather Wise</Title>
			<SearchBar />
			{
				isError && (
					<Text
						strong
						type="danger"
					>
						{error as string}
					</Text>
				)
			}
		</div>
	)
}

export default App
