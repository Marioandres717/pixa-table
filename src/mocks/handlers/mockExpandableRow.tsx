import { useEffect, useState } from "react";
import { MockData } from "./mockData";

export const MockExpandableRow = () => {
  const [data, setData] = useState<MockData[]>([]);

  useEffect(() => {
    fetchData().then((data) => {
      setData(data.data);
    });
  }, []);

  async function fetchData() {
    const response = await fetch(
      "/api/mock-data?skip=" + 0 + "&limit=" + 100 + "&fetchSize=" + 100,
    );
    const data = await response.json();
    return { data };
  }
  return (
    <div className="p-4">
      <h1>Expandable Row</h1>
      <ul>
        {data.map((d) => (
          <li key={d.id}>{d.name}</li>
        ))}
      </ul>
    </div>
  );
};
