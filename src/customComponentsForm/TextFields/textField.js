import { useField } from "informed";
import { TextField } from "@mui/material";

const CustomInput = (props) => {
  const { defaultValue } = props;

  const { render, fieldState, fieldApi, ref, userProps } = useField({
    ...props,
  });
  const { error } = fieldState;
  const { setValue, setTouched } = fieldApi;

  return render(
    <>
      <TextField
        {...userProps}
        ref={ref}
        onChange={(e) => {
          props.type === "file"
            ? setValue(e.target.files[0])
            : setValue(e.target.value, e);
        }}
        onBlur={(e) => {
          setTouched(true, e);
        }}
        helperText={error ? error : null}
        error={error ? true : null}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default CustomInput;
