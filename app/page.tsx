import Image from "next/image";
import planning from "./assets/planning.png";

import React from "react";
import Link from "next/link";

function HomePage() {
  return (
    <div className="flex items-center mt-20 flex-col">
      <Image src={planning} alt="" width={150} height={150} />
      <h1 className="text-2xl font-bold mt-10">Manage Task App</h1>
      <h1 className="text-2xl font-bold">บันทึกงานที่ต้องทำ</h1>
      <Link
        href="/alltask"
        className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-40 rounded"
      >
        เข้าใช้งาน
      </Link>
    </div>
  );
}

export default HomePage;
