import styled from "styled-components";

import { ForecastDay } from "../common/interfaces";
import WeatherCard from "./WeatherCard";

interface Props {
    forecasts: ForecastDay[]
}

const ListWrapper = styled.div`
    width: 100%;    
    display: flex;
    margin-top: 20px;
    flex-direction: column;
`;

const Item = styled.div`
    margin-bottom: 20px;
`;

const Forecasts = (props: Props) => {

    return (
        <ListWrapper>
            {props.forecasts.map((forcast) => (
                <Item>
                    <WeatherCard
                        key={forcast.date}
                        date={forcast.date}
                        temperature={forcast.day.avgtemp_c}
                        temperatureUnit="c"
                        windSpeedUnit="kph"
                        humidity={forcast.day.avghumidity}
                        windSpeed={forcast.day.maxwind_kph}
                        condition={forcast.day.condition}
                    />
                </Item>
            ))}
        </ListWrapper>
    );
}

export default Forecasts;
