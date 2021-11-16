import { React, useState } from "react";
import {render, fireEvent } from "@testing-library/react";
import { Input } from "./Inputs";
import validateFirstName from "../../common/validators";

it("renders correctly", () => {
    const id = "test-input";
    const placeholder = "myplaceholder";
    const label = "My Field";
    // const [inputValue, setInputValue] = useState('');
    // const [inputValid, setInputValid] = useState(false);
    // const [inputAttempted, setInputAttempted] = useState(false);

    const isValidInput = (val) => {
        if (val.length > 3) {
            return true;
        }
        else{
            return false;
        }
    }

    const handleOnChange = (e) => {
        console.log(e.target.value);
    }

    const {queryByTestId, queryByPlaceholderText} = render(<Input
        id={id}
        label = {label}
        placeholder={placeholder} 
        type='text'
        value= ''
        onChange= {handleOnChange}
        // complete={inputAttempted && inputValid}
        // warning={inputAttempted && !inputValid}
        />);

    expect(queryByTestId(`field-${id}`)).toBeTruthy();
    expect(queryByPlaceholderText(placeholder)).toBeTruthy();
});

describe("Input Value", () => {

    it("Calls on change", () => {
    const id = "test-input";
    const placeholder = "myplaceholder";
    const inputValue=  "";
    const label = "My Field";

    const { queryByPlaceholderText } = render(<Input
        id={id}
        label = {label}
        placeholder={placeholder} 
        type='text'
        value= {inputValue}
        onChange={(e)=> expect(e.target.value).toBe("test")}
        />);
    
    const textInput = queryByPlaceholderText(placeholder);
    
    fireEvent.change(textInput, {target: {value: "test"}});
    });
})

describe("Renders Icon", () => {
    it("Check Icon displayed when value is valid and input is attempted", () => {
    const id = "test-input";
    const placeholder = "myplaceholder";
    const inputValue=  "something valid";
    const label = "My Field";

    const { queryByTestId } = render(<Input
        id={id}
        label = {label}
        placeholder={placeholder} 
        type='text'
        value= {inputValue}
        onChange={(e)=> {}}
        attempted={true}
        valid={true}
        />);

    expect(queryByTestId("Check Icon")).toBeTruthy();
    });
})

describe("Renders Icon", () => {
    it("Warning Icon displayed when value is valid and input is attempted", () => {
    const id = "test-input";
    const placeholder = "myplaceholder";
    const inputValue=  "something invalid";
    const label = "My Field";

    const { queryByTestId } = render(<Input
        id={id}
        label = {label}
        placeholder={placeholder} 
        type='text'
        value= {inputValue}
        onChange={(e)=> {}}
        attempted={true}
        valid={false}
        />);

    expect(queryByTestId("Warning Icon")).toBeTruthy();
    });
})