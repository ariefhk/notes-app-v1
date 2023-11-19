import { useState } from "react";

export default function useInput(defaultValue = "") {
    const [val, setVal] = useState(defaultValue);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onValChange = (event) => {
        setVal(event.target.value);
    };

    const onValChangeCs = (event, cb) => {
        setVal(event.target.value);

        if (cb && typeof cb === "function") {
            cb();
        }
    };

    const clearVal = (props) => {
        if (!props) {
            setVal(defaultValue);
        } else {
            setVal(props);
        }
    };

    const chgSubmitStatus = (props) => {
        setIsSubmitting(props);
    };

    return { val, onValChange, onValChangeCs, clearVal, isSubmitting, chgSubmitStatus };
}
