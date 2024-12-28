"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import RequestItem from "./components/RequestItem";
import { IRequest } from "./types";
import "./page.css";

export default function Home() {
  const router = useRouter();
  const requests = {
    open: 2,
    urgent: 3,
  };
  const averageTimeToResolve = 3;
  const tasks: IRequest[] = [
    {
      name: "Front Door Lock broken",
      createdAt: "11 Dec 2024",
      priorityLevel: "Urgent",
      status: "Unresolved",
    },
    {
      name: "Cornice Cracked",
      createdAt: "15 Nov 2024",
      priorityLevel: "Less Urgent",
      status: "Resolved",
    },
    {
      name: "Water Pipe Leaking",
      createdAt: "10 Nov 2024",
      priorityLevel: "Emergency",
      status: "Resolved",
    },
  ];

  const handleAddClick = () => {
    router.push("/maintenance-form");
  };

  return (
    <div className="maintenance-page">
      <main>
        <h1 className="title">Maintenance Request</h1>
        <div className="stats flex justify-around mx-auto">
          <div className="item flex flex-col justify-center text-center">
            <span className="number">{requests.open}</span>
            <p className="label">Open Requests</p>
          </div>
          <div className="item flex flex-col justify-center text-center">
            <span className="number">{requests.urgent}</span>
            <p className="label">Urgent Requests</p>
          </div>
          <div className="item flex flex-col justify-center text-center">
            <span className="number">{averageTimeToResolve}</span>
            <p className="label">Average time (days) to resolve</p>
          </div>
        </div>
        <div className="list">
          {tasks.map((task, index) => (
            <RequestItem key={index} {...task} />
          ))}
        </div>
        <Image
          src="/circle-plus.png"
          alt=""
          width={56}
          height={56}
          className="add-btn"
          onClick={handleAddClick}
        />
      </main>
    </div>
  );
}
