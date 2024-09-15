function LeftIcons() {
  return (
    <div className="fixed left-0 bottom-0 px-10  sm:static">
      <div className="flex flex-col items-center">
      <div className=" flex flex-col gap-3 sm:flex-row">
        <a href="https://www.facebook.com/rodrigo.bilbao.792" target="_blank">
          <i className="ri-facebook-circle-line text-gray-500 text-xl"></i>
        </a>
        <a href="https://www.instagram.com/rodrigo_84_bil/" target="_blank"> 
        <i className="ri-instagram-line text-gray-500 text-xl"></i>
        </a>
        <a href="https://www.linkedin.com/in/rodrigo-bilbao-20a999204/" target="_blank">
        <i className="ri-linkedin-box-line text-gray-500 text-xl"></i>
        </a>
        <a href="https://github.com/Ro1984Bi" target="_blank">
        <i className="ri-github-line text-gray-500 text-xl"></i>
        </a>
        <a href="https://wa.link/zfzuyl" target="_blank">
        <i className="ri-whatsapp-line text-gray-500 text-xl"></i>
        </a>
      </div>
      <div className=" w-[1px] h-32 bg-[#125f63] sm:hidden">

      </div>
      </div>
    </div>
  );
}

export default LeftIcons;
