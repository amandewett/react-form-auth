import { useRef } from "react";

const FilePicker = (props: any) => {
  const imageRef = useRef<any>();
  const { htmlFor, imageSrc } = props.inputProps;

  const handlePickClick = () => {
    imageRef.current?.click();
  };

  return (
    <>
      <div className="mb-2">
        <div className="flex">
          {imageSrc === null ? (
            <div className="w-32 h-32 m-2 p-0 object-cover rounded-lg border-dotted border-4 border-aPrimaryColor bg-slate-200"></div>
          ) : (
            <img
              src={imageSrc}
              className="w-32 h-32 m-2 p-0 rounded-lg border-dotted border-4 border-aPrimaryColor bg-no-repeat bg-cover object-cover"
            />
          )}

          <div>
            <input
              className="hidden"
              type="file"
              id={htmlFor}
              accept="image/png, image/jpeg"
              name={htmlFor}
              ref={imageRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.onchange(e.target.files![0]);
              }}
            />
          </div>
          <button
            className="self-end bg-aPrimaryColor mb-3 ml-2 p-2 rounded-lg border-none text-sm"
            type="button"
            onClick={handlePickClick}
          >
            Pick an Image
          </button>
        </div>
      </div>
    </>
  );
};

export default FilePicker;
