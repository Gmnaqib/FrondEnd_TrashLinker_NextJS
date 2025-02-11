import Link from "next/link";
import { Button } from "@nextui-org/button";
import CardFeature from "@/components/Card/CardFeature";
import Image from "next/image";
import "@/styles/globals.css";

export default function About() {
  return (
    <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
      <div>
        {/* Section 1 */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col lg:flex-row items-center gap-12 p-12 max-w-7xl w-full">
            {/* Left Section */}
            <div className="flex flex-col space-y-6 lg:w-1/2 w-full">
              <h1 className="text-3xl md:text-4xl font-extrabold text-center lg:text-left text-customGreen">
                Bersatu Bersihkan Lingkungan, Selamatkan Masa Depan
              </h1>
              <p className="text-gray-700 text-lg text-justify md:text-xl">
                TrashLinker adalah aplikasi inovatif yang menghubungkan
                komunitas dan masyarakat dalam upaya menjaga kebersihan
                lingkungan. Terinspirasi dari gerakan Pandawara, TrashLinker
                membantu pengguna menemukan lokasi sampah, mengetahui kondisi
                tempat yang memerlukan pembersihan, serta berkolaborasi dengan
                komunitas setempat untuk melakukan aksi nyata.
              </p>
              <div className="flex flex-col items-center md:items-start space-y-3">
                <Link href="/auth/signin">
                  <Button
                    className="bg-customGreen text-black px-8 py-3 rounded-lg text-lg transition-all duration-300 hover:bg-green-700 shadow-xl"
                    radius="sm"
                    variant="shadow"
                  >
                    Yuk Login...
                  </Button>
                </Link>
                <p className="text-sm text-gray-500 italic text-center md:text-left">
                  Jadilah Dampak Bagi Lingkungan Anda Sendiri!
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
              <Image src="/img/img_about.png" alt="About Image" width={500} height={500} />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
          <CardFeature
            icon="icon_postingan.svg"
            fitur="Pelaporan Lokasi Sampah"
            description="Pengguna dapat memposting lokasi sampah beserta foto, perkiraan kebutuhan orang, dan waktu pembersihan."
          />
          <CardFeature
            icon="icon_komunitas.svg"
            fitur="Kolaborasi komunitas"
            description="Pengguna dan komunitas dapat berkolaborasi untuk membersihkan area yang dilaporkan."
          />
          <CardFeature
            icon="icon_recycle.svg"
            fitur="Mengajak Bersosialisasi Sampah"
            description="Fitur untuk terhubung dengan pengepul atau bank sampah lokal."
          />
          <CardFeature
            icon="icon_location.svg"
            fitur="Lokasi Volunter"
            description="Menampilkan posisi volunteer terdekat."
          />
        </div>

        {/* Section 3 */}
        <div className="flex flex-col md:flex-row p-10 space-x-0 md:space-x-10 space-y-8 md:space-y-0">
          <Image
            className="w-full md:w-1/3 p-5 object-cover rounded-lg shadow-lg"
            src="/img/img_photo_trash1.png"
            alt="TrashLinker image"
            width={500} height={500}
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-customGreen text-4xl font-semibold p-3 md:p-0">
              Ayo Jadi Aktor Bebas Sampah!
            </h2>
            <p className="text-justify text-lg text-gray-700 p-3 md:p-0">
              TrashLinker adalah aplikasi inovatif yang menghubungkan komunitas
              dan masyarakat dalam upaya menjaga kebersihan lingkungan.
              Terinspirasi dari gerakan Pandawara, TrashLinker membantu pengguna
              menemukan lokasi sampah, mengetahui kondisi tempat yang memerlukan
              pembersihan, serta berkolaborasi dengan komunitas setempat untuk
              melakukan aksi nyata.
            </p>
            <p className="text-justify text-lg text-gray-700 p-3 md:p-0">
              Dengan fitur peta interaktif berbasis Mapbox, aplikasi ini
              memudahkan pengguna menemukan TPA/TPS terdekat, melaporkan area
              yang perlu dibersihkan, dan bergabung dalam kegiatan pembersihan
              yang diposting oleh orang lain. Pengguna juga dapat memposting
              foto sebelum dan sesudah pembersihan, memberikan edukasi untuk
              menjaga kebersihan, dan merasakan pengalaman yang lebih seru
              melalui gamifikasi seperti leaderboard komunitas paling aktif.
            </p>
            <p className="text-justify text-lg text-gray-700 p-3 md:p-0">
              TrashLinker juga memberikan kesempatan bagi lembaga atau sponsor
              untuk mendukung gerakan ini secara lebih luas, menjadikan
              lingkungan yang lebih bersih tanggung jawab kita bersama. Mari
              bergabung dan mulai bersihkan bumi untuk masa depan yang lebih
              baik!
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div className="flex flex-col md:flex-row p-10 space-x-0 md:space-x-10 space-y-8 md:space-y-0">
          <div className="flex flex-col justify-center md:w-2/3">
            <h2 className="text-customGreen text-4xl font-semibold mb-5">
              Yuk Jadi Aktor Daur Ulang Sampah!
            </h2>
            <p className="text-justify text-lg text-gray-700 mb-5">
              TrashLinker adalah aplikasi inovatif yang menghubungkan komunitas
              dan masyarakat dalam upaya menjaga kebersihan lingkungan.
              Terinspirasi dari gerakan Pandawara, TrashLinker membantu pengguna
              menemukan lokasi sampah, mengetahui kondisi tempat yang memerlukan
              pembersihan, serta berkolaborasi dengan komunitas setempat untuk
              melakukan aksi nyata.
            </p>
            <p className="text-justify text-lg text-gray-700 mb-5">
              Dengan fitur peta interaktif berbasis Mapbox, aplikasi ini
              memudahkan pengguna menemukan TPA/TPS terdekat, melaporkan area
              yang perlu dibersihkan, dan bergabung dalam kegiatan pembersihan
              yang diposting oleh orang lain. Pengguna juga dapat memposting
              foto sebelum dan sesudah pembersihan, memberikan edukasi untuk
              menjaga kebersihan, dan merasakan pengalaman yang lebih seru
              melalui gamifikasi seperti leaderboard komunitas paling aktif.
            </p>
            <p className="text-justify text-lg text-gray-700">
              TrashLinker juga memberikan kesempatan bagi lembaga atau sponsor
              untuk mendukung gerakan ini secara lebih luas, menjadikan
              lingkungan yang lebih bersih tanggung jawab kita bersama. Mari
              bergabung dan mulai bersihkan bumi untuk masa depan yang lebih
              baik!
            </p>
          </div>
          <Image
            className="w-full md:w-96 p-5 object-cover rounded-lg shadow-xl"
            src="/img/img_photo_trash2.png"
            alt="TrashLinker daur ulang"
            width={500} height={500}
          />
        </div>
      </div>
    </section>
  );
}
