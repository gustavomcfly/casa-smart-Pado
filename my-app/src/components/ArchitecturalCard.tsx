interface CardProps {
  image: string;
  title: string;
  description: string;
  index: string;
}

export function ArchitecturalCard({ image, title, description }: CardProps) {
  return (
    <div className="group relative size-50 overflow-hidden rounded-none sm:rounded-xl bg-gray-900 cursor-pointer">
      <img
        src={image}
        alt="Camera tal"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover: backdrop-opacity-100"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />
      {/*Seguir  CONTENT CONTAINER*/}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-5 flex flex-col justify-end">
        <div className="w-12 h-1 bg-white -mb-2 transition-all duration-500 group-hover:w-24" />
        <div className="relative z-10 transform transition-all duration-500 translate-y-5 group:hover:translate-y-0">
          <h3 className=" md:text-2xl font-bold text-white uppercase tracking-[0.2em] mb-2">
            {title}
          </h3>
          <p className="pb-5 text-sm md:text-base text-gray-300 font-light tracking-wide max-w-md">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
