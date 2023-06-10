import { Typography } from "antd";
import styled from "styled-components";

interface Props {
    date: string;
    temperature: number;
    temperatureUnit: "c" | "f";
    windSpeedUnit: "kph" | "mph";
    humidity: number;
    windSpeed: number;
    condition: {
        text: string;
        icon: string;
    }
}

const CardWrapper = styled.div`
    display: flex;
    padding: 12px;
    border-radius: 6px;
    justify-content: space-between;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const BasicInfo = styled.div`
    display: flex; 
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between; 
`;

const ConditionWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
`;

const { Text } = Typography;

const WeatherCard = (props: Props) => {

    return (
        <CardWrapper>
            <BasicInfo>
                <Text style={{ marginBottom: "10px" }}>
                    {props.date}
                </Text>
                <Text>
                    <strong>Temperature:</strong> {props.temperature}° {props.temperatureUnit.toUpperCase()}
                </Text>
                <Text>
                    <strong>Humidity:</strong> {props.humidity}%
                </Text>
                <Text>
                    <strong>Wind Speed:</strong> {props.windSpeed} {props.windSpeedUnit.toUpperCase()}
                </Text>
            </BasicInfo>

            <ConditionWrapper>
                <Text>{props.condition.text}</Text>
                <img src={props.condition.icon} alt={props.condition.text} />
            </ConditionWrapper>
        </CardWrapper>
    );
}

export default WeatherCard;
