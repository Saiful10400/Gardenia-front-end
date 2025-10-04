"use client"

const DropDown = ({ placeholder, disabled, className, name,values,defaultValue }) => {
  return (
    <div >
      <label className="font-medium" htmlFor={placeholder}>
        {placeholder}
      </label>

      <select
      defaultValue={defaultValue}
        name={name}
        required
        disabled={disabled}
        id={placeholder}
        className={`min-w-full focus:outline-none border border-gray-600 py-2 pl-2 rounded-lg text-lg font-medium ${className}`}
      >
        <option  hidden selected value="">Select One</option>
        {
            values?.map(item=><option key={item} value={item}>{item}</option>)
        }
      </select>
    </div>
  );
};

export default DropDown;
