import React, { Suspense } from "react";
import { Typography, Skeleton } from "antd";
import qs from "query-string";
import { useQuery, QueryFunctionContext } from "react-query";
import { axios } from "./common/utils/axios-instance.utils";

import WeatherResult from "./components/WeatherResult";

import { SearchParams, WeatherQueryResponse } from "./common/interfaces";

import "./App.css";

const { Title, Text } = Typography;

const SearchBar = React.lazy(() => import("./components/SearchBar"));

function App() {

	const searchForWeather = async (queryData: QueryFunctionContext) => {

		const parsedQ = qs.parse(queryData.queryKey[1] as string).q;

		if (!parsedQ) return null;

		const searchParams = qs.parse(queryData.queryKey[1] as string) as unknown as SearchParams;

		const queries = `?q=${searchParams.q}&days=3`;

		try {

			const { data } = await axios.get<WeatherQueryResponse>(
				`/forecast.json${queries}`
			);

			return data;

		} catch (err) {
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
		// enabled: qs.parse(window.location.search).q !== undefined,
	});

	return (
		<div className="App">
			<a href="/">
				<Title level={1}>Weather Wise</Title>
			</a>
			<Suspense
				fallback={
					<Skeleton.Input size="large" style={{ width: "100%" }} />
				}
			>
				<SearchBar />
			</Suspense>
			{
				isLoading ?
					<Skeleton /> :
					data && data.current ?
						<WeatherResult
							current={data.current}
							forecast={data.forecast}
							location={data.location}
						/> : null
			}
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
