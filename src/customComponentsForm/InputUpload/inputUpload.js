import React from "react";
import { useField } from "informed";

const InputUpload = (props) => {
  const { render, fieldState, fieldApi, ref, userProps } = useField({
    ...props,
  });
  const { error } = fieldState;
  const { setValue, setTouched } = fieldApi;

  return render(
    <>
      <input
        {...userProps}
        ref={ref}
        onChange={(e) => {
          setValue(e.target, e);
        }}
        onBlur={(e) => {
          setTouched(true, e);
        }}
        helperText={error ? error : null}
        error={error ? true : null}
      />
    </>
  );
};

export default InputUpload;
