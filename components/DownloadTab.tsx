import { downloadPage } from "utils";

const DownloadTab = () => {
  return (
    <div className="relative m-8 overflow-hidden bg-white lg:m-16">
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div
          className="relative h-full mx-auto text-lg max-w-prose"
          aria-hidden="true"
        >
          <svg
            className="absolute transform translate-x-32 top-12 left-[80%]"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            />
          </svg>
          <svg
            className="absolute transform -translate-x-32 -translate-y-1/2 top-1/2 right-full"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
        </div>
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-lg max-w-prose">
          <h1>
            <span className="block text-base font-semibold tracking-wide text-center text-indigo-600 uppercase">
              {downloadPage.subtitle}
            </span>
            <span className="block mt-2 text-2xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
              {downloadPage.title}
            </span>
          </h1>

          <div className="mt-6 prose prose-lg text-gray-500 prose-indigo fon">
            {downloadPage.descriptions.map((description, i) => (
              <div key={i.toString()} className="mb-8 text-base text-gray-500">
                {description}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-x-4">
            <div>
              <button
                onClick={() => window.open(downloadPage.download.url)}
                className="inline-flex items-center px-4 py-2 text-base font-medium text-center text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
              >
                <svg
                  className="w-4 h-4 mr-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>{downloadPage.download.text}</span>
              </button>
              <div className="text-sm text-center text-gray-500">
                {downloadPage.download.subtitle}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadTab;
