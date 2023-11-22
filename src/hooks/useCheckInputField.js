import { useState } from "react";

export default function useCheckInputField() {
    const [statusInput, setStatusInput] = useState(false);

    const makeStatusInputActive = () => {
        setStatusInput(true);
    };

    const makeStatusInputNonActive = () => {
        setStatusInput(false);
    };

    return { statusInput, makeStatusInputActive, makeStatusInputNonActive };
}
