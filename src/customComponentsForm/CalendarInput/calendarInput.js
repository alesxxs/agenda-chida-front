import { useField } from "informed";

const CalendarInput = (props) => {
  const { defaultValue } = props;
  const { fieldState, fieldApi, render, ref, userProps } = useField(props);

  const { value, error, showError } = fieldState;

  const { setValue, setTouched } = fieldApi;

  const { label, id, ...rest } = userProps;

  return (
    <div className="calendarCustomInput">
      <label htmlFor={id}>{label}</label>
      <input
        {...rest}
        id={id}
        ref={ref}
        value={defaultValue}
        onChange={(e) => {
          setValue(e.target.value, e);
        }}
        onBlur={(e) => {
          setTouched(true, e);
        }}
      />
    </div>
  );
};

export default CalendarInput;
