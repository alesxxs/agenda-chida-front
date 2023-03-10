import { useField } from "informed";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const AmountInput = (props) => {
  const { defaultValue } = props;
  const { textTitle } = props;
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
          setValue(e.target.value, e);
        }}
        onBlur={(e) => {
          setTouched(true, e);
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        label={textTitle}
        helperText={error ? error : null}
        error={error ? true : null}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default AmountInput;
