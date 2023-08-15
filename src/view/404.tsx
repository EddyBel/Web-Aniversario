export const Error404 = () => {
  return (
    <div className="w-full min-h-[80vh] flex flex-col gap-3 justify-center items-center">
      <h3 className="text-xl font-Roboto font-bold text-center">Upps! creo que la pagina no existe</h3>
      <h1 className="text-9xl sm:text-[300px] font-Righteous text-red-500" style={{ textShadow: '15px 15px 0px #000' }}>
        404
      </h1>
    </div>
  );
};
