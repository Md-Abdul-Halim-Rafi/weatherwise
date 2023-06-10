import styled from "styled-components";
import { Typography } from "antd";

import { ForecastDay } from "../common/interfaces";
import WeatherCard from "./WeatherCard";
import { isArrayAndHasContent } from "../common/utils";

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

const { Text } = Typography;

const Forecasts = (props: Props) => {

    return (
        <ListWrapper>
            {
                isArrayAndHasContent(props.forecasts) ?
                    props.forecasts.map((forcast) => (
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
                    )) : 
                    <Text>No forecast data for this location</Text>
                }
        </ListWrapper>
    );
}

export default Forecasts;
