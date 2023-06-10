import { Typography } from "antd";
import styled from "styled-components";

import WeatherCard from "./WeatherCard";

import { WeatherQueryResponse } from "../common/interfaces";
import Forecasts from "./Forecasts";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const TodayData = styled.div`
    width: 100%;
`;

const { Title } = Typography;

const WeatherResult = (props: WeatherQueryResponse) => {

    return (
        <Wrapper>
            <Title level={3}>Today</Title>
            <TodayData>
                <WeatherCard
                    condition={props.current.condition}
                    date={props.current.last_updated}
                    humidity={props.current.humidity}
                    temperature={props.current.temp_c}
                    temperatureUnit="c"
                    windSpeedUnit="kph"
                    windSpeed={props.current.wind_kph}
                />
            </TodayData>

            <Title level={3}>Upcoming Days</Title>
            <Forecasts forecasts={props.forecast.forecastday} />
        </Wrapper>
    );
}

export default WeatherResult;
