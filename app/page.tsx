"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import RequestItem from "./components/RequestItem";
import { IRequest } from "./types";
import "./page.css";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<IRequest[]>([]);
  const [totalOpenRequests, setTotalOpenRequests] = useState<number>(0);
  const [totalUrgentRequests, setTotalUrgentRequests] = useState<number>(0);
  const [averageTimeToResolve, setAverageTimeToResolve] = useState<number>(0);

  async function fetchMaintenance() {
    try {
      const response = await fetch("/api/maintenance");
      if (response.ok) {
        const data = await response.json();
        console.log("DATA : ", data);
        const formattedData = (data?.requests || []).map((item: IRequest) => ({
          ...item,
          created_at: format(item.created_at, "dd MMM yyyy"),
        }));
        setTasks(formattedData);
        setTotalOpenRequests(data?.total_open_requests || 0);
        setTotalUrgentRequests(data?.total_urgent_requests || 0);
        setAverageTimeToResolve(data?.average_time_to_resolved || 0);
      } else {
        alert("Failed to fetch maintenance list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchMaintenance();
  }, []);

  const handleAddClick = () => {
    router.push("/maintenance-form");
  };

  return (
    <div className="maintenance-page">
      <main>
        <h1 className="title">Maintenance Request</h1>
        <div className="stats flex justify-around mx-auto">
          <div className="item flex flex-col justify-center text-center">
            <span className="number">{totalOpenRequests}</span>
            <p className="label">Open Requests</p>
          </div>
          <div className="item flex flex-col justify-center text-center">
            <span className="number">{totalUrgentRequests}</span>
            <p className="label">Urgent Requests</p>
          </div>
          <div className="item flex flex-col justify-center text-center">
            <span className="number">{averageTimeToResolve}</span>
            <p className="label">Average time (days) to resolve</p>
          </div>
        </div>
        <div className="list">
          {tasks.length ? (
            tasks.map((task, index) => (
              <RequestItem
                key={index}
                {...task}
                onRefreshData={fetchMaintenance}
              />
            ))
          ) : (
            <div className="no-request flex justify-center items-center mx-auto">
              There are no request
            </div>
          )}
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
