function Footer() {
    const year = new Date().getFullYear();
  return (
    <div className=" py-10">
      <div className=" h-[1px] bg-gray-700 w-full"></div>
      <div className=" flex justify-center items-center flex-col mt-10 opacity-70">
        <h1 className=" text-white">Designed and Developed By</h1>
        <h1 className=" text-white">
          <span className=" text-tertiary">Rodrigo Bilbao</span>
          <p className=" text-center">{year}</p>
        </h1>
      </div>
    </div>
  );
}

export default Footer;
