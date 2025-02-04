export default function Footer() {
  return (
    <footer className="bg-black text-neutral-content font-semibold">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <span className="footer-title text-white">Services</span>
            <a className="link-hover link mt-2 text-gray-400">Branding</a>
            <a className="link-hover link text-gray-400">Design</a>
            <a className="link-hover link text-gray-400">Marketing</a>
            <a className="link-hover link text-gray-400">Advertisement</a>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <span className="footer-title text-white">Company</span>
            <a className="link-hover link mt-2 text-gray-400">About us</a>
            <a className="link-hover link text-gray-400">Contact</a>
            <a className="link-hover link text-gray-400">Jobs</a>
            <a className="link-hover link text-gray-400">Press kit</a>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <span className="footer-title text-white">Legal</span>
            <a className="link-hover link mt-2 text-gray-400">Terms of use</a>
            <a className="link-hover link text-gray-400">Privacy policy</a>
            <a className="link-hover link text-gray-400">Cookie policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

  
  
  
  
  