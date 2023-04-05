"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
// PAGINATED COMPONENT
export const PaginatedComponent = ({ totalPages }) => {
  // as our limit is 5;
  const butt = Math.ceil(totalPages / 4);
  let buttonArray = new Array(butt).fill(0);

  const [page, setPage] = useState(1);
  const { push, query } = useRouter();
  useEffect(() => {
    if (page) {
      push({ query: { ...query, page: page } });
    }
  }, [page]);
  return (
    <div>
      {buttonArray.map((item, index) => {
        return (
          <button
            key={uuid()}
            value={index + 1}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};
