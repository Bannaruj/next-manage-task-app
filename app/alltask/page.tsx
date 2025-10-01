"use client";

import React from "react";
import Image from "next/image";
import planning from "../assets/planning.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

type Task = {
  id: string;
  title: string;
  detail: string;
  is_completed: boolean;
  image_url: string;
  create_at: string;
  update_at: string;
};

function AllTaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTask() {
      const { data, error } = await supabase
        .from("task_tb")
        .select("*")
        .order("create_at", { ascending: false });

      if (error) {
        alert("พบปัญหาในการดึงข้อมูล");
        console.log(error);
        return;
      }
      if (data) {
        setTasks(data as Task[]);
      }
    }
    fetchTask();
  }, []);

  return (
    <div className="flex flex-col w-3/4 mx-auto">
      <div className="flex items-center mt-20 flex-col">
        <Image src={planning} alt="" width={150} height={150} />
        <h1 className="text-2xl font-bold mt-10">Manage Task App</h1>
        <h1 className="text-2xl font-bold">บันทึกงานที่ต้องทำ</h1>
      </div>
      <div className="flex justify-end">
        <Link
          href="/addtask"
          className="mt-10 mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 w-max rounded"
        >
          เพิ่มงาน
        </Link>
      </div>
      <div>
        <table className="min-w-full border boder-black text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-black p-2">รูป</th>
              <th className="border border-black p-2">งานที่ต้องทำ</th>
              <th className="border border-black p-2">รายละเอียด</th>
              <th className="border border-black p-2">สถานะ</th>
              <th className="border border-black p-2">วันที่เพิ่ม</th>
              <th className="border border-black p-2">วันที่แก้ไข</th>
              <th className="border border-black p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  {task.image_url ? (
                    <Image
                      src={task.image_url}
                      alt="logo"
                      width={150}
                      height={150}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border border-black p-2">{task.title}</td>
                <td className="border border-black p-2">{task.detail}</td>
                <td className="border border-black p-2">
                  {task.is_completed ? (
                    <span className="text-green-500">เสร็จสิ้นแล้ว</span>
                  ) : (
                    <span className="text-red-500">ยังไม่เสร็จสิ้น</span>
                  )}
                </td>
                <th className="border border-black p-2">
                  {new Date(task.create_at).toLocaleString()}
                </th>
                <th className="border border-black p-2">
                  {new Date(task.update_at).toLocaleString()}
                </th>
                <td className="border border-black p-2 text-center">
                  <Link href="#">แก้ไข</Link>
                  <button>ลบ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-10">
        <Link href="/" className="text-blue-500 font-bold">
          กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}

export default AllTaskPage;
