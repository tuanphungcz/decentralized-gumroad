const InputField = ({ title, children }) => (
  <div className="">
    <label className="block text-sm font-medium text-gray-700">
      {title}
      <span className="text-red-500">*</span>
    </label>
    <div className="mt-1">{children}</div>
  </div>
);

export default InputField;
