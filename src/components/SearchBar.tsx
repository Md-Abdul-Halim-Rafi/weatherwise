import { Input, Form } from "antd";
import qs from "query-string";
import styled from "styled-components";
import { SearchParams } from "../common/interfaces";

const FormWrapper = styled(Form)`
    border-radius: 6px;
    position: sticky;
    top: 20px;
`;

const initialValues: SearchParams = {
    q: qs.parse(window.location.search).q as string || "",
};

const SearchBar = () => {

    const onSearchSubmit = (values: SearchParams) => {
        window.location.href = `?q=${values.q}`;
    }

    return (
        <FormWrapper
            name="basic"
            autoComplete="off"
            validateTrigger="onSubmit"
            initialValues={initialValues}
            onFinish={(values) => onSearchSubmit(values as SearchParams)}
        >
            <Form.Item
                name="q"
                rules={[{ 
                    required: true, 
                    message: "Please input a city name or zip code" 
                }]}
            >
                <Input
                    size="large"
                    placeholder="Search for a weather forecast by city name or zip code"
                />
            </Form.Item>
        </FormWrapper>
    );
}

export default SearchBar;
