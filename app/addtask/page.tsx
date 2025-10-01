"use client";

import React from "react";
import Image from "next/image";
import planning from "../assets/planning.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

function AddTaskPage() {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [is_complete, setIsComplete] = useState<boolean>(false);
  const [image_file, setImageFile] = useState<File | null>(null);
  const [preview_file, setPreviewFile] = useState<string | null>(null);

  function handleSelectImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;

    setImageFile(file);

    if (file) {
      setPreviewFile(URL.createObjectURL(file as Blob));
    }
  }
  async function handleUploadandSave(e: React.FormEvent<HTMLFormElement>) {
    alert("อัปโหลดรูปภาพและบันทึกข้อมูล");
  }

  return (
    <div className="flex flex-col w-3/4 mx-auto">
      <div className="flex items-center mt-20 flex-col">
        <Image src={planning} alt="" width={150} height={150} />
        <h1 className="text-2xl font-bold mt-10">Manage Task App</h1>
        <h1 className="text-2xl font-bold">บันทึกงานที่ต้องทำ</h1>
      </div>
      <div className="flex flex-col border border-gray-300 p-5">
        <h1 className="text-center text-xl font-bold rounded-xl">
          ➕ เพิ่มงานใหม่
        </h1>
      </div>
      <form onSubmit={handleUploadandSave}>
        <div className="flex flex-col mt-5">
          <label className="text-lg font-bold">งานที่ทำ</label>
          <input
            type="text"
            className="border border-gray-700 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col mt-5">
          <label className="text-lg font-bold">รายละเอียดงาน</label>
          <textarea className="text-lg font-bold border border-gray-700"></textarea>
        </div>

        <div className="flex flex-col mt-5">
          <label className="text-lg font-bold">อัปโหลดรูปภาพ</label>
          <input
            id="fileinput"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleSelectImagePreview}
          />
          <label
            htmlFor="fileinput"
            className="bg-blue-500 rounded-lg p-2 text-white cursor-pointer w-30 text-center"
          >
            เลือกรูป
          </label>

          {preview_file && (
            <div className="mt-3">
              <Image
                src={preview_file}
                alt="preview"
                width={100}
                height={100}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col mt-5">
          <label htmlFor="status" className="text-lg font-bolg">
            สถานะงาน
          </label>
          <select id="status" className="border border-gray-300 rounded-lg p-2">
            <option value="0">ยังไม่เสร็จสิ้น</option>
            <option value="1">เสร็จสิ้น</option>
          </select>
        </div>
        <div className="flex flex-col mt-5">
          <button className="bg-green-500 rounded-lg p-2 text-white">
            บันทึกเพิ่มงาน
          </button>
        </div>
      </form>

      <div className="flex justify-center mt-10">
        <Link href="/alltask" className="text-blue-600 font-bold">
          กลับไปแสดงงานทั้งหมด
        </Link>
      </div>
    </div>
  );
}

export default AddTaskPage;
