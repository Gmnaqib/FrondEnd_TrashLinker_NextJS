import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-300 text-center border-t mt-5 flex sm:flex-row flex-col justify-between items-center space-y-3 sm:mb-0 mb-3 p-6 border-gray-200">
      <div className="flex flex-col sm:flex-row sm:justify-between w-full items-center">
        {/* Logo dan Nama */}
        <a className="flex text-teal-600 items-center space-x-2">
          <img className="h-16" src="/logo.png" alt="TrashLinker Logo" />
          <div>
            <span className="text-black text-2xl font-bold">Trash</span>
            <span className="text-[rgba(50,195,108,1)] text-2xl font-bold">Linker</span>
          </div>
        </a>

        {/* Alamat, Kontak, dan Partner */}
        <div className="flex sm:flex-row flex-col sm:space-x-10 space-y-5 sm:space-y-0 mt-5 sm:mt-0">
          {/* Alamat */}
          <div className="flex flex-col space-y-2">
            <span>Jl. Dipati Ukur No. 176</span>
            <span>Kec. Sukahaji, Kota Bandung</span>
            <span>Jawa Barat 40221</span>
          </div>

          {/* Kontak */}
          <div className="flex flex-col space-y-2">
            <span>0867-5678-3456 (WA CS 1)</span>
            <span>0867-5678-3456 (WA CS 2)</span>
            <span>info.trashlinker@gmail.com</span>
          </div>

          {/* Partner */}
          <div className="flex flex-col space-y-2 items-center sm:items-start">
            <h2 className="font-semibold">Partner Kami</h2>
            <div className="flex space-x-4">
              <img src="/img/img_bank.png" className="w-20" alt="Bank Partner" />
              <img src="/img/img_sipsn.png" className="w-20" alt="SIPSN Partner" />
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
}