import Link from 'next/link';
import { Button } from "@nextui-org/button";
import FeatureCard from "@/components/FeatureCard";
import RecyclingComponent from "@/components/Recycling";
import '../styles/globals.css';

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col lg:flex-row items-center gap-8 p-8 max-w-6xl w-full">
          <div className="flex flex-col space-y-4 lg:w-1/2 w-full">
            <h1 className="text-2xl font-bold">
              Bersatu Bersihkan Lingkungan Selamatkan Masa Depan
            </h1>
            <p className="text-gray-600 text-lg text-justify">
              TrashLinker adalah aplikasi inovatif yang menghubungkan komunitas dan masyarakat dalam upaya menjaga kebersihan lingkungan.
              Terinspirasi dari gerakan Pandawara, TrashLinker membantu pengguna menemukan lokasi sampah,
              mengetahui kondisi tempat yang memerlukan pembersihan, serta berkolaborasi dengan komunitas setempat untuk melakukan aksi nyata.
            </p>
            <div className="flex flex-col space-y-2">
              <Link href="/login">
                <Button className="bg-customGreen text-white" radius="sm" variant="shadow">
                  Yuk Login...
                </Button>
              </Link>
              <p className="text-sm text-gray-500 italic">
                Jadilah Dampak Bagi Lingkungan Anda Sendiri!.
              </p>
            </div>

          </div>
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
            <RecyclingComponent></RecyclingComponent>
          </div>
        </div>

      </div>

      <div className="bg-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
        <FeatureCard icon="icon_postingan.svg" fitur="Pelaporan Lokasi Sampah" description="Pengguna dapat memposting lokasi sampah beserta foto, perkiraan kebutuhan orang, dan waktu pembersihan." />
        <FeatureCard icon="icon_komunitas.svg" fitur="Kolaborasi komunitas" description="Pengguna dan komunitas dapat berkolaborasi untuk membersihkan area yang dilaporkan." />
        <FeatureCard icon="icon_recycle.svg" fitur="Manajemen Pengepul Sampah" description="Fitur untuk terhubung dengan pengepul atau bank sampah lokal." />
        <FeatureCard icon="icon_location.svg" fitur="Lokasi TPA" description="Menampilkan posisi sampah dan TPA/TPS terdekat." />
      </div>

      <div className='flex flex-row p-10'>
        <img className="w-96 p-5 " src="img/img_photo_trash1.png"></img>
        <div>
          <h2 className=' text-customGreen text-3xl p-3'>Ayo Jadi Aktor Bebas Sampah!</h2>
          <p className='text-justify p-3'>
            TrashLinker adalah aplikasi inovatif yang menghubungkan komunitas dan masyarakat dalam upaya menjaga kebersihan lingkungan. Terinspirasi dari gerakan Pandawara, TrashLinker membantu pengguna menemukan lokasi sampah, mengetahui kondisi tempat yang memerlukan pembersihan, serta berkolaborasi dengan komunitas setempat untuk melakukan aksi nyata.
          </p>
          <p className='text-justify p-3'>
            Dengan fitur peta interaktif berbasis Mapbox, aplikasi ini memudahkan pengguna menemukan TPA/TPS terdekat, melaporkan area yang perlu dibersihkan, dan bergabung dalam kegiatan pembersihan yang diposting oleh orang lain. Pengguna juga dapat memposting foto sebelum dan sesudah pembersihan, memberikan edukasi untuk menjaga kebersihan, dan merasakan pengalaman yang lebih seru melalui gamifikasi seperti leaderboard komunitas paling aktif.
          </p>
          <p className='text-justify p-3'>
            TrashLinker juga memberikan kesempatan bagi lembaga atau sponsor untuk mendukung gerakan ini secara lebih luas, menjadikan lingkungan yang lebih bersih tanggung jawab kita bersama. Mari bergabung dan mulai bersihkan bumi untuk masa depan yang lebih baik!
          </p>
        </div>
      </div>

      <div className='flex flex-row p-10'>
        <div>
          <h2 className=' text-customGreen text-3xl p-3'>Yuk Jadi Aktor Daur Ulang Sampah!</h2>
          <p className='text-justify p-3'>
            TrashLinker adalah aplikasi inovatif yang menghubungkan komunitas dan masyarakat dalam upaya menjaga kebersihan lingkungan. Terinspirasi dari gerakan Pandawara, TrashLinker membantu pengguna menemukan lokasi sampah, mengetahui kondisi tempat yang memerlukan pembersihan, serta berkolaborasi dengan komunitas setempat untuk melakukan aksi nyata.
          </p>
          <p className='text-justify p-3'>
            Dengan fitur peta interaktif berbasis Mapbox, aplikasi ini memudahkan pengguna menemukan TPA/TPS terdekat, melaporkan area yang perlu dibersihkan, dan bergabung dalam kegiatan pembersihan yang diposting oleh orang lain. Pengguna juga dapat memposting foto sebelum dan sesudah pembersihan, memberikan edukasi untuk menjaga kebersihan, dan merasakan pengalaman yang lebih seru melalui gamifikasi seperti leaderboard komunitas paling aktif.
          </p>
          <p className='text-justify p-3'>
            TrashLinker juga memberikan kesempatan bagi lembaga atau sponsor untuk mendukung gerakan ini secara lebih luas, menjadikan lingkungan yang lebih bersih tanggung jawab kita bersama. Mari bergabung dan mulai bersihkan bumi untuk masa depan yang lebih baik!
          </p>
        </div>
        <img className="w-96 p-5 " src="img/img_photo_trash2.png"></img>
      </div>

    </div>
  );
}

