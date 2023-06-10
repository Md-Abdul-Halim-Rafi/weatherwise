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

		// If there is no query, return null
		if (!parsedQ) return null;

		const searchParams = qs.parse(queryData.queryKey[1] as string) as unknown as SearchParams;

		// Making sure that the query is a string, and putting the day count to 3
		// TODO: Make the day count dynamic
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
		queryKey: ["weather", window.location.search], // When the query changes, the data will be refetched
		queryFn: searchForWeather,
		retry: false,
		refetchOnMount: false,
		staleTime: 5 * 60 * 1000, // 5 minutes
		refetchOnWindowFocus: false,
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
