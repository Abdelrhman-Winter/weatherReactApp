import { ImSpinner8 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradientBg bg-cover bg-center bg-no-repeat px-4 lg:px-0">
      <div>
        <ImSpinner8 className="animate-spin text-5xl text-white" />
      </div>
    </div>
  );
};

export default Loader;
