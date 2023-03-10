import { useField } from "informed";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const TextArea = (props) => {
  const { defaultValue } = props;
  const { render, fieldState, fieldApi, ref, userProps } = useField({
    ...props,
  });
  const { error } = fieldState;
  const { setValue, setTouched } = fieldApi;

  const { label, id, ...rest } = userProps;

  return render(
    <div className="textAreaCustom">
      <TextareaAutosize
        {...userProps}
        ref={ref}
        onChange={(e) => {
          setValue(e.target.value, e);
        }}
        onBlur={(e) => {
          setTouched(true, e);
        }}
        helperText={error ? error : null}
        error={error ? true : null}
        placeholder={label}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default TextArea;
