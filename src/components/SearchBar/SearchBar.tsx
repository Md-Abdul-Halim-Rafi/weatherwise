import { Input, Form } from "antd";
import styled from "styled-components";
import { SearchParams } from "../../common/interfaces";

const FormWrapper = styled(Form)`
    border-radius: 6px;
`;

const initialValues: SearchParams = {
    q: "",
};

const SearchBar = () => {

    const onSearchSubmit = (values: SearchParams) => {
        window.history.pushState({}, "", `?q=${values.q}`);
    }

    return (
        <FormWrapper
            name="basic"
            initialValues={initialValues}
            autoComplete="off"
            validateTrigger="onSubmit"
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
                    allowClear
                    size="large"
                    placeholder="Search for a weather forecast by city name or zip code"
                />
            </Form.Item>
        </FormWrapper>
    );
}

export default SearchBar;
